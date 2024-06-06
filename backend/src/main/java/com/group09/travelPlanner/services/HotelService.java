package com.group09.travelPlanner.services;

import com.group09.travelPlanner.entities.Amenity;
import com.group09.travelPlanner.entities.Hotel;
import com.group09.travelPlanner.entities.Hotelimages;
import com.group09.travelPlanner.entities.Review;
import com.group09.travelPlanner.entities.Room;
import com.group09.travelPlanner.repository.HotelRepository;
import com.group09.travelPlanner.responses.HotelResponse;
import com.group09.travelPlanner.responses.SearchResponse;
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

    public List<SearchResponse> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();
        return hotels.stream().map(SearchResponse::new).collect(Collectors.toList());
    }

    public SearchResponse getHotelById(int hotelID) {
        Hotel hotel = hotelRepository.findById(hotelID).orElse(null);
        return hotel != null ? new SearchResponse(hotel) : null;
    }

    public SearchResponse saveHotel(Hotel hotel) {
        Hotel savedHotel = hotelRepository.save(hotel);
        return new SearchResponse(savedHotel);
    }

    public void deleteHotel(int hotelID) {
        hotelRepository.deleteById(hotelID);
    }

    public List<SearchResponse> searchHotels(String destination, int adults, int kids, String start_date, String end_date) {
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
            SearchResponse response = new SearchResponse((Hotel) result[0]);
            response.setRoom_typeID((Integer) result[1]);
            response.setRoomSize((String) result[2]);
            response.setDailyPrice((Double) result[3]);
            response.setImageURL((String) result[4]);
            return response;
        }).collect(Collectors.toList());
    }

    public HotelResponse getHotelByIdAndRoomType(int hotelID, int roomTypeID) {
        List<Object[]> results = hotelRepository.findHotelDetailsByIdAndRoomType(hotelID, roomTypeID);
        if (results.isEmpty()) {
            return null;
        }

        HotelResponse response = new HotelResponse();
        for (Object[] result : results) {
            Hotel hotel = (Hotel) result[0];
            if (response.getHotelID() == null) {
                response.setHotelID(hotel.getHotelID());
                response.setHotelName(hotel.getHotel_name());
                response.setAddress(hotel.getAddress());
                response.setStar(hotel.getStar());
                response.setStatus(hotel.getStatus());
            }

            Room room = (Room) result[1];
            if (!response.getRooms().contains(room)) {
                response.getRooms().add(room);
            }

            Review review = (Review) result[2];
            if (!response.getReviews().contains(review)) {
                response.getReviews().add(review);
            }

            Hotelimages image = (Hotelimages) result[3];
            if (!response.getImages().contains(image)) {
                response.getImages().add(image);
            }

            Amenity amenity = (Amenity) result[4];
            if (amenity != null && !response.getAmenities().contains(amenity)) {
                response.getAmenities().add(amenity);
            }
        }

        return response;
    }
}
