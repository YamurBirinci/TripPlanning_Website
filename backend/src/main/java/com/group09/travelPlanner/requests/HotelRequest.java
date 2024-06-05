package com.group09.travelPlanner.requests;

public class HotelRequest {
    private String hotel_name;
    private String address;
    private int star;
    private String status;

    // Getters and setters

    /**
     * @return String return the hotel_name
     */
    public String gethotel_name() {
        return hotel_name;
    }

    /**
     * @param hotel_name the hotel_name to set
     */
    public void sethotel_name(String hotel_name) {
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
     * @return int return the star
     */
    public int getStar() {
        return star;
    }

    /**
     * @param star the star to set
     */
    public void setStar(int star) {
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

}