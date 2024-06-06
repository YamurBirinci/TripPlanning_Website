package com.group09.travelPlanner.controller;

import com.group09.travelPlanner.responses.HotelResponse;
import com.group09.travelPlanner.responses.SearchResponse;
import com.group09.travelPlanner.entities.Hotel;
import com.group09.travelPlanner.entities.Hotelimages;
import com.group09.travelPlanner.services.HotelImageService;
import com.group09.travelPlanner.services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public SearchResponse getHotelById(@PathVariable int hotelID) {
        return hotelService.getHotelById(hotelID);
    }

    @PostMapping
    public SearchResponse createHotel(@RequestBody Hotel hotel) {
        return hotelService.saveHotel(hotel);
    }

    @DeleteMapping("/{hotelID}")
    public void deleteHotel(@PathVariable int hotelID) {
        hotelService.deleteHotel(hotelID);
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
}
