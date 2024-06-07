package com.group09.travelPlanner.responses;

import java.util.Date;

public class ReservationDTO {
    private Long reservationID;
    private Date startDate;
    private Date endDate;
    private Integer room_typeID;
    private Long userID;
    private Long hotelID;

    // Getters and setters
    public Long getReservationID() {
        return reservationID;
    }

    public void setReservationID(Long reservationID) {
        this.reservationID = reservationID;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Integer getRoom_typeID() {
        return room_typeID;
    }

    public void setRoom_typeID(Integer room_typeID) {
        this.room_typeID = room_typeID;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public Long getHotelID() {
        return hotelID;
    }

    public void setHotelID(Long hotelID) {
        this.hotelID = hotelID;
    }
}
