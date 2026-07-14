package com.example.library.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "message")
public class Message {

        public Message() {}

        public Message(String userEmail, String question, String title) {
                this.userEmail = userEmail;
                this.question = question;
                this.title = title;
        }

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String userEmail;
        private String title;
        private String question;
        private String adminEmail;
        private String response;
        private Boolean closed = false;
}
