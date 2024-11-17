package com.todo.Management.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class Security {

    @GetMapping("/basic-auth")
    public String getSecureData() {
        return "This is secure data.";
    }
}

