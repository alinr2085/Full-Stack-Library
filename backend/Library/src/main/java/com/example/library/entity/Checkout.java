package com.example.library.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "checkout")
public class Checkout {

        public Checkout() {}

        public Checkout(String userEmail, String checkoutDate, String returnDate, Long bookId) {
                this.userEmail = userEmail;
                this.checkoutDate = checkoutDate;
                this.returnDate = returnDate;
                this.bookId = bookId;
        }

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String userEmail;
        private String checkoutDate;
        private String returnDate;
        private Long bookId;
}
