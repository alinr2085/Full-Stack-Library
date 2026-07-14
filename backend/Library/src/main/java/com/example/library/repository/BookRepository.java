package com.example.library.repository;

import com.example.library.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.RequestParam;

public interface BookRepository extends JpaRepository<Book, Long> {

        @RestResource(path = "title")
        Page<Book> findByTitleContaining(@Param("title") String title, Pageable pageable);

        @RestResource(path = "category")
        Page<Book> findByCategory(@Param("category") String category, Pageable pageable);
}
