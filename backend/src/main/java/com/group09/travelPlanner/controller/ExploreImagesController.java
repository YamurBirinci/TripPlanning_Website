package com.group09.travelPlanner.controller;

import com.group09.travelPlanner.services.ExploreImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/explores")
@CrossOrigin(origins = "http://localhost:3000")
public class ExploreImagesController {

    @Autowired
    private ExploreImagesService exploreImagesService;

    @GetMapping("/{exploreID}/images")
    public List<String> getImagesByExploreID(@PathVariable int exploreID) {
        return exploreImagesService.getImagesByExploreID(exploreID);
    }
}
