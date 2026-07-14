package com.example.library.service;


import com.example.library.dto.request.ReviewRequest;
import com.example.library.entity.Review;
import com.example.library.repository.BookRepository;
import com.example.library.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Service
@Transactional
public class ReviewService {

        private BookRepository bookRepository;
        private ReviewRepository reviewRepository;

        @Autowired
        public ReviewService(BookRepository bookRepository, ReviewRepository reviewRepository) {
                this.bookRepository = bookRepository;
                this.reviewRepository = reviewRepository;
        }

        public void addReview(ReviewRequest reviewRequest) throws Exception {
                Review review = reviewRepository.findByBookIdAndUserEmail(reviewRequest.getBookId(), reviewRequest.getUserEmail());
                if (review != null) {
                        throw new Exception("you already added a review for this book");
                }
                review = new Review();
                review.setBookId(reviewRequest.getBookId());
                review.setUserEmail(reviewRequest.getUserEmail());
                review.setRating(reviewRequest.getRating());
                review.setReviewDescription(reviewRequest.getDescription() == null ? "" : reviewRequest.getDescription());
                reviewRepository.save(review);
        }

        public Boolean userHasReview(String userEmail, Long bookId) throws Exception {
                return reviewRepository.findByBookIdAndUserEmail(bookId, userEmail) != null;

        }

}
