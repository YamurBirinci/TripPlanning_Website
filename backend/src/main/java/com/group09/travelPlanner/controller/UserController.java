package com.group09.travelPlanner.controller;

import com.group09.travelPlanner.entities.User;
import com.group09.travelPlanner.services.UserService;
import com.group09.travelPlanner.requests.UserRequest;
import com.group09.travelPlanner.responses.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000") // Add this line
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User newUser) {
        return userService.saveOneUser(newUser);
    }

    @GetMapping("/{userID}")
    public User getOneUser(@PathVariable Long userID) {
        return userService.getOneUser(userID);
    }

    @PostMapping("/auth")
    public ResponseEntity<?> authenticateUser(@RequestBody UserRequest userRequest) {
        User user = userService.getOneUserByMailAndPassword(userRequest.getMail(), userRequest.getPassword());
        if (user != null) {
            return ResponseEntity.ok(new UserResponse(user));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
