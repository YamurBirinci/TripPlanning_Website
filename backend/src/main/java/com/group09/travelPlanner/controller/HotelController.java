package com.group09.travelPlanner.controller;

import com.group09.travelPlanner.responses.AddingHotelData;
import com.group09.travelPlanner.responses.HotelResponse;
import com.group09.travelPlanner.responses.SearchResponse;
import com.group09.travelPlanner.entities.Amenity;
import com.group09.travelPlanner.entities.Hotel;
import com.group09.travelPlanner.entities.Hotelimages;
import com.group09.travelPlanner.services.HotelImageService;
import com.group09.travelPlanner.services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "http://localhost:3000")
public class HotelController {

    @Autowired
    private HotelService hotelService;
    @Autowired
    private HotelImageService hotelImageService;
    

    @GetMapping
    public List<SearchResponse> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/{hotelID}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable int hotelID) {
        Hotel hotel = hotelService.getHotelById(hotelID);
        if (hotel != null) {
            return ResponseEntity.ok(hotel);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public SearchResponse createHotel(@RequestBody Hotel hotel) {
        return hotelService.saveHotel(hotel);
    }

    @DeleteMapping("/{hotelID}")
    public ResponseEntity<String> deleteHotel(@PathVariable int hotelID) {
        boolean isDeleted = hotelService.deleteHotel(hotelID);
        if (isDeleted) {
            return ResponseEntity.ok("Hotel deleted successfully");
        } else {
            return ResponseEntity.status(500).body("Failed to delete hotel");
        }
    }

    @GetMapping("/{hotelID}/images")
    public List<Hotelimages> getHotelImages(@PathVariable int hotelID) {
        return hotelImageService.findImagesByHotelID(hotelID);
    }

    @GetMapping("/search")
    public List<SearchResponse> searchHotels(
        @RequestParam String destination, 
        @RequestParam int adults, 
        @RequestParam int kids, 
        @RequestParam("start_date") String startDate, 
        @RequestParam("end_date") String endDate
    ) 
    {
        return hotelService.searchHotels(destination, adults, kids, startDate, endDate);
    }

    @GetMapping("/{hotelID}/{roomTypeID}")
    public HotelResponse getHotelByIdAndRoomType(
        @PathVariable int hotelID,
        @PathVariable int roomTypeID
    ) {
        return hotelService.getHotelByIdAndRoomType(hotelID, roomTypeID);
    }

    @GetMapping("/{hotelID}/explores")
    public List<Map<String, Object>> getExploresByHotelID(@PathVariable int hotelID) {
        return hotelService.getExploresByHotelID(hotelID);
    }
    @GetMapping("/pending")
    public List<HotelResponse> getPendingHotels() {
        return hotelService.getPendingHotels();
    }

    @GetMapping("/{hotelID}/amenities")
    public ResponseEntity<List<Amenity>> getAmenitiesByHotelID(@PathVariable int hotelID) {
        List<Amenity> amenities = hotelService.getAmenitiesByHotelID(hotelID);
        if (amenities != null && !amenities.isEmpty()) {
            return ResponseEntity.ok(amenities);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{hotelID}/approve")
    public ResponseEntity<String> approveHotel(@PathVariable int hotelID) {
        boolean isApproved = hotelService.approveHotel(hotelID);
        if (isApproved) {
            return ResponseEntity.ok("Hotel approved successfully");
        } else {
            return ResponseEntity.status(500).body("Failed to approve hotel");
        }
    }

    @PostMapping("/{hotelID}/reject")
    public ResponseEntity<String> rejectHotel(@PathVariable int hotelID) {
        boolean isRejected = hotelService.rejectHotel(hotelID);
        if (isRejected) {
            return ResponseEntity.ok("Hotel rejected successfully");
        } else {
            return ResponseEntity.status(500).body("Failed to reject hotel");
        }
    }

    @GetMapping("/user/{userID}")
    public ResponseEntity<List<Hotel>> getHotelsByUserId(@PathVariable Long userID) {
        List<Hotel> hotels = hotelService.getHotelsByUserId(userID);
        if (hotels != null && !hotels.isEmpty()) {
            return ResponseEntity.ok(hotels);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addHotel(@RequestBody AddingHotelData addingHotelData) {
        Map<String, String> response = new HashMap<>();
        try {
            hotelService.addHotel(addingHotelData);
            response.put("message", "Hotel added successfully");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("message", "Failed to add hotel: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    



    

    
}
