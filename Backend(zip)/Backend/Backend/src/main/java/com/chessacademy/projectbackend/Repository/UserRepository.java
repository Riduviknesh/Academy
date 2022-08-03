package com.chessacademy.projectbackend.Repository;

import java.util.Optional;

import com.chessacademy.projectbackend.Models.UserModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

  Optional<UserModel> findByEmail(String email);

  UserModel findByEmailIgnoreCase(String emailId);

  Boolean existsByEmail(String email);

  Boolean existsByUsername(String name);
}
