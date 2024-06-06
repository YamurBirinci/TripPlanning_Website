package com.group09.travelPlanner.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Table(name = "Hotel")

public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer hotelID;

    private String hotel_name;
    private String address;
    private Integer star;
    private String status;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Room> rooms;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Review> reviews;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Hotelimages> hotelimages;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Amenity> amenity;


    /**
     * @return Integer return the hotelID
     */
    public Integer getHotelID() {
        return hotelID;
    }

    /**
     * @param hotelID the hotelID to set
     */
    public void setHotelID(Integer hotelID) {
        this.hotelID = hotelID;
    }

    /**
     * @return String return the hotel_name
     */
    public String getHotel_name() {
        return hotel_name;
    }

    /**
     * @param hotel_name the hotel_name to set
     */
    public void setHotel_name(String hotel_name) {
        this.hotel_name = hotel_name;
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
     * @return Integer return the star
     */
    public Integer getStar() {
        return star;
    }

    /**
     * @param star the star to set
     */
    public void setStar(Integer star) {
        this.star = star;
    }

    /**
     * @return String return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @return List<Room> return the rooms
     */
    public List<Room> getRooms() {
        return rooms;
    }

    /**
     * @param rooms the rooms to set
     */
    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    /**
     * @return List<Review> return the reviews
     */
    public List<Review> getReviews() {
        return reviews;
    }

    /**
     * @param reviews the reviews to set
     */
    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    /**
     * @return List<Hotelimages> return the hotelimages
     */
    public List<Hotelimages> getHotelimages() {
        return hotelimages;
    }

    /**
     * @param hotelimages the hotelimages to set
     */
    public void setHotelimages(List<Hotelimages> hotelimages) {
        this.hotelimages = hotelimages;
    }

    
}