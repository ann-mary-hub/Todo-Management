package com.todo.Management.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.Management.Entity.User;
import com.todo.Management.Repository.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    // private final BCryptPasswordEncoder passwordEncoder = new
    // BCryptPasswordEncoder();

    public User registerUser(String username, String password, String name, String email) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setName(name);
        user.setEmail(email);
        return userRepo.save(user);
    }

    public User findByUsername(String username) {
        Optional<User> userOpt = userRepo.findByUsername(username);
        return userOpt.orElse(null); // Return null if user not found
    }

    public void updateUserDetails(String username, String name, String email, String address, String phone) {
        Optional<User> userOptional = userRepo.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setName(name);
            user.setEmail(email);
            user.setAddress(address);
            user.setPhone(phone);
            userRepo.save(user);
        } else {
            throw new RuntimeException("User not found with username: " + username);
        }
    }

}
