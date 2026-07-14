package com.example.library.dto.response;

import com.example.library.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShelfLoansResponse {
        private Book book;
        private int daysLeft;
}
