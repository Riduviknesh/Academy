package com.chessacademy.projectbackend.Models;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "confirmationToken")
public class ConfirmToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "token_id")
    private long tokenid;

    @Column(name = "confirmation_token")
    private String confirmationToken;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @OneToOne(targetEntity = UserModel.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private UserModel userModel;

    public UserModel getUserModel() {
        return this.userModel;
    }

    public ConfirmToken() {
    }

    public ConfirmToken(UserModel userModel) {
        this.userModel = userModel;
        createdDate = new Date();
        confirmationToken = UUID.randomUUID().toString();
    }

    public String getConfirmationToken() {
        return this.confirmationToken;
    }
}
