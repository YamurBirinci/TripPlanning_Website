package com.group09.travelPlanner.entities;

import javax.persistence.*;

@Entity
public class Exploreimages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int imageID;

    private String imageURL;

    @ManyToOne
    @JoinColumn(name = "exploreID", nullable = false)
    private Explore explore;

    // Getters and setters...
    public int getImageID() {
        return imageID;
    }

    public void setImageID(int imageID) {
        this.imageID = imageID;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Explore getExplore() {
        return explore;
    }

    public void setExplore(Explore explore) {
        this.explore = explore;
    }
}
