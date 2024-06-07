package com.group09.travelPlanner.controller;

import com.group09.travelPlanner.entities.User;
import com.group09.travelPlanner.services.ReservationService;
import com.group09.travelPlanner.services.UserService;
import com.group09.travelPlanner.requests.UserRequest;
import com.group09.travelPlanner.responses.ReservationDTO;
import com.group09.travelPlanner.responses.UserResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private UserService userService;
    private ReservationService reservationService;

    @Autowired
    public UserController(UserService userService, ReservationService reservationService) { 
        this.userService = userService;
        this.reservationService = reservationService; 
    }
    
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
    public ResponseEntity<User> getUserById(@PathVariable Long userID) {
        User user = userService.getUserById(userID);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
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

    @GetMapping("/{userID}/reservations")
    public ResponseEntity<List<ReservationDTO>> getUserReservations(@PathVariable Long userID) {
        List<ReservationDTO> reservations = reservationService.getUserReservations(userID);
        if (reservations != null && !reservations.isEmpty()) {
            return ResponseEntity.ok(reservations);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
