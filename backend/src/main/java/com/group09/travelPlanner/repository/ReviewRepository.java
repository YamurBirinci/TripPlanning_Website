package com.group09.travelPlanner.repository;

import com.group09.travelPlanner.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
