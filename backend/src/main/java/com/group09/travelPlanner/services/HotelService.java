package com.group09.travelPlanner.services;

import com.group09.travelPlanner.entities.Amenity;
import com.group09.travelPlanner.entities.Hotel;
import com.group09.travelPlanner.entities.Hotelimages;
import com.group09.travelPlanner.entities.Review;
import com.group09.travelPlanner.entities.Room;
import com.group09.travelPlanner.entities.User;
import com.group09.travelPlanner.repository.HotelRepository;
import com.group09.travelPlanner.requests.HotelRequest;
import com.group09.travelPlanner.responses.HotelResponse;
import com.group09.travelPlanner.responses.SearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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
    
    public Hotel getOneHotel(Integer hotelID) {
        return hotelRepository.findById(hotelID).orElse(null);
    }

    public SearchResponse saveHotel(Hotel hotel) {
        Hotel savedHotel = hotelRepository.save(hotel);
        return new SearchResponse(savedHotel);
    }

    public boolean deleteHotel(int hotelID) {
        if (hotelRepository.existsById(hotelID)) {
            hotelRepository.deleteById(hotelID);
            return true;
        }
        return false;
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

    public List<Map<String, Object>> getExploresByHotelID(int hotelID) {
        List<Object[]> results = hotelRepository.findExploresByHotelID(hotelID);
        List<Map<String, Object>> explores = new ArrayList<>();

        for (Object[] result : results) {
            Map<String, Object> explore = new HashMap<>();
            explore.put("explore_name", result[0]);
            explore.put("star", result[1]);
            explores.add(explore);
        }
        return explores;
    }

    public boolean updateHotelStatus(Integer hotelID, String status) {
        Optional<Hotel> optionalHotel = Optional.of(hotelRepository.getById(hotelID));
        if (optionalHotel.isPresent()) {
            Hotel hotel = optionalHotel.get();
            hotel.setStatus(status);
            hotelRepository.save(hotel);
            return true;
        }
        return false;
    }

    public List<HotelResponse> getPendingHotels() {
        List<Hotel> pendingHotels = hotelRepository.findByStatus("pending");
        return pendingHotels.stream().map(HotelResponse::new).collect(Collectors.toList());
    }

    public void submitHotel(HotelRequest hotelRequest) {
        Hotel hotel = new Hotel();
        hotel.setHotel_name(hotelRequest.getHotel_name());
        hotel.setAddress(hotelRequest.getAddress());
        hotel.setStar(hotelRequest.getStar());
        hotel.setStatus("pending");
        hotelRepository.save(hotel);
    }

    public boolean approveHotel(Integer hotelID) {
        Optional<Hotel> hotelOptional = hotelRepository.findById(hotelID);
        if (hotelOptional.isPresent()) {
            Hotel hotel = hotelOptional.get();
            hotel.setStatus("active");
            hotelRepository.save(hotel);
            return true;
        }
        return false;
    }

    public boolean rejectHotel(Integer hotelID) {
        Optional<Hotel> hotelOptional = hotelRepository.findById(hotelID);
        if (hotelOptional.isPresent()) {
            Hotel hotel = hotelOptional.get();
            hotelRepository.delete(hotel);
            return true;
        }
        return false;
    }

    public Hotel getHotelById(int hotelID) {
        Optional<Hotel> hotel = hotelRepository.findByHotelID(hotelID);
        return hotel.orElse(null); 
    }

    public List<Amenity> getAmenitiesByHotelID(int hotelID) {
        return hotelRepository.findAmenitiesByHotelID(hotelID);
    }

    public boolean approveHotel(int hotelID) {
        Optional<Hotel> hotelOptional = hotelRepository.findById(hotelID);
        if (hotelOptional.isPresent()) {
            Hotel hotel = hotelOptional.get();
            hotel.setStatus("Active");
            hotelRepository.save(hotel);
            return true;
        }
        return false;
    }

    public boolean rejectHotel(int hotelID) {
        Optional<Hotel> hotelOptional = hotelRepository.findById(hotelID);
        if (hotelOptional.isPresent()) {
            Hotel hotel = hotelOptional.get();
            hotel.setStatus("rejected");
            hotelRepository.save(hotel);
            return true;
        }
        return false;
    }

    public List<Hotel> getHotelsByUserId(Long userID) {
        User user = new User();
        user.setUserID(userID);
        return hotelRepository.findByUser(user);
    }

    
    
}
