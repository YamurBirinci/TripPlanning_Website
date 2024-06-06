package com.group09.travelPlanner.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Table(name = "Hotelimages")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Hotelimages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer imageID;

    private String imageURL;

    @ManyToOne
    @JoinColumn(name = "hotelID", insertable = false, updatable = false)
    @JsonIgnore
    private Hotel hotel;


    /**
     * @return Integer return the imageID
     */
    public Integer getImageID() {
        return imageID;
    }

    /**
     * @param imageID the imageID to set
     */
    public void setImageID(Integer imageID) {
        this.imageID = imageID;
    }


    /**
     * @return String return the imageURL
     */
    public String getImageURL() {
        return imageURL;
    }

    /**
     * @param imageURL the imageURL to set
     */
    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
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

}
