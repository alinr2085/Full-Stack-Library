package com.example.library.repository;

import com.example.library.entity.Book;
import com.example.library.entity.Checkout;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;
import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

        Optional<Checkout> findByUserEmailAndBookId(String userEmail, Long bookId);

        List<Checkout> findUserBooksByUserEmail(String userEmail);

        @Modifying
        @Query("DELETE FROM Checkout c WHERE c.bookId in :bookId")
        void deleteByBookId(@Param("bookId") Long bookId);
}
