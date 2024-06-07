package com.group09.travelPlanner.services;

import com.group09.travelPlanner.repository.ExploreImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExploreImagesService {

    @Autowired
    private ExploreImagesRepository exploreImagesRepository;

    public List<String> getImagesByExploreID(int exploreID) {
        return exploreImagesRepository.findImagesByExploreID(exploreID);
    }
}
