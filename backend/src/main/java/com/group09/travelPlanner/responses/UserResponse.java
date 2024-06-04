package com.group09.travelPlanner.responses;
import com.group09.travelPlanner.entities.User;
import lombok.Data;

@Data
public class UserResponse {
	
	Long id;
	String mail;

	public UserResponse(User entity) {
		this.id = entity.getUserID();
		this.mail = entity.getMail();
	} 
}