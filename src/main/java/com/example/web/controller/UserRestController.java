package com.example.web.controller;

import com.example.web.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authUser")
public class UserRestController {
    @GetMapping
    public ResponseEntity<User> getUserPage(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok().body(user);
    }
}