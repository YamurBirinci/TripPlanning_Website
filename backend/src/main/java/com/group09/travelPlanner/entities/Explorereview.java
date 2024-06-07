package com.group09.travelPlanner.entities;

import javax.persistence.*;


@Entity
public class Explorereview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewID;

    private String review_text;
    private int rate;

    @ManyToOne
    @JoinColumn(name = "exploreID", nullable = false)
    private Explore explore;


    /**
     * @return int return the reviewID
     */
    public int getReviewID() {
        return reviewID;
    }

    /**
     * @param reviewID the reviewID to set
     */
    public void setReviewID(int reviewID) {
        this.reviewID = reviewID;
    }

    /**
     * @return String return the review_text
     */
    public String getReview_text() {
        return review_text;
    }

    /**
     * @param review_text the review_text to set
     */
    public void setReview_text(String review_text) {
        this.review_text = review_text;
    }

    /**
     * @return int return the rate
     */
    public int getRate() {
        return rate;
    }

    /**
     * @param rate the rate to set
     */
    public void setRate(int rate) {
        this.rate = rate;
    }

    /**
     * @return Explore return the explore
     */
    public Explore getExplore() {
        return explore;
    }

    /**
     * @param explore the explore to set
     */
    public void setExplore(Explore explore) {
        this.explore = explore;
    }

}
