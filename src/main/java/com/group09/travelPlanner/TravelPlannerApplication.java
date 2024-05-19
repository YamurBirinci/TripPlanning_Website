package com.group09.travelPlanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.group09.travelPlanner.dao.hotelDAO;

@SpringBootApplication
public class TravelPlannerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TravelPlannerApplication.class, args);
		hotelDAO hotelDao = new hotelDAO();
        hotelDao.getAllHotels();
		
	}

}
