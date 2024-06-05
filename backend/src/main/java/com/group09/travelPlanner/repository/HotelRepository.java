package com.group09.travelPlanner.repository;

import com.group09.travelPlanner.entities.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Integer> {

    @Query("SELECT DISTINCT h, rt.roomSize, rt.dailyPrice, MIN(hi.imageURL) as imageURL FROM Hotel h " +
           "JOIN h.rooms rt " +
           "LEFT JOIN h.hotelimages hi " +
           "LEFT JOIN Reservation r ON h.hotelID = r.hotel.hotelID " +
           "AND ((r.startDate <= :end_date AND r.endDate >= :start_date) " +
           "OR (r.startDate >= :start_date AND r.endDate <= :end_date)) " +
           "WHERE h.address LIKE %:destination% " +
           "AND rt.maxAdults >= :adults " +
           "AND rt.maxChildren >= :kids " +
           "AND r.reservationID IS NULL " +
           "GROUP BY h, rt.roomSize, rt.dailyPrice")
    List<Object[]> searchHotels(
        @Param("destination") String destination, 
        @Param("adults") int adults, 
        @Param("kids") int kids, 
        @Param("start_date") Date start_date, 
        @Param("end_date") Date end_date
    );
}
