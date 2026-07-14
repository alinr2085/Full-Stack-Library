package com.example.library.controller;

import com.example.library.dto.request.PaymentRequest;
import com.example.library.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/secure/payment-intent")
    public ResponseEntity<String> paymentIntent(@RequestBody PaymentRequest paymentRequest) throws StripeException {
        PaymentIntent paymentIntent = paymentService.createPayment(paymentRequest);
        String paymentStr = paymentIntent.toJson();

        return ResponseEntity.ok(paymentStr);
    }

    @PutMapping("/secure/payment-complete")
    public ResponseEntity<String> paymentComplete(@AuthenticationPrincipal Jwt jwt) throws Exception {
        String email = jwt.getClaimAsString("email");
        if (email == null) {
            throw new Exception("user not found");
        }
        return paymentService.stripePayment(email);

    }

}
