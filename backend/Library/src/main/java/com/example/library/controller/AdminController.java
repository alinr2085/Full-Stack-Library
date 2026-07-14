package com.example.library.controller;


import com.example.library.dto.request.AddBookRequest;
import com.example.library.entity.Book;
import com.example.library.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/secure/new/book")
    public void addNewBook(@AuthenticationPrincipal Jwt jwt, @RequestBody AddBookRequest addBookRequest) throws Exception {
        Map<String, Object> userMetadata = jwt.getClaim("user_metadata");
        String role = userMetadata != null ? (String) userMetadata.get("userType") : null;
        if (role == null || !role.equals("admin"))
            throw new Exception("administration page only");
        adminService.addNewBook(addBookRequest);
    }

    @PutMapping("/secure/increase/copies")
    public void increaseCopies(@AuthenticationPrincipal Jwt jwt, @RequestParam Long bookId) throws Exception {
        Map<String, Object> userMetadata = jwt.getClaim("user_metadata");
        String role = userMetadata != null ? (String) userMetadata.get("userType") : null;
        if (role == null || !role.equals("admin"))
            throw new Exception("administration page only");
        adminService.increaseCopies(bookId);
    }

    @PutMapping("/secure/decrease/copies")
    public void decreaseCopies(@AuthenticationPrincipal Jwt jwt, @RequestParam Long bookId) throws Exception {
        Map<String, Object> userMetadata = jwt.getClaim("user_metadata");
        String role = userMetadata != null ? (String) userMetadata.get("userType") : null;
        if (role == null || !role.equals("admin"))
            throw new Exception("administration page only");
        adminService.decreaseCopies(bookId);
    }

    @DeleteMapping("/secure/delete/book")
    public void deleteBook(@AuthenticationPrincipal Jwt jwt, @RequestParam Long bookId) throws Exception {
        Map<String, Object> userMetadata = jwt.getClaim("user_metadata");
        String role = userMetadata != null ? (String) userMetadata.get("userType") : null;
        if (role == null || !role.equals("admin"))
            throw new Exception("administration page only");
        adminService.deleteBook(bookId);
    }

}
