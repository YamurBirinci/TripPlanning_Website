package com.group09.travelPlanner.responses;

public class AddingHotelData {
    private String hotel_name;
    private String address;
    private Integer star;
    private String status;
    private Long userId;

    /**
     * @return String return the hotelName
     */
    public String getHotel_name() {
        return hotel_name;
    }

    /**
     * @param hotelName the hotelName to set
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
     * @return Long return the userId
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * @param userId the userId to set
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
