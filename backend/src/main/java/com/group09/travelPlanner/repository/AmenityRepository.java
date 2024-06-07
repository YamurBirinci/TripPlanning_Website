package com.group09.travelPlanner.repository;

import com.group09.travelPlanner.entities.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AmenityRepository extends JpaRepository<Amenity, Integer> {
    List<Amenity> findByHotelHotelID(Integer hotelID);
}
