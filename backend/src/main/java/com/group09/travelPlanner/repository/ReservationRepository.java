package com.group09.travelPlanner.repository;

import com.group09.travelPlanner.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByHotel_HotelID(Long hotelID);

    List<Reservation> findByUserID(Long userID);
}