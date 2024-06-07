package com.group09.travelPlanner.controller;

import com.group09.travelPlanner.entities.Review;
import com.group09.travelPlanner.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        if (review.getHotel() != null) {
            review.setHotelID(review.getHotel().getHotelID());
        }
        Review savedReview = reviewService.saveReview(review);
        return ResponseEntity.ok(savedReview);
    }
}
