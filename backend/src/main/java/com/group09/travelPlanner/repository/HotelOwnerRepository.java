package com.group09.travelPlanner.repository;

import com.group09.travelPlanner.entities.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelOwnerRepository extends JpaRepository<User, Long> {
    List<User> findByRole(String role);
}