package com.squad.api.controller;

import com.squad.api.dto.BookRequest;
import com.squad.api.model.Book;
import com.squad.api.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@Tag(name = "Books", description = "Gerenciamento da biblioteca de livros")
public class BookController {

    private final BookService bookService;

    @Operation(summary = "Criar livro", description = "Adiciona um novo livro à biblioteca")
    @ApiResponse(responseCode = "201", description = "Livro criado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
    @PostMapping
    public ResponseEntity<Book> createBook(@Valid @RequestBody BookRequest request) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.createBook(request, userId));
    }

    @Operation(summary = "Listar livros", description = "Retorna todos os livros ordenados por status")
    @ApiResponse(responseCode = "200", description = "Lista de livros")
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(bookService.getAllBooks(userId));
    }

    @Operation(summary = "Atualizar livro", description = "Atualiza todos os campos de um livro")
    @ApiResponse(responseCode = "200", description = "Livro atualizado")
    @ApiResponse(responseCode = "404", description = "Livro não encontrado")
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(
            @Parameter(description = "ID do livro") @PathVariable UUID id,
            @Valid @RequestBody BookRequest request) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(bookService.updateBook(id, request, userId));
    }

    @Operation(summary = "Deletar livro", description = "Remove um livro permanentemente")
    @ApiResponse(responseCode = "204", description = "Livro deletado")
    @ApiResponse(responseCode = "404", description = "Livro não encontrado")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(
            @Parameter(description = "ID do livro") @PathVariable UUID id) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        bookService.deleteBook(id, userId);
        return ResponseEntity.noContent().build();
    }
}
