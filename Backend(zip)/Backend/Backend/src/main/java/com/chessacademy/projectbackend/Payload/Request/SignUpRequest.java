package com.chessacademy.projectbackend.Payload.Request;

import java.util.Set;

import javax.validation.constraints.*;

public class SignUpRequest {

  @NotEmpty
  @Size(min = 3, max = 20, message = "username must have atleast 3 characters")
  private String username;

  @NotEmpty
  @Email
  private String email;

  @NotEmpty
  @Pattern(regexp = "^(?=.*[0-9])"
      + "(?=.*[a-z])(?=.*[A-Z])"
      + "(?=.*[@#$%^&+=])"
      + "(?=\\S+$).{8,20}$", message = "password should have atleast one lower and upper case alphabet , one digit , one special character,doesn’t contain any white space")
  @Size(min = 8, max = 20, message = "password should have atleast 8 characters")
  private String password;



  @NotEmpty
  @Pattern(regexp = "(0/91)?[6-9][0-9]{9}", message = "Mobile number  is invalid")
  @Size(min = 10, max = 10)
  private String mobileNumber;

  private Set<String> role;

  public String getMobileNumber() {
    return mobileNumber;
  }

  public void setMobileNumber(String mobileNumber) {
    this.mobileNumber = mobileNumber;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<String> getRole() {
    return this.role;
  }

  public void setRole(Set<String> role) {
    this.role = role;
  }
}
