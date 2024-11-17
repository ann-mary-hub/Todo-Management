package com.todo.Management.Configuration;

// import java.util.List;

// // import org.springframework.context.annotation.Bean;
// // import org.springframework.context.annotation.Configuration;
// // import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// // import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// // import org.springframework.security.core.userdetails.User;
// // import org.springframework.security.core.userdetails.UserDetailsService;
// // import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// // import org.springframework.security.crypto.password.PasswordEncoder;
// // import org.springframework.security.provisioning.InMemoryUserDetailsManager;
// // import org.springframework.security.web.SecurityFilterChain;
// // import org.springframework.web.bind.annotation.CrossOrigin;

// // @Configuration
// // @EnableWebSecurity
// // @CrossOrigin(origins = "http://localhost:3000")
// // public class SecurityConfig {

// //     @Bean
// //     public UserDetailsService userDetailsService() {
// //         // Create a user with username "user" and password "password"
// //         InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
// //         manager.createUser(User.withUsername("user")
// //                 .password(passwordEncoder().encode("password"))
// //                 .roles("USER")
// //                 .build());
// //         return manager;
// //     }

// //     @Bean
// //     public PasswordEncoder passwordEncoder() {
// //         return new BCryptPasswordEncoder();
// //     }

// //     @Bean
// //     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
// //         http.csrf().disable()
// //             .authorizeRequests()
// //             .requestMatchers("/api/**").authenticated() 
// //             .requestMatchers("/**").permitAll() // Secure all /api endpoints
// //             .anyRequest().permitAll()  // Allow other endpoints to be accessed without authentication
// //             .and()
// //             .httpBasic();  // Enable Basic Authentication
// //         return http.build();
// //     }
// // }



// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.provisioning.InMemoryUserDetailsManager;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http.csrf().disable()  // Disable CSRF for simplicity
//             .authorizeRequests()
//                 .requestMatchers("/api/basic-auth").permitAll()  // Allow login and signup without authentication
//                 .anyRequest().authenticated()  // Secure other endpoints
//             .and()
//             .httpBasic();  // Enable HTTP Basic Authentication

//         return http.build();
//     }

//     @Bean
//     public UserDetailsService userDetailsService() {
//         InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
//         manager.createUser(User.withUsername("admin")
//                 .password(passwordEncoder().encode("password"))  // Example password
//                 .roles("USER")
//                 .build());
//         return manager;
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }
// }



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(withDefaults()); // Enable CORS
        http.csrf(csrf -> csrf.disable()); // Disable CSRF if needed
        return http.build();
    }
}





