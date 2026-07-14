package com.example.library.dto.request;

import lombok.Data;

@Data
public class ReviewRequest {
        private String userEmail;
        private double rating;
        private Long bookId;
        private String description;
}
