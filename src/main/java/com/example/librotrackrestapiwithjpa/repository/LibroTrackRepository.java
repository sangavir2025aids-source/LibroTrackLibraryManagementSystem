package com.example.librotrackrestapiwithjpa.repository;

import com.example.librotrackrestapiwithjpa.model.LibroTrackModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LibroTrackRepository extends JpaRepository<LibroTrackModel, Long> {

    List<LibroTrackModel> findByTitleContainingIgnoreCase(String title);

    List<LibroTrackModel> findByAuthorContainingIgnoreCase(String author);

    List<LibroTrackModel> findByCategoryContainingIgnoreCase(String category);
}