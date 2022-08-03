package com.chessacademy.projectbackend.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.chessacademy.projectbackend.Models.ConfirmToken;
import com.chessacademy.projectbackend.Models.ERole;
import com.chessacademy.projectbackend.Models.Role;
import com.chessacademy.projectbackend.Models.UserModel;
import com.chessacademy.projectbackend.Payload.Request.SignUpRequest;
import com.chessacademy.projectbackend.Payload.Response.JwtResponse;
import com.chessacademy.projectbackend.Payload.Response.MessageResponse;
import com.chessacademy.projectbackend.Repository.ConfirmTokenRepository;
import com.chessacademy.projectbackend.Repository.RoleRepository;
import com.chessacademy.projectbackend.Repository.UserRepository;
import com.chessacademy.projectbackend.Security.jwt.JwtUtils;
import com.chessacademy.projectbackend.Security.services.UserDetailsImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class UserService {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  ConfirmTokenRepository confirmTokenRepository;

  @Autowired
  EmailService emailService;

  @Autowired
  UserService userService;

  public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserModel loginRequest) {

    String email = loginRequest.getEmail();
    UserModel usermodel = userRepository.findByEmailIgnoreCase(email);
    boolean verified = usermodel.getEnabled();

    // Checks whether the account is verified
    if (verified == true) {
      Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = jwtUtils.generateJwtToken(authentication);

      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
      List<String> roles = userDetails.getAuthorities().stream()
          .map(item -> item.getAuthority())
          .collect(Collectors.toList());

//      System.out.println("Login Successful!");
      return ResponseEntity.ok(new JwtResponse(jwt,
          userDetails.getId(),
          userDetails.getUsername(),
          userDetails.getEmail(),
          roles));
    } else {
      return ResponseEntity.ok(new MessageResponse("Account not verified, You must verify in order to continue!"));
    }
  }

  private String getSiteURL(HttpServletRequest request) {
    String siteURL = request.getRequestURL().toString();
    return siteURL.replace(request.getServletPath(), "");
  }

  public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody SignUpRequest signUpRequest,
      HttpServletRequest request) {
    String url = getSiteURL(request);
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    } else if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Username is already in use!"));
    } else {
      UserModel user = new UserModel(signUpRequest.getUsername(),
          signUpRequest.getEmail(),
          encoder.encode(signUpRequest.getPassword()), signUpRequest.getMobileNumber());

      Set<String> strRoles = signUpRequest.getRole();
      Set<Role> roles = new HashSet<>();

      if (strRoles == null) {
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
      } else {
        strRoles.forEach(role -> {
          switch (role) {
            case "admin":
              Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
              roles.add(adminRole);

              break;
            default:
              Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
              roles.add(userRole);
          }
        });
      }

      user.setRoles(roles);
      userRepository.save(user);
      String message = "User Registered Successfully!";
//      System.out.println(message);

      // Activate account
      ConfirmToken confirmationToken = new ConfirmToken(user);
      confirmTokenRepository.save(confirmationToken);
      SimpleMailMessage mailMessage = new SimpleMailMessage();
      String verifyURL = url + "/confirmaccount?token=" +
          confirmationToken.getConfirmationToken();
      mailMessage.setTo(user.getEmail());
      mailMessage.setSubject("Complete Registration!");
      mailMessage.setSubject("Complete Registration!");
      String mailId = "chessacademyr34@gmail.com";
      mailMessage.setFrom(mailId);
      mailMessage.setText("To confirm your account, please click here : "
          + verifyURL);
      emailService.sendEmail(mailMessage);
      return ResponseEntity.ok(new MessageResponse(message));
    }

  }

  public ResponseEntity<MessageResponse> confirmUserAccount(String confirmationToken) {
    ConfirmToken token = confirmTokenRepository.findByConfirmationToken(confirmationToken);
    if (token != null) {
      UserModel user = userRepository.findByEmailIgnoreCase(token.getUserModel().getEmail());
      user.setEnabled(true);
      userRepository.save(user);
      return ResponseEntity.ok(new MessageResponse("Account successfully verified, You may close this tab now."));
      // return "Account successfully verified, You may close this tab now.";
    } else {
      // return "The link is invalid or broken";
      return ResponseEntity.ok(new MessageResponse("The link is invalid or broken"));
    }
  }

}
