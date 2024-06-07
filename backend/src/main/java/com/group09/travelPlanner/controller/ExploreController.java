package com.group09.travelPlanner.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group09.travelPlanner.services.ExploreService;

@RestController
@RequestMapping("/api/explores")
@CrossOrigin(origins = "http://localhost:3000")
public class ExploreController {

    @Autowired
    private ExploreService exploreService;

    @GetMapping("/{exploreID}/reviews")
    public List<Map<String, Object>> getReviewsByExploreID(@PathVariable int exploreID) {
        return exploreService.getReviewsByExploreID(exploreID);
    }
}