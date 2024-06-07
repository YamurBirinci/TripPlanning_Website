package com.group09.travelPlanner.responses;

public class RoomResponse {
    private Integer room_typeID;
    private String room_Size;
    private Integer max_adults;
    private Integer max_children;
    private Double daily_price;

    public RoomResponse() {}

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
     * @return String return the room_Size
     */
    public String getRoom_Size() {
        return room_Size;
    }
    

    /**
     * @param room_Size the room_Size to set
     */
    public void setRoom_Size(String room_Size) {
        this.room_Size = room_Size;
    }

    /**
     * @return Integer return the max_adults
     */
    public Integer getMax_adults() {
        return max_adults;
    }

    /**
     * @param max_adults the max_adults to set
     */
    public void setMax_adults(Integer max_adults) {
        this.max_adults = max_adults;
    }

    /**
     * @return Integer return the max_children
     */
    public Integer getMax_children() {
        return max_children;
    }

    /**
     * @param max_children the max_children to set
     */
    public void setMax_children(Integer max_children) {
        this.max_children = max_children;
    }

    /**
     * @return Double return the daily_price
     */
    public Double getDaily_price() {
        return daily_price;
    }

    /**
     * @param daily_price the daily_price to set
     */
    public void setDaily_price(Double daily_price) {
        this.daily_price = daily_price;
    }

}
