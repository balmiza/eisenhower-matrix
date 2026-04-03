package com.squad.api.service;

import com.squad.api.dto.BookRequest;
import com.squad.api.model.Book;
import com.squad.api.model.BookStatus;
import com.squad.api.repository.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    @Transactional
    public Book createBook(BookRequest request) {
        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .category(request.getCategory())
                .status(request.getStatus() != null ? request.getStatus() : BookStatus.WANT_TO_READ)
                .rating(request.getRating())
                .mainPoints(request.getMainPoints())
                .readingDate(request.getReadingDate())
                .build();
        return bookRepository.save(book);
    }

    @Transactional(readOnly = true)
    public List<Book> getAllBooks() {
        return bookRepository.findAllOrderByStatus();
    }

    @Transactional
    public Book updateBook(UUID id, BookRequest request) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + id));
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setCategory(request.getCategory());
        book.setStatus(request.getStatus() != null ? request.getStatus() : book.getStatus());
        book.setRating(request.getRating());
        book.setMainPoints(request.getMainPoints());
        book.setReadingDate(request.getReadingDate());
        return bookRepository.save(book);
    }

    @Transactional
    public void deleteBook(UUID id) {
        if (!bookRepository.existsById(id)) {
            throw new EntityNotFoundException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }
}
