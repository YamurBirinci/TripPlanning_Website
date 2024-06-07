package com.group09.travelPlanner.repository;

import com.group09.travelPlanner.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
}
