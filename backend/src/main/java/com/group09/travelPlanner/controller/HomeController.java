package com.group09.travelPlanner.controller;

import com.group09.travelPlanner.entities.User;
import com.group09.travelPlanner.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class HomeController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public String home(Model model) {
        List<User> users = userRepository.findAll();
        model.addAttribute("users", users);
        return "index"; 
    }
}
