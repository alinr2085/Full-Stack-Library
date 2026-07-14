package com.example.library.dto.request;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long amount;
    private String currency;
    private String receiptEmail;
}
