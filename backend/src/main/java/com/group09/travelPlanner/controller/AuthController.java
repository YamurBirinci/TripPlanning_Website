package com.group09.travelPlanner.controller;

import com.group09.travelPlanner.entities.User;
import com.group09.travelPlanner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String mail = loginRequest.get("mail");
        String password = loginRequest.get("password");

        Optional<User> userOptional = userRepository.findByMailAndPassword(mail, password);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Map<String, Object> response = new HashMap<>();
            response.put("userId", user.getUserID());
            response.put("role", user.getRole());
            response.put("jwt", "dummy-jwt-token"); // JWT token'ı burada gerçek bir şekilde oluşturmanız gerekiyor.
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
