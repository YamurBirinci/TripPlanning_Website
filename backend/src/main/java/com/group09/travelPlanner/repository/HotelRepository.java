package com.group09.travelPlanner.repository;

import com.group09.travelPlanner.entities.Amenity;
import com.group09.travelPlanner.entities.Hotel;
import com.group09.travelPlanner.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface HotelRepository extends JpaRepository<Hotel, Integer> {

    @Query("SELECT DISTINCT h, rt.roomTypeID, rt.roomSize, rt.dailyPrice, MIN(hi.imageURL) as imageURL FROM Hotel h " +
       "JOIN h.rooms rt " +
       "LEFT JOIN h.hotelimages hi " +
       "LEFT JOIN Reservation r ON h.hotelID = r.hotel.hotelID " +
       "AND ((r.startDate <= :end_date AND r.endDate >= :start_date) " +
       "OR (r.startDate >= :start_date AND r.endDate <= :end_date)) " +
       "WHERE h.address LIKE %:destination% " +
       "AND rt.maxAdults >= :adults " +
       "AND rt.maxChildren >= :kids " +
       "AND r.reservationID IS NULL " +
       "AND h.status = 'Active' " +
       "GROUP BY h, rt.roomTypeID, rt.roomSize, rt.dailyPrice")
List<Object[]> searchHotels(
    @Param("destination") String destination, 
    @Param("adults") int adults, 
    @Param("kids") int kids, 
    @Param("start_date") Date start_date, 
    @Param("end_date") Date end_date
);

    @Query("SELECT h, r, re, hi, a " +
           "FROM Hotel h " +
           "LEFT JOIN h.rooms r " +
           "LEFT JOIN h.reviews re " +
           "LEFT JOIN h.hotelimages hi " +
           "LEFT JOIN Amenity a ON h.hotelID = a.hotel.hotelID " +
           "WHERE h.hotelID = :hotelID AND r.roomTypeID = :roomTypeID")
    List<Object[]> findHotelDetailsByIdAndRoomType(@Param("hotelID") int hotelID, @Param("roomTypeID") int roomTypeID);

    @Query("SELECT e.explore_name, e.star FROM Hotel h JOIN h.explore_locations e WHERE h.hotelID = :hotelID")
    List<Object[]> findExploresByHotelID(@Param("hotelID") int hotelID);

    List<Hotel> findByStatus(String status);
    @SuppressWarnings("null")
    Hotel getById(Integer hotelID);

    @Query("SELECT h FROM Hotel h WHERE h.hotelID = :hotelID")
    Optional<Hotel> findByHotelID(@Param("hotelID") Integer hotelID);

    @Query("SELECT a FROM Amenity a WHERE a.hotel.hotelID = :hotelID")
    List<Amenity> findAmenitiesByHotelID(@Param("hotelID") Integer hotelID);

    List<Hotel> findByUser(User user);

}
