package com.group09.travelPlanner.repository;

import com.group09.travelPlanner.entities.Explore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExploreRepository extends JpaRepository<Explore, Integer> {
    @Query("SELECT r.review_text, r.rate, e.explore_name, e.address, e.star FROM Explore e JOIN e.reviews r WHERE e.exploreID = :exploreID")
    List<Object[]> findReviewsByExploreID(@Param("exploreID") int exploreID);
}
