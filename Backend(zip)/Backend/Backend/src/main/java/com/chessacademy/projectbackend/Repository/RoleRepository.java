package com.chessacademy.projectbackend.Repository;

import java.util.Optional;

import com.chessacademy.projectbackend.Models.ERole;
import com.chessacademy.projectbackend.Models.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
