package com.example.librotrackrestapiwithjpa.service;

import com.example.librotrackrestapiwithjpa.model.LibroTrackModel;
import com.example.librotrackrestapiwithjpa.repository.LibroTrackRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LibroTrackService {

    private final LibroTrackRepository libroTrackRepository;

    public LibroTrackService(LibroTrackRepository libroTrackRepository) {
        this.libroTrackRepository = libroTrackRepository;
    }

    public List<LibroTrackModel> getAllBooks() {
        return libroTrackRepository.findAll();
    }

    public LibroTrackModel getBookById(Long id) {
        return libroTrackRepository.findById(id).orElse(null);
    }

    public LibroTrackModel addBook(LibroTrackModel book) {
        return libroTrackRepository.save(book);
    }

    public LibroTrackModel updateBook(Long id, LibroTrackModel book) {
        LibroTrackModel existingBook = libroTrackRepository.findById(id).orElse(null);

        if (existingBook != null) {
            existingBook.setTitle(book.getTitle());
            existingBook.setIsbn(book.getIsbn());
            existingBook.setTotalCopies(book.getTotalCopies());

            return libroTrackRepository.save(existingBook);
        }

        return null;
    }

    public void deleteBook(Long id) {
        libroTrackRepository.deleteById(id);
    }

    // Search by title
    public List<LibroTrackModel> searchByTitle(String title) {
        return libroTrackRepository.findByTitleContainingIgnoreCase(title);
    }

    // Search by author
    public List<LibroTrackModel> searchByAuthor(String author) {
        return libroTrackRepository.findByAuthorContainingIgnoreCase(author);
    }

    // Search by category
    public List<LibroTrackModel> searchByCategory(String category) {
        return libroTrackRepository.findByCategoryContainingIgnoreCase(category);
    }
}