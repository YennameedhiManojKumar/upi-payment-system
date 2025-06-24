package com.upi.payment.controller;

import com.upi.payment.dto.RegisterLinkRequest;
import com.upi.payment.model.Account;
import com.upi.payment.model.User;
import com.upi.payment.service.UserService;
import com.upi.payment.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AccountService accountService;

    // Existing endpoint
    @PostMapping("/link-account")
    public Account linkAccount(@RequestParam Long userId,
            @RequestParam String upiId,
            @RequestParam double balance) {
        return userService.linkAccount(userId, upiId, balance);
    }

    // New combined register + link endpoint
    @PostMapping("/registerAndLink")
    public ResponseEntity<?> registerAndLink(@RequestBody RegisterLinkRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setMobileNumber(request.getMobileNumber());
        user = userService.registerUser(user);

        accountService.linkAccount(user.getId(), request.getUpiId(), request.getBalance());
        return ResponseEntity.ok(user);
    }
}
