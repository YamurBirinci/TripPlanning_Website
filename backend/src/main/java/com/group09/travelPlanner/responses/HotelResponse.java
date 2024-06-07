package com.group09.travelPlanner.responses;

import com.group09.travelPlanner.entities.Amenity;
import com.group09.travelPlanner.entities.Hotel;
import com.group09.travelPlanner.entities.Hotelimages;
import com.group09.travelPlanner.entities.Review;
import com.group09.travelPlanner.entities.Room;

import java.util.ArrayList;
import java.util.List;

public class HotelResponse {
    private Integer hotelID;
    private String hotelName;
    private String address;
    private Integer star;
    private String status;
    private List<Room> rooms = new ArrayList<>();
    private List<Review> reviews = new ArrayList<>();
    private List<Hotelimages> images = new ArrayList<>();
    private List<Amenity> amenities = new ArrayList<>();

    public HotelResponse(Hotel hotel) {
        this.hotelID = hotel.getHotelID();
        this.hotelName = hotel.getHotel_name();
        this.address = hotel.getAddress();
        this.star = hotel.getStar();
        this.status = hotel.getStatus();
    }

    public HotelResponse() {
    }

    // Getter and Setter methods...

    public Integer getHotelID() {
        return hotelID;
    }

    public void setHotelID(Integer hotelID) {
        this.hotelID = hotelID;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getStar() {
        return star;
    }

    public void setStar(Integer star) {
        this.star = star;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Hotelimages> getImages() {
        return images;
    }

    public void setImages(List<Hotelimages> images) {
        this.images = images;
    }

    public List<Amenity> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<Amenity> amenities) {
        this.amenities = amenities;
    }
}