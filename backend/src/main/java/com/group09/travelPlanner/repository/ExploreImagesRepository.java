package com.group09.travelPlanner.repository;

import com.group09.travelPlanner.entities.Exploreimages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExploreImagesRepository extends JpaRepository<Exploreimages, Integer> {
    @Query("SELECT e.imageURL FROM Exploreimages e WHERE e.explore.exploreID = :exploreID")
    List<String> findImagesByExploreID(@Param("exploreID") int exploreID);
}
