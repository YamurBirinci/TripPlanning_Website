package com.group09.travelPlanner.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Explore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int exploreID;

    private String explore_name;
    private String address;
    private int star;

    @ManyToMany(mappedBy = "explore_locations")
    private List<Hotel> hotels;

    @OneToMany(mappedBy = "explore", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Explorereview> reviews;

    // Getters and setters

    /**
     * @return int return the exploreID
     */
    public int getExploreID() {
        return exploreID;
    }

    /**
     * @param exploreID the exploreID to set
     */
    public void setExploreID(int exploreID) {
        this.exploreID = exploreID;
    }

    /**
     * @return String return the explore_name
     */
    public String getExplore_name() {
        return explore_name;
    }

    /**
     * @param explore_name the explore_name to set
     */
    public void setExplore_name(String explore_name) {
        this.explore_name = explore_name;
    }

    /**
     * @return String return the address
     */
    public String getAddress() {
        return address;
    }

    /**
     * @param address the address to set
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * @return int return the star
     */
    public int getStar() {
        return star;
    }

    /**
     * @param star the star to set
     */
    public void setStar(int star) {
        this.star = star;
    }

    /**
     * @return List<Hotel> return the hotels
     */
    public List<Hotel> getHotels() {
        return hotels;
    }

    /**
     * @param hotels the hotels to set
     */
    public void setHotels(List<Hotel> hotels) {
        this.hotels = hotels;
    }

    /**
     * @return List<Explorereview> return the reviews
     */
    public List<Explorereview> getReviews() {
        return reviews;
    }

    /**
     * @param reviews the reviews to set
     */
    public void setReviews(List<Explorereview> reviews) {
        this.reviews = reviews;
    }

}
