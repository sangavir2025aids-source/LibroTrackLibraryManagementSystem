package com.example.librotrackrestapiwithjpa.service;

import com.example.librotrackrestapiwithjpa.exception.BookNotAvailableException;
import com.example.librotrackrestapiwithjpa.model.IssueRecord;
import com.example.librotrackrestapiwithjpa.model.LibroTrackModel;
import com.example.librotrackrestapiwithjpa.repository.IssueRecordRepository;
import com.example.librotrackrestapiwithjpa.repository.LibroTrackRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class IssueRecordService {

    private final IssueRecordRepository issueRecordRepository;
    private final LibroTrackRepository libroTrackRepository;

    private static final double FINE_PER_DAY = 10.0;

    public IssueRecordService(IssueRecordRepository issueRecordRepository,
                              LibroTrackRepository libroTrackRepository) {
        this.issueRecordRepository = issueRecordRepository;
        this.libroTrackRepository = libroTrackRepository;
    }

    public List<IssueRecord> getAllIssueRecords() {
        return issueRecordRepository.findAll();
    }

    public IssueRecord getIssueRecordById(Long id) {
        return issueRecordRepository.findById(id).orElse(null);
    }

    public IssueRecord addIssueRecord(IssueRecord issueRecord) {

        LibroTrackModel book = libroTrackRepository
                .findById(issueRecord.getBookId())
                .orElse(null);

        if (book == null) {
            return null;
        }

        if (book.getAvailableCopies() <= 0) {
            throw new BookNotAvailableException(
                    "Book is not available. All copies are currently issued."
            );
        }

        LocalDate issueDate = LocalDate.now();

        issueRecord.setIssueDate(issueDate);
        issueRecord.setDueDate(issueDate.plusDays(14));
        issueRecord.setReturnDate(null);
        issueRecord.setFine(0.0);

        book.setAvailableCopies(book.getAvailableCopies() - 1);

        libroTrackRepository.save(book);

        return issueRecordRepository.save(issueRecord);
    }

    public IssueRecord updateIssueRecord(Long id, IssueRecord issueRecord) {

        IssueRecord existingRecord =
                issueRecordRepository.findById(id).orElse(null);

        if (existingRecord != null) {

            /*
             * Update book and student only when values are provided.
             */
            if (issueRecord.getBookId() != null) {
                existingRecord.setBookId(issueRecord.getBookId());
            }

            if (issueRecord.getStudentId() != null) {
                existingRecord.setStudentId(issueRecord.getStudentId());
            }


            /*
             * Return book
             */
            if (issueRecord.getReturnDate() != null
                    && existingRecord.getReturnDate() == null) {

                LocalDate returnDate = issueRecord.getReturnDate();

                existingRecord.setReturnDate(returnDate);

                long lateDays = ChronoUnit.DAYS.between(
                        existingRecord.getDueDate(),
                        returnDate
                );

                if (lateDays > 0) {
                    existingRecord.setFine(lateDays * FINE_PER_DAY);
                } else {
                    existingRecord.setFine(0.0);
                }


                /*
                 * Increase available copies
                 */
                LibroTrackModel book = libroTrackRepository
                        .findById(existingRecord.getBookId())
                        .orElse(null);

                if (book != null) {

                    book.setAvailableCopies(
                            book.getAvailableCopies() + 1
                    );

                    libroTrackRepository.save(book);
                }

            } else {

                /*
                 * Update other details only when values are provided.
                 */
                if (issueRecord.getIssueDate() != null) {
                    existingRecord.setIssueDate(
                            issueRecord.getIssueDate()
                    );
                }

                if (issueRecord.getDueDate() != null) {
                    existingRecord.setDueDate(
                            issueRecord.getDueDate()
                    );
                }

                if (issueRecord.getReturnDate() != null) {
                    existingRecord.setReturnDate(
                            issueRecord.getReturnDate()
                    );
                }

                if (issueRecord.getFine() != null) {
                    existingRecord.setFine(
                            issueRecord.getFine()
                    );
                }
            }

            return issueRecordRepository.save(existingRecord);
        }

        return null;
    }

    public void deleteIssueRecord(Long id) {
        issueRecordRepository.deleteById(id);
    }

    public List<IssueRecord> getCurrentlyIssuedBooksByStudent(Long studentId) {
        return issueRecordRepository.findByStudentIdAndReturnDateIsNull(studentId);
    }
}