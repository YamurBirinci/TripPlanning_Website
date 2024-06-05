package com.group09.travelPlanner.responses;

public class HotelImageResponse {
    private Integer imageID;
    private String imageURL;

    public HotelImageResponse(Integer imageID, String imageURL) {
        this.imageID = imageID;
        this.imageURL = imageURL;
    }

    // Getter ve Setter metodları
    public Integer getImageID() {
        return imageID;
    }

    public void setImageID(Integer imageID) {
        this.imageID = imageID;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
}
