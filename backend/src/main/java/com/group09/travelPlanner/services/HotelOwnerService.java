package com.group09.travelPlanner.services;

import com.group09.travelPlanner.entities.User;
import com.group09.travelPlanner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelOwnerService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllHotelOwners() {
        return userRepository.findByRole("owner");
    }

    public User createHotelOwner(User hotelOwner) {
        return userRepository.save(hotelOwner);
    }

    public boolean deleteHotelOwner(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}