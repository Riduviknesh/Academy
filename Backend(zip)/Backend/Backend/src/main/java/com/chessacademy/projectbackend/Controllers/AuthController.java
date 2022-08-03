package com.chessacademy.projectbackend.Controllers;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.chessacademy.projectbackend.Payload.Request.SignUpRequest;
import com.chessacademy.projectbackend.Payload.Response.MessageResponse;
import com.chessacademy.projectbackend.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chessacademy.projectbackend.Models.UserModel;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController

public class AuthController {

  @Autowired
  UserService userService;
  
  //adding login data
  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserModel loginRequest) {
    
    return userService.authenticateUser(loginRequest);
  }
  
  //adding signup data
  @PostMapping("/signup")
  public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody SignUpRequest signUpRequest,
      HttpServletRequest httpServletRequest) {
    return userService.registerUser(signUpRequest, httpServletRequest);
  }

  @RequestMapping(value = "/confirmaccount", method = { RequestMethod.GET, RequestMethod.POST })
  public ResponseEntity<MessageResponse> confirmUserAccount(@RequestParam("token") String confirmationToken) {
    return userService.confirmUserAccount(confirmationToken);

  }
}
