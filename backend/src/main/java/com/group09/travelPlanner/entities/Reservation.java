package com.group09.travelPlanner.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationID;

    @ManyToOne
    @JoinColumn(name = "hotelID", nullable = false)
    @JsonIgnore
    private Hotel hotel;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "room_typeID")
    private Integer room_typeID;

    @Column(name = "userID")
    private Long userID;



    // Diğer alanlar ve getter-setter metodları

    /**
     * @return Long return the reservationID
     */
    public Long getReservationID() {
        return reservationID;
    }

    /**
     * @param reservationID the reservationID to set
     */
    public void setReservationID(Long reservationID) {
        this.reservationID = reservationID;
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

    /**
     * @return Date return the startDate
     */
    public Date getStartDate() {
        return startDate;
    }

    /**
     * @param startDate the startDate to set
     */
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    /**
     * @return Date return the endDate
     */
    public Date getEndDate() {
        return endDate;
    }

    /**
     * @param endDate the endDate to set
     */
    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }


    /**
     * @return Integer return the room_typeID
     */
    public Integer getRoom_typeID() {
        return room_typeID;
    }

    /**
     * @param room_typeID the room_typeID to set
     */
    public void setRoom_typeID(Integer room_typeID) {
        this.room_typeID = room_typeID;
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
