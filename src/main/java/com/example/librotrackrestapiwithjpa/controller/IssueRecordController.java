package com.example.librotrackrestapiwithjpa.controller;

import com.example.librotrackrestapiwithjpa.model.IssueRecord;
import com.example.librotrackrestapiwithjpa.service.IssueRecordService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/issue-records")
public class IssueRecordController {

    private final IssueRecordService issueRecordService;

    public IssueRecordController(IssueRecordService issueRecordService) {
        this.issueRecordService = issueRecordService;
    }

    @GetMapping
    public List<IssueRecord> getAllIssueRecords() {
        return issueRecordService.getAllIssueRecords();
    }

    @GetMapping("/{id}")
    public IssueRecord getIssueRecordById(@PathVariable Long id) {
        return issueRecordService.getIssueRecordById(id);
    }

    @PostMapping
    public IssueRecord addIssueRecord(@RequestBody IssueRecord issueRecord) {
        return issueRecordService.addIssueRecord(issueRecord);
    }

    @PutMapping("/{id}")
    public IssueRecord updateIssueRecord(@PathVariable Long id,
                                         @RequestBody IssueRecord issueRecord) {
        return issueRecordService.updateIssueRecord(id, issueRecord);
    }

    @DeleteMapping("/{id}")
    public void deleteIssueRecord(@PathVariable Long id) {
        issueRecordService.deleteIssueRecord(id);
    }

    @GetMapping("/student/{studentId}")
    public List<IssueRecord> getCurrentlyIssuedBooksByStudent(
            @PathVariable Long studentId) {

        return issueRecordService.getCurrentlyIssuedBooksByStudent(studentId);
    }
}