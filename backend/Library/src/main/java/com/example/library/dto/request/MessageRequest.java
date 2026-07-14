package com.example.library.dto.request;

import lombok.Data;

@Data
public class MessageRequest {
        private String userEmail;
        private String title;
        private String question;
}
