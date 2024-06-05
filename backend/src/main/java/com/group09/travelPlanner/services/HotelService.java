package com.group09.travelPlanner.services;

import com.group09.travelPlanner.entities.Hotel;
import com.group09.travelPlanner.repository.HotelRepository;
import com.group09.travelPlanner.responses.HotelResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class HotelService {

    private static final Logger logger = LoggerFactory.getLogger(HotelService.class);

    @Autowired
    private HotelRepository hotelRepository;

    public List<HotelResponse> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();
        return hotels.stream().map(HotelResponse::new).collect(Collectors.toList());
    }

    public HotelResponse getHotelById(int hotelID) {
        Hotel hotel = hotelRepository.findById(hotelID).orElse(null);
        return hotel != null ? new HotelResponse(hotel) : null;
    }

    public HotelResponse saveHotel(Hotel hotel) {
        Hotel savedHotel = hotelRepository.save(hotel);
        return new HotelResponse(savedHotel);
    }

    public void deleteHotel(int hotelID) {
        hotelRepository.deleteById(hotelID);
    }

    public List<HotelResponse> searchHotels(String destination, int adults, int kids, String start_date, String end_date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = null;
        Date endDate = null;
        try {
            startDate = dateFormat.parse(start_date);
            endDate = dateFormat.parse(end_date);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        logger.info("Searching hotels with params: destination={}, adults={}, kids={}, start_date={}, end_date={}",
                    destination, adults, kids, startDate, endDate);

        List<Object[]> results = hotelRepository.searchHotels(destination, adults, kids, startDate, endDate);
        return results.stream().map(result -> {
            HotelResponse response = new HotelResponse((Hotel) result[0]);
            response.setRoomSize((String) result[1]);
            response.setDailyPrice((Double) result[2]);
            response.setImageURL((String) result[3]);
            return response;
        }).collect(Collectors.toList());
    }
}
