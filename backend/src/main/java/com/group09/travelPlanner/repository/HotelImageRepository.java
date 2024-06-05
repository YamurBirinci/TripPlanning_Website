package com.group09.travelPlanner.repository;

import com.group09.travelPlanner.entities.Hotelimages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelImageRepository extends JpaRepository<Hotelimages, Integer> {
    List<Hotelimages> findByHotelHotelID(int hotelID);
}