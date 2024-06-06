package com.group09.travelPlanner.entities;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Amenity")
public class Amenity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer amenityID;

    private String amenity_name;

    @ManyToOne
    @JoinColumn(name = "hotelID", referencedColumnName = "hotelID")
    @JsonIgnore
    private Hotel hotel;

    // Getters and Setters

    public Integer getAmenityID() {
        return amenityID;
    }

    public void setAmenityID(Integer amenityID) {
        this.amenityID = amenityID;
    }

    public String getAmenity_name() {
        return amenity_name;
    }

    public void setAmenity_name(String amenity_name) {
        this.amenity_name = amenity_name;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }
}
