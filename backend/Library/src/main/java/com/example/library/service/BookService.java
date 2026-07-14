package com.example.library.service;

import com.example.library.dto.response.ShelfLoansResponse;
import com.example.library.entity.Book;
import com.example.library.entity.Checkout;
import com.example.library.entity.History;
import com.example.library.entity.Payment;
import com.example.library.repository.BookRepository;
import com.example.library.repository.CheckoutRepository;
import com.example.library.repository.HistoryRepository;
import com.example.library.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class BookService {

    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;
    private HistoryRepository historyRepository;
    private PaymentRepository paymentRepository;

    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository, HistoryRepository historyRepository, PaymentRepository paymentRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyRepository = historyRepository;
        this.paymentRepository = paymentRepository;
    }

    public Boolean isCheckedOutByUser(String userEmail, Long bookId) {
        return checkoutRepository.findByUserEmailAndBookId(userEmail, bookId).isPresent();
    }

    public Book checkoutBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);
        Optional<Checkout> checkout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (book.isEmpty() || checkout.isPresent() || book.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book dose not exist or not available or already checked out by user");
        }

        List<Checkout> checkouts = checkoutRepository.findUserBooksByUserEmail(userEmail);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        boolean bookNeedsReturned = false;

        for (Checkout c : checkouts) {
            LocalDate returnDate = LocalDate.parse(c.getReturnDate(), formatter);
            long diffDays = ChronoUnit.DAYS.between(LocalDate.now(), returnDate);
            if (diffDays < 0) {
                bookNeedsReturned = true;
                break;
            }
        }

        Payment userPayment = paymentRepository.findByUserEmail(userEmail);
        if (userPayment != null && (bookNeedsReturned || userPayment.getAmount() > 0) ) {
            throw new Exception("pay user fines");
        }

        if (userPayment == null) {
            Payment payment = new Payment();
            payment.setUserEmail(userEmail);
            payment.setAmount(0.0);
            paymentRepository.save(payment);
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());

        Checkout newCheckout = new Checkout(userEmail, LocalDate.now().toString(), LocalDate.now().plusDays(14).toString(), bookId);
        checkoutRepository.save(newCheckout);
        return book.get();
    }

    public int numberOfCheckedOutBooksByUser(String userEmail) {
        return checkoutRepository.findUserBooksByUserEmail(userEmail).size();
    }

    public List<ShelfLoansResponse> loans(String userEmail) {
        List<ShelfLoansResponse> shelfLoans = new ArrayList<>();
        List<Checkout> checkoutList = checkoutRepository.findUserBooksByUserEmail(userEmail);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        for (Checkout checkout : checkoutList) {
            Book book = bookRepository.findById(checkout.getBookId()).orElseThrow(() -> new RuntimeException("Book not found"));
            LocalDate returnDate = LocalDate.parse(checkout.getReturnDate(), formatter);
            long daysLeft = ChronoUnit.DAYS.between(LocalDate.now(), returnDate);
            shelfLoans.add(new ShelfLoansResponse(book, (int) daysLeft));
        }
        return shelfLoans;
    }

    public void returnBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);
        Optional<Checkout> checkout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (book.isEmpty() || checkout.isEmpty()) {
            throw new Exception("Book dose not exist or already checked out by user");
        }
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);
        bookRepository.save(book.get());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate returnDate = LocalDate.parse(checkout.get().getReturnDate(), formatter);
        long diffDays = ChronoUnit.DAYS.between(LocalDate.now(), returnDate);
        if (diffDays < 0) {
            Payment userPayment = paymentRepository.findByUserEmail(userEmail);
            userPayment.setAmount(userPayment.getAmount() - diffDays);
            paymentRepository.save(userPayment);
        }

        checkoutRepository.delete(checkout.get());

        History history = new History(userEmail, checkout.get().getCheckoutDate(), checkout.get().getReturnDate(),
                book.get().getTitle(), book.get().getAuthor(), book.get().getDescription(), book.get().getImg());
        historyRepository.save(history);
    }

    public void renewLoan(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);
        Optional<Checkout> checkout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (book.isEmpty() || checkout.isEmpty()) {
            throw new Exception("Book dose not exist or already checked out by user");
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate returnDate = LocalDate.parse(checkout.get().getReturnDate(), formatter);
        long diff = ChronoUnit.DAYS.between(LocalDate.now(), returnDate);
        if (diff >= 0) {
            checkout.get().setReturnDate(LocalDate.now().plusDays(14).toString());
            checkoutRepository.save(checkout.get());
        }
    }

}
