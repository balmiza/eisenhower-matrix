package com.squad.api.repository;

import com.squad.api.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {

    @Query("SELECT b FROM Book b ORDER BY b.status ASC, b.createdAt DESC")
    List<Book> findAllOrderByStatus();
}
