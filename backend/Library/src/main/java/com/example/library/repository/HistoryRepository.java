package com.example.library.repository;

import com.example.library.entity.Checkout;
import com.example.library.entity.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface HistoryRepository  extends JpaRepository<History, Long> {

        Page<History> findByUserEmail(@RequestParam("email") String userEmail, Pageable pageable);
}
