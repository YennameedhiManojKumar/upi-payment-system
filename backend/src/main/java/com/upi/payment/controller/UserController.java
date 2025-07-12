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
@CrossOrigin(origins = "*") // Allow CORS for frontend (optional but useful)
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AccountService accountService;

    // ✅ Endpoint to link account separately (optional)
    @PostMapping("/link-account")
    public Account linkAccount(@RequestParam Long userId,
                                @RequestParam String upiId,
                                @RequestParam double balance) {
        return userService.linkAccount(userId, upiId, balance);
    }

    // ✅ Register user + link bank account
    @PostMapping("/registerAndLink")
    public ResponseEntity<?> registerAndLink(@RequestBody RegisterLinkRequest request) {
        // Create User
        User user = new User();
        user.setName(request.getName());
        user.setMobileNumber(request.getPhone()); // ✅ Matches frontend field
        user = userService.registerUser(user);

        // Link Account (initial balance hardcoded to 1000.0 or set from frontend)
        accountService.linkAccount(user.getId(), request.getUpiId(), 1000.0);

        return ResponseEntity.ok(user);
    }
}
