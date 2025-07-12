package com.upi.payment.controller;

import com.upi.payment.dto.LoginRequest;
import com.upi.payment.model.Account;
import com.upi.payment.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        String upiId = request.getUpiId();
        String pin = request.getPin();

        Optional<Account> account = accountRepository.findByUpiIdAndPin(upiId, pin);

        if (account.isPresent()) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid UPI ID or PIN");
        }
    }
}
