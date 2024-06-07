package com.group09.travelPlanner.controller;

import com.group09.travelPlanner.entities.User;
import com.group09.travelPlanner.services.HotelOwnerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotelOwners")
@CrossOrigin(origins = "http://localhost:3000")
public class HotelOwnerController {

    @Autowired
    private HotelOwnerService hotelOwnerService;

    public HotelOwnerController(HotelOwnerService hotelOwnerService) {
        this.hotelOwnerService = hotelOwnerService;
    }

    @GetMapping
    public List<User> getAllHotelOwners() {
        return hotelOwnerService.getAllHotelOwners();
    }

    @PostMapping
    public ResponseEntity<User> createHotelOwner(@RequestBody User hotelOwner) {
        hotelOwner.setRole("owner"); 
        
        String email = hotelOwner.getFirst_name().toLowerCase() + "." + hotelOwner.getlast_name().toLowerCase() + "@example.com";
        hotelOwner.setMail(email);
        
        String password = hotelOwner.getFirst_name().toLowerCase() + hotelOwner.getlast_name().toLowerCase() + "123";
        hotelOwner.setPassword(password);
        
        User newHotelOwner = hotelOwnerService.createHotelOwner(hotelOwner);
        return ResponseEntity.ok(newHotelOwner);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHotelOwner(@PathVariable Long id) {
        boolean result = hotelOwnerService.deleteHotelOwner(id);
        if (result) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("Failed to delete hotel owner");
        }
    }
}