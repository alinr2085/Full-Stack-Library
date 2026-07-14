package com.example.library;

import com.example.library.entity.Checkout;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@SpringBootApplication
@RestController
public class LibraryApplication {
        public static void main(String[] args) {
                SpringApplication.run(LibraryApplication.class, args);
        }

        @GetMapping("/start")
        public String hello() {
                return "this is a library application with spring boot and react";
        }
}
