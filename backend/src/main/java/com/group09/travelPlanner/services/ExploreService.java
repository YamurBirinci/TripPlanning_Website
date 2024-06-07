package com.group09.travelPlanner.services;

import com.group09.travelPlanner.repository.ExploreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExploreService {

    @Autowired
    private ExploreRepository exploreRepository;

    public List<Map<String, Object>> getReviewsByExploreID(int exploreID) {
        List<Object[]> results = exploreRepository.findReviewsByExploreID(exploreID);
        List<Map<String, Object>> reviews = new ArrayList<>();

        for (Object[] result : results) {
            Map<String, Object> review = new HashMap<>();
            review.put("review_text", result[0]);
            review.put("rate", result[1]);
            review.put("explore_name", result[2]);
            review.put("address", result[3]);
            review.put("star", result[4]);
            reviews.add(review);
        }
        return reviews;
    }
}