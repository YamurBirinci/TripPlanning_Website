package com.group09.travelPlanner.controller;

import com.group09.travelPlanner.entities.Amenity;
import com.group09.travelPlanner.services.AmenityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/amenities")
@CrossOrigin(origins = "http://localhost:3000")
public class AmenityController {

    @Autowired
    private AmenityService amenityService;

    @PostMapping("/{hotelID}")
    public ResponseEntity<Amenity> addAmenity(@PathVariable Integer hotelID, @RequestBody String amenityName) {
        try {
            Amenity newAmenity = amenityService.addAmenity(hotelID, amenityName);
            return ResponseEntity.ok(newAmenity);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/{hotelID}")
    public ResponseEntity<List<Amenity>> getAmenitiesByHotelID(@PathVariable Integer hotelID) {
        List<Amenity> amenities = amenityService.getAmenitiesByHotelID(hotelID);
        if (amenities != null && !amenities.isEmpty()) {
            return ResponseEntity.ok(amenities);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
