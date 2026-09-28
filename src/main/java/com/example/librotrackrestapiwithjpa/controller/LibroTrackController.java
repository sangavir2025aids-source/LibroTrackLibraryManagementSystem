package com.example.librotrackrestapiwithjpa.controller;

import com.example.librotrackrestapiwithjpa.model.LibroTrackModel;
import com.example.librotrackrestapiwithjpa.service.LibroTrackService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/books")
public class LibroTrackController {

    private final LibroTrackService libroTrackService;

    public LibroTrackController(LibroTrackService libroTrackService) {
        this.libroTrackService = libroTrackService;
    }

    @GetMapping
    public List<LibroTrackModel> getAllBooks() {
        return libroTrackService.getAllBooks();
    }

    @GetMapping("/{id}")
    public LibroTrackModel getBookById(@PathVariable Long id) {
        return libroTrackService.getBookById(id);
    }

    @PostMapping
    public LibroTrackModel addBook(@Valid @RequestBody LibroTrackModel book) {
        return libroTrackService.addBook(book);
    }

    @PutMapping("/{id}")
    public LibroTrackModel updateBook(@PathVariable Long id,
                                      @RequestBody LibroTrackModel book) {
        return libroTrackService.updateBook(id, book);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        libroTrackService.deleteBook(id);
    }

    @GetMapping("/search/title")
    public List<LibroTrackModel> searchByTitle(@RequestParam String title) {
        return libroTrackService.searchByTitle(title);
    }

    @GetMapping("/search/author")
    public List<LibroTrackModel> searchByAuthor(@RequestParam String author) {
        return libroTrackService.searchByAuthor(author);
    }

    @GetMapping("/search/category")
    public List<LibroTrackModel> searchByCategory(@RequestParam String category) {
        return libroTrackService.searchByCategory(category);
    }
}