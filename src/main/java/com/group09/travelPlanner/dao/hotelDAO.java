package com.group09.travelPlanner.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.group09.travelPlanner.DBConnector;

public class hotelDAO {

    public void getAllHotels() {
        String query = "SELECT * FROM hotels;"; 
        try (Connection con = DBConnector.getConnection();
             Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            
            while (rs.next()) {
                // Retrieve data from result set
                int id = rs.getInt("hotelID");
                String name = rs.getString("hotel_name");        
                System.out.println("Hotel ID: " + id + ", Name: " + name);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void filterHotels(){
        
    }
}
