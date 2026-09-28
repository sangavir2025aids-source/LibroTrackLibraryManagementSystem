package com.example.librotrackrestapiwithjpa.repository;

import com.example.librotrackrestapiwithjpa.model.IssueRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRecordRepository extends JpaRepository<IssueRecord, Long> {

    List<IssueRecord> findByStudentIdAndReturnDateIsNull(Long studentId);
}