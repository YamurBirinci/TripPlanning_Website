package com.group09.travelPlanner.requests;

import java.util.List;

public class HotelRequest {
    private Integer hotelID;
    private String hotel_name;
    private String address;
    private Integer star;
    private Integer price;
    private List<String> amenities;
    private List<String> images;
    private String status;
    private Long userID;

    public HotelRequest(Integer hotelID, String hotel_name, String address, Integer star, Integer price, List<String> amenities, List<String> images) {
        this.hotelID = hotelID;
        this.hotel_name = hotel_name;
        this.address = address;
        this.star = star;
        this.price = price;
        this.amenities = amenities;
        this.images = images;
    }

    public HotelRequest(String hotel_name, String address, int star, String status) {
        this.hotel_name = hotel_name;
        this.address = address;
        this.star = star;
        this.status = status;
    }

    public HotelRequest(Integer hotelID, String hotelName, String address, Integer star, String status, Long userID) {
        this.hotelID = hotelID;
        this.hotel_name = hotelName;
        this.address = address;
        this.star = star;
        this.status = status;
        this.userID = userID;
    }

    // Getter and Setter methods...
    
    public Integer getHotelID() {
        return hotelID;
    }

    public void setHotelID(Integer hotelID) {
        this.hotelID = hotelID;
    }

    public String getHotel_name() {
        return hotel_name;
    }

    public void setHotel_name(String hotel_name) {
        this.hotel_name = hotel_name;
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

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public List<String> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @return Long return the userID
     */
    public Long getUserID() {
        return userID;
    }

    /**
     * @param userID the userID to set
     */
    public void setUserID(Long userID) {
        this.userID = userID;
    }

}
