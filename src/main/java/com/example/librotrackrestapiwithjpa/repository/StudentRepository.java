package com.example.librotrackrestapiwithjpa.repository;

import com.example.librotrackrestapiwithjpa.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}