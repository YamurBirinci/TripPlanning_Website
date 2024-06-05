package com.group09.travelPlanner.entities;

import javax.persistence.*;

@Entity
@Table(name = "Room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomTypeID;

    private Integer hotelID;
    private String roomSize;
    private Integer maxAdults;
    private Integer maxChildren;
    private Double dailyPrice;

    @ManyToOne
    @JoinColumn(name = "hotelID", insertable = false, updatable = false)
    private Hotel hotel;

    /**
     * @return Integer return the roomTypeID
     */
    public Integer getRoomTypeID() {
        return roomTypeID;
    }

    /**
     * @param roomTypeID the roomTypeID to set
     */
    public void setRoomTypeID(Integer roomTypeID) {
        this.roomTypeID = roomTypeID;
    }

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
     * @return String return the roomSize
     */
    public String getRoomSize() {
        return roomSize;
    }

    /**
     * @param roomSize the roomSize to set
     */
    public void setRoomSize(String roomSize) {
        this.roomSize = roomSize;
    }

    /**
     * @return Integer return the maxAdults
     */
    public Integer getMaxAdults() {
        return maxAdults;
    }

    /**
     * @param maxAdults the maxAdults to set
     */
    public void setMaxAdults(Integer maxAdults) {
        this.maxAdults = maxAdults;
    }

    /**
     * @return Integer return the maxChildren
     */
    public Integer getMaxChildren() {
        return maxChildren;
    }

    /**
     * @param maxChildren the maxChildren to set
     */
    public void setMaxChildren(Integer maxChildren) {
        this.maxChildren = maxChildren;
    }

    /**
     * @return Double return the dailyPrice
     */
    public Double getDailyPrice() {
        return dailyPrice;
    }

    /**
     * @param dailyPrice the dailyPrice to set
     */
    public void setDailyPrice(Double dailyPrice) {
        this.dailyPrice = dailyPrice;
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
