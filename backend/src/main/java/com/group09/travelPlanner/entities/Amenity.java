package com.group09.travelPlanner.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Amenity")
public class Amenity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer amenityID;

    private String amenity_name;

    @ManyToMany(mappedBy = "amenities")
    private List<Hotel> hotels;

    // Getters and Setters

    /**
     * @return Integer return the amenityID
     */
    public Integer getAmenityID() {
        return amenityID;
    }

    /**
     * @param amenityID the amenityID to set
     */
    public void setAmenityID(Integer amenityID) {
        this.amenityID = amenityID;
    }

    /**
     * @return String return the amenity_name
     */
    public String getamenity_name() {
        return amenity_name;
    }

    /**
     * @param amenity_name the amenity_name to set
     */
    public void setamenity_name(String amenity_name) {
        this.amenity_name = amenity_name;
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

}