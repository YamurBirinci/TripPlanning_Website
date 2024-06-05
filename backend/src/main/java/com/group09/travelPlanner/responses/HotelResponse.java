package com.group09.travelPlanner.responses;

import com.group09.travelPlanner.entities.Hotel;

public class HotelResponse {
    private int hotelID;
    private String hotel_name;
    private String address;
    private int star;
    private String status;
    private String imageURL;
    private String roomSize;
    private Double dailyPrice;

    public HotelResponse(Hotel hotel) {
        this.hotelID = hotel.getHotelID();
        this.hotel_name = hotel.getHotel_name();
        this.address = hotel.getAddress();
        this.star = hotel.getStar();
        this.status = hotel.getStatus();
    }

    // Getter and Setter methods...

    public int getHotelID() {
        return hotelID;
    }

    public void setHotelID(int hotelID) {
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

    public int getStar() {
        return star;
    }

    public void setStar(int star) {
        this.star = star;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getRoomSize() {
        return roomSize;
    }

    public void setRoomSize(String roomSize) {
        this.roomSize = roomSize;
    }

    public Double getDailyPrice() {
        return dailyPrice;
    }

    public void setDailyPrice(Double dailyPrice) {
        this.dailyPrice = dailyPrice;
    }
}
