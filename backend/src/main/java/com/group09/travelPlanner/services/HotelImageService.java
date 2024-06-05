package com.group09.travelPlanner.services;

import com.group09.travelPlanner.repository.HotelImageRepository;
import com.group09.travelPlanner.entities.Hotelimages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelImageService {

    @Autowired
    private HotelImageRepository hotelImageRepository;

    public List<Hotelimages> findImagesByHotelID(int hotelID) {
        return hotelImageRepository.findByHotelHotelID(hotelID);
    }
}
