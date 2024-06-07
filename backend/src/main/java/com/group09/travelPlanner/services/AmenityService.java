package com.group09.travelPlanner.services;

import com.group09.travelPlanner.entities.Amenity;
import com.group09.travelPlanner.entities.Hotel;
import com.group09.travelPlanner.repository.AmenityRepository;
import com.group09.travelPlanner.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AmenityService {

    @Autowired
    private AmenityRepository amenityRepository;

    @Autowired
    private HotelRepository hotelRepository;

    public Amenity addAmenity(Integer hotelID, String amenity_name) {
        Optional<Hotel> hotelOptional = hotelRepository.findById(hotelID);
        if (!hotelOptional.isPresent()) {
            throw new IllegalArgumentException("hotelID invalid: " + hotelID);
        }

        Amenity amenity = new Amenity();
        amenity.setAmenity_name(amenity_name);
        amenity.setHotel(hotelOptional.get());

        return amenityRepository.save(amenity);
    }

    public List<Amenity> getAmenitiesByHotelID(Integer hotelID) {
        return amenityRepository.findByHotelHotelID(hotelID);
    }
}
