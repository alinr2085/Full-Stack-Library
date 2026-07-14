package com.example.library.controller;

import com.example.library.dto.response.ShelfLoansResponse;
import com.example.library.entity.Book;
import com.example.library.service.BookService;
import com.example.library.utils.ExtractJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.nimbusds.jwt.JWT;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

        private final BookService bookService;

        @Autowired
        public BookController(BookService bookService) {
                this.bookService = bookService;
        }

        @PutMapping("/secure/renew/loan")
        public void renewLoan(@AuthenticationPrincipal Jwt jwt, @RequestParam Long bookId) throws Exception {
                String email = jwt.getClaimAsString("email");
                bookService.renewLoan(email, bookId);
        }

        @PutMapping("/secure/return/book")
        public void returnBook(@AuthenticationPrincipal Jwt jwt, @RequestParam Long bookId) throws Exception {
                String email = jwt.getClaimAsString("email");
                bookService.returnBook(email, bookId);
        }

        @GetMapping("/secure/loans")
        public List<ShelfLoansResponse> currentLoans(@AuthenticationPrincipal Jwt jwt)  {
                String email = jwt.getClaimAsString("email");
                return bookService.loans(email);
        }


        @GetMapping("/secure/checkout/count")
        public int checkoutCount(@AuthenticationPrincipal Jwt jwt) {
                String email = jwt.getClaimAsString("email");
                return bookService.numberOfCheckedOutBooksByUser(email);
        }

        @GetMapping("/secure/ischeckedout")
        public Boolean isCheckedOutByUser(@AuthenticationPrincipal Jwt jwt,@RequestParam Long bookId)  {
                String email = jwt.getClaimAsString("email");
                return bookService.isCheckedOutByUser(email, bookId);
        }

        @PostMapping("/secure/checkout")
        public Book checkoutBook(@AuthenticationPrincipal Jwt jwt,@RequestParam Long bookId) throws Exception {
                String email = jwt.getClaimAsString("email");
                return bookService.checkoutBook(email, bookId);
        }

        @GetMapping("/secure/debug")
        public String debug() {
                Authentication auth =
                        SecurityContextHolder.getContext().getAuthentication();

                return auth.getClass().getName() + " | " + auth.getName();
        }



}