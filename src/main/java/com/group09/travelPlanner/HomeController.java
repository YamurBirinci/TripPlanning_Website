package com.group09.travelPlanner;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @RequestMapping("/")
    public String home() {
        return "index.html"; // This should return the name of your HTML file in the templates folder
    }
}
