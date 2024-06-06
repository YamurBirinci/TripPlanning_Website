package com.group09.travelPlanner.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Table(name = "Review")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewID;

    @ManyToOne
    @JoinColumn(name = "hotelID", insertable = false, updatable = false)
    @JsonIgnore
    private Hotel hotel;

    private String review_text;
    private Integer cleanliness_rating;
    private Integer location_rating;
    private Integer staff_rating;

    

    // Getters and Setters

    /**
     * @return Integer return the reviewID
     */
    public Integer getReviewID() {
        return reviewID;
    }

    /**
     * @param reviewID the reviewID to set
     */
    public void setReviewID(Integer reviewID) {
        this.reviewID = reviewID;
    }

    /**
     * @return Hotel return the hotel
     */
    public Hotel getHotel() {
        return hotel;
    }

    /**
     * @param hotel the hotel to set
     */
    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    /**
     * @return String return the review_text
     */
    public String getreview_text() {
        return review_text;
    }

    /**
     * @param review_text the review_text to set
     */
    public void setreview_text(String review_text) {
        this.review_text = review_text;
    }

    /**
     * @return Integer return the cleanliness_rating
     */
    public Integer getcleanliness_rating() {
        return cleanliness_rating;
    }

    /**
     * @param cleanliness_rating the cleanliness_rating to set
     */
    public void setcleanliness_rating(Integer cleanliness_rating) {
        this.cleanliness_rating = cleanliness_rating;
    }

    /**
     * @return Integer return the location_rating
     */
    public Integer getlocation_rating() {
        return location_rating;
    }

    /**
     * @param location_rating the location_rating to set
     */
    public void setlocation_rating(Integer location_rating) {
        this.location_rating = location_rating;
    }

    /**
     * @return Integer return the staff_rating
     */
    public Integer getstaff_rating() {
        return staff_rating;
    }

    /**
     * @param staff_rating the staff_rating to set
     */
    public void setstaff_rating(Integer staff_rating) {
        this.staff_rating = staff_rating;
    }

}