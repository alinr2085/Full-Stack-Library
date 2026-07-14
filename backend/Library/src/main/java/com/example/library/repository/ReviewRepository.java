package com.example.library.repository;

import com.example.library.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

public interface ReviewRepository extends JpaRepository<Review, Long> {
        @RestResource(path = "bookId")
        Page<Review> findByBookId(@Param("bookId") Long bookId, Pageable pageable);

        Review findByBookIdAndUserEmail(Long bookId,  String userEmail);

        @Modifying
        @Query("DELETE FROM Review r WHERE r.bookId in :bookId")
        void deleteByBookId(@Param("bookId") Long bookId);
}
