# LibroTrack Library Management System

LibroTrack is a full-stack Library Management System developed using Java, Spring Boot, Spring Data JPA, MySQL, HTML, CSS, and JavaScript.

## Project Overview

LibroTrack helps manage books, students, book issuing, book returns, due dates, late fines, and book searching through a simple web interface.

## Features

### Book Management

- Add new books
- View all books
- View a book by ID
- Update book details
- Delete books
- Search books by title
- Search books by author
- Search books by category
- Track total and available copies

### Student Management

- Add students
- View students
- Update student details
- Delete students

### Book Issue and Return

- Issue books to students
- Automatically calculate a 14-day due date
- Prevent issuing when no copies are available
- Return books
- Automatically calculate late fines
- Track return dates
- View currently issued books for a student

## Technologies Used

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- MySQL
- Maven

### Frontend

- HTML5
- CSS3
- JavaScript
- REST API

## Project Architecture

```text
Frontend
   |
   | REST API
   v
Controller
   |
   v
Service
   |
   v
Repository
   |
   v
MySQL Database