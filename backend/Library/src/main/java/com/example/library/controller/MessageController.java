package com.example.library.controller;


import com.example.library.dto.request.MessageRequest;
import com.example.library.dto.response.AdminResponse;
import com.example.library.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/messages")
public class MessageController {
        private final MessageService messageService;

        @Autowired
        public MessageController(MessageService messageService) {
                this.messageService = messageService;
        }

        @PutMapping("/secure/admin/message/response")
        public void submitResponse(@AuthenticationPrincipal Jwt jwt, @RequestBody AdminResponse adminResponse) throws Exception {
                String email = jwt.getClaimAsString("email");
                Map<String, Object> userMetadata = jwt.getClaim("user_metadata");
                String role = userMetadata != null ? (String) userMetadata.get("userType") : null;
                if (role == null || !role.equals("admin"))
                        throw new Exception("administration page only");
                adminResponse.setAdminEmail(email);
                messageService.submitResponse(adminResponse);
        }

        @PostMapping("/secure/new/message")
        public void submitMessage(@AuthenticationPrincipal Jwt jwt, @RequestBody MessageRequest messageRequest) {
                String email = jwt.getClaimAsString("email");
                messageRequest.setUserEmail(email);
                messageService.submitMessage(messageRequest);
        }
}
