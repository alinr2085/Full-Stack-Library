package com.example.library.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "history")
public class History {

        public History() {}

        public History(String userEmail, String checkoutDate, String returnDate,
                       String title, String author, String description, String img) {
                this.userEmail = userEmail;
                this.checkoutDate = checkoutDate;
                this.returnDate = returnDate;
                this.title = title;
                this.author = author;
                this.description = description;
                this.img = img;
        }

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String userEmail;
        private String checkoutDate;
        private String returnDate;
        private String title;
        private String author;
        private String description;
        private String img;
}
