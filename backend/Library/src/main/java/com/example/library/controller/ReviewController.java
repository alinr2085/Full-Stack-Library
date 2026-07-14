package com.example.library.controller;

import com.example.library.dto.request.ReviewRequest;
import com.example.library.entity.Review;
import com.example.library.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

        private final ReviewService reviewService;

        @Autowired
        public ReviewController(ReviewService reviewService) {
                this.reviewService = reviewService;
        }

        @GetMapping("/secure/user/review")
        public Boolean userHasReview(@AuthenticationPrincipal Jwt jwt, @RequestParam Long bookId) throws Exception {
                String email = jwt.getClaimAsString("email");
                return reviewService.userHasReview(email, bookId);
        }

        @PostMapping("/secure/newReview")
        public void addReview(@AuthenticationPrincipal Jwt jwt, @RequestBody ReviewRequest reviewRequest) throws Exception {
                String email = jwt.getClaimAsString("email");
                reviewRequest.setUserEmail(email);
                reviewService.addReview(reviewRequest);
        }
}
