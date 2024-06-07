package com.group09.travelPlanner.services;

import com.group09.travelPlanner.entities.Review;
import com.group09.travelPlanner.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }
}
