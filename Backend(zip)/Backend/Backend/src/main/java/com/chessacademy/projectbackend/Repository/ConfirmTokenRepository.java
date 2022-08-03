package com.chessacademy.projectbackend.Repository;

import com.chessacademy.projectbackend.Models.ConfirmToken;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmTokenRepository extends JpaRepository<ConfirmToken, String> {
    ConfirmToken findByConfirmationToken(String confirmationToken);
}