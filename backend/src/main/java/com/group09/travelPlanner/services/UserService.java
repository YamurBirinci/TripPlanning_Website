package com.group09.travelPlanner.services;

import com.group09.travelPlanner.entities.User;
import com.group09.travelPlanner.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveOneUser(User newUser) {
        return userRepository.save(newUser);
    }

    public User getOneUser(Long userID) {
        return userRepository.findById(userID).orElse(null);
    }

    public User getOneUserByMailAndPassword(String mail, String password) {
        return userRepository.findByMailAndPassword(mail, password).orElse(null);
    }
}
