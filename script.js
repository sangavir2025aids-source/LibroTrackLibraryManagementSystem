// ============================================================
// LibroTrack Library Management System
// ============================================================


// ================= BOOKS =================

// Load all books
function loadBooks() {

    fetch("http://localhost:8080/books")

        .then(response => response.json())

        .then(books => {

            const tableBody =
                document.getElementById("bookTableBody");

            tableBody.innerHTML = "";

            books.forEach(book => {

                const row =
                    document.createElement("tr");

                row.innerHTML = `

                    <td>${book.id}</td>

                    <td>${book.title}</td>

                    <td>${book.author}</td>

                    <td>${book.isbn}</td>

                    <td>${book.category}</td>

                    <td>${book.totalCopies}</td>

                    <td>${book.availableCopies}</td>

                    <td>

                        <button
                            class="delete-button"
                            onclick="deleteBook(${book.id})">

                            Delete

                        </button>

                    </td>

                `;

                tableBody.appendChild(row);

            });

        })

        .catch(error => {

            console.error(
                "Error loading books:",
                error
            );

            alert(
                "Unable to load books."
            );

        });
}


// ================= SEARCH BOOKS =================

function searchBooks(type) {

    const searchValue =
        document.getElementById("searchBook").value;

    if (searchValue.trim() === "") {

        alert(
            "Please enter a search value."
        );

        return;
    }

    const url =
        `http://localhost:8080/books/search/${type}?${type}=${encodeURIComponent(searchValue)}`;

    fetch(url)

        .then(response => response.json())

        .then(books => {

            const tableBody =
                document.getElementById("bookTableBody");

            tableBody.innerHTML = "";

            books.forEach(book => {

                const row =
                    document.createElement("tr");

                row.innerHTML = `

                    <td>${book.id}</td>

                    <td>${book.title}</td>

                    <td>${book.author}</td>

                    <td>${book.isbn}</td>

                    <td>${book.category}</td>

                    <td>${book.totalCopies}</td>

                    <td>${book.availableCopies}</td>

                    <td>

                        <button
                            class="delete-button"
                            onclick="deleteBook(${book.id})">

                            Delete

                        </button>

                    </td>

                `;

                tableBody.appendChild(row);

            });

        })

        .catch(error => {

            console.error(
                "Error searching books:",
                error
            );

            alert(
                "Unable to search books."
            );

        });
}


// ================= ADD BOOK =================

function addBook() {

    const book = {

        title:
            document.getElementById("title").value,

        author:
            document.getElementById("author").value,

        isbn:
            document.getElementById("isbn").value,

        category:
            document.getElementById("category").value,

        totalCopies:
            Number(
                document.getElementById("totalCopies").value
            ),

        availableCopies:
            Number(
                document.getElementById("totalCopies").value
            )

    };

    fetch("http://localhost:8080/books", {

        method: "POST",

        headers: {

            "Content-Type":
                "application/json"

        },

        body:
            JSON.stringify(book)

    })

        .then(response => response.json())

        .then(data => {

            if (data.error) {

                alert(data.error);

                return;
            }

            alert(
                "Book added successfully!"
            );

            document.getElementById("title").value = "";

            document.getElementById("author").value = "";

            document.getElementById("isbn").value = "";

            document.getElementById("category").value = "";

            document.getElementById("totalCopies").value = "";

            loadBooks();

            loadDashboard();

        })

        .catch(error => {

            console.error(
                "Error adding book:",
                error
            );

            alert(
                "Unable to add book."
            );

        });
}


// ================= UPDATE BOOK =================

function updateBook() {

    const id =
        document.getElementById("updateId").value;

    const book = {

        title:
            document.getElementById("updateTitle").value,

        author:
            document.getElementById("updateAuthor").value,

        isbn:
            document.getElementById("updateIsbn").value,

        category:
            document.getElementById("updateCategory").value,

        totalCopies:
            Number(
                document.getElementById("updateTotalCopies").value
            )

    };

    fetch(
        `http://localhost:8080/books/${id}`,
        {

            method: "PUT",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify(book)

        }
    )

        .then(response => response.json())

        .then(data => {

            if (data.error) {

                alert(data.error);

                return;
            }

            alert(
                "Book updated successfully!"
            );

            document.getElementById("updateId").value = "";

            document.getElementById("updateTitle").value = "";

            document.getElementById("updateAuthor").value = "";

            document.getElementById("updateIsbn").value = "";

            document.getElementById("updateCategory").value = "";

            document.getElementById("updateTotalCopies").value = "";

            loadBooks();

            loadDashboard();

        })

        .catch(error => {

            console.error(
                "Error updating book:",
                error
            );

            alert(
                "Unable to update book."
            );

        });
}


// ================= DELETE BOOK =================

function deleteBook(id) {

    if (!confirm(
        "Are you sure you want to delete this book?"
    )) {

        return;
    }

    fetch(
        `http://localhost:8080/books/${id}`,
        {

            method: "DELETE"

        }
    )

        .then(() => {

            alert(
                "Book deleted successfully!"
            );

            loadBooks();

            loadDashboard();

        })

        .catch(error => {

            console.error(
                "Error deleting book:",
                error
            );

            alert(
                "Unable to delete book."
            );

        });
}



// ============================================================
// STUDENTS
// ============================================================


// ================= LOAD STUDENTS =================

function loadStudents() {

    fetch("http://localhost:8080/students")

        .then(response => response.json())

        .then(students => {

            const tableBody =
                document.getElementById(
                    "studentTableBody"
                );

            tableBody.innerHTML = "";

            students.forEach(student => {

                const row =
                    document.createElement("tr");

                row.innerHTML = `

                    <td>${student.id}</td>

                    <td>${student.name}</td>

                    <td>${student.email}</td>

                    <td>

                        <button
                            class="delete-button"
                            onclick="deleteStudent(${student.id})">

                            Delete

                        </button>

                    </td>

                `;

                tableBody.appendChild(row);

            });

        })

        .catch(error => {

            console.error(
                "Error loading students:",
                error
            );

            alert(
                "Unable to load students."
            );

        });
}


// ================= ADD STUDENT =================

function addStudent() {

    const student = {

        name:
            document.getElementById(
                "studentName"
            ).value,

        email:
            document.getElementById(
                "studentEmail"
            ).value

    };

    fetch("http://localhost:8080/students", {

        method: "POST",

        headers: {

            "Content-Type":
                "application/json"

        },

        body:
            JSON.stringify(student)

    })

        .then(response => response.json())

        .then(data => {

            if (data.error) {

                alert(data.error);

                return;
            }

            alert(
                "Student added successfully!"
            );

            document.getElementById(
                "studentName"
            ).value = "";

            document.getElementById(
                "studentEmail"
            ).value = "";

            loadStudents();

            loadDashboard();

        })

        .catch(error => {

            console.error(
                "Error adding student:",
                error
            );

            alert(
                "Unable to add student."
            );

        });
}


// ================= UPDATE STUDENT =================

function updateStudent() {

    const id =
        document.getElementById(
            "updateStudentId"
        ).value;

    const student = {

        name:
            document.getElementById(
                "updateStudentName"
            ).value,

        email:
            document.getElementById(
                "updateStudentEmail"
            ).value

    };

    fetch(
        `http://localhost:8080/students/${id}`,
        {

            method: "PUT",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify(student)

        }
    )

        .then(response => response.json())

        .then(data => {

            if (data.error) {

                alert(data.error);

                return;
            }

            alert(
                "Student updated successfully!"
            );

            document.getElementById(
                "updateStudentId"
            ).value = "";

            document.getElementById(
                "updateStudentName"
            ).value = "";

            document.getElementById(
                "updateStudentEmail"
            ).value = "";

            loadStudents();

            loadDashboard();

        })

        .catch(error => {

            console.error(
                "Error updating student:",
                error
            );

            alert(
                "Unable to update student."
            );

        });
}


// ================= DELETE STUDENT =================

function deleteStudent(id) {

    if (!confirm(
        "Are you sure you want to delete this student?"
    )) {

        return;
    }

    fetch(
        `http://localhost:8080/students/${id}`,
        {

            method: "DELETE"

        }
    )

        .then(() => {

            alert(
                "Student deleted successfully!"
            );

            loadStudents();

            loadDashboard();

        })

        .catch(error => {

            console.error(
                "Error deleting student:",
                error
            );

            alert(
                "Unable to delete student."
            );

        });
}



// ============================================================
// ISSUE BOOK
// ============================================================


// ================= ISSUE BOOK =================

function issueBook() {

    const issueRecord = {

        bookId:
            Number(
                document.getElementById(
                    "issueBookId"
                ).value
            ),

        studentId:
            Number(
                document.getElementById(
                    "issueStudentId"
                ).value
            )

    };

    fetch(
        "http://localhost:8080/issue-records",
        {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify(issueRecord)

        }
    )

        .then(response => response.json())

        .then(data => {

            if (data.error) {

                alert(data.error);

                return;
            }

            alert(
                "Book issued successfully!"
            );

            document.getElementById(
                "issueBookId"
            ).value = "";

            document.getElementById(
                "issueStudentId"
            ).value = "";

            loadIssueRecords();

            loadBooks();

            loadDashboard();

        })

        .catch(error => {

            console.error(
                "Error issuing book:",
                error
            );

            alert(
                "Unable to issue book."
            );

        });
}



// ============================================================
// RETURN BOOK
// ============================================================


// ================= RETURN BOOK =================

function returnBook() {

    const issueId =
        document.getElementById(
            "returnIssueId"
        ).value;

    const returnDate =
        document.getElementById(
            "returnDate"
        ).value;

    const issueRecord = {

        returnDate:
            returnDate

    };

    fetch(
        `http://localhost:8080/issue-records/${issueId}`,
        {

            method: "PUT",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify(issueRecord)

        }
    )

        .then(response => response.json())

        .then(data => {

            if (data.error) {

                alert(data.error);

                return;

            }

            alert(
                "Book returned successfully!"
            );

            document.getElementById(
                "returnIssueId"
            ).value = "";

            document.getElementById(
                "returnDate"
            ).value = "";

            loadIssueRecords();

            loadBooks();

            loadDashboard();

        })

        .catch(error => {

            console.error(
                "Error returning book:",
                error
            );

            alert(
                "Unable to return book."
            );

        });
}



// ============================================================
// ISSUE RECORDS
// ============================================================


// ================= LOAD ISSUE RECORDS =================

function loadIssueRecords() {

    fetch(
        "http://localhost:8080/issue-records"
    )

        .then(response => response.json())

        .then(records => {

            const tableBody =
                document.getElementById(
                    "issueTableBody"
                );

            tableBody.innerHTML = "";

            records.forEach(record => {

                const row =
                    document.createElement("tr");

                row.innerHTML = `

                    <td>${record.id}</td>

                    <td>${record.bookId}</td>

                    <td>${record.studentId}</td>

                    <td>${record.issueDate || ""}</td>

                    <td>${record.dueDate || ""}</td>

                    <td>${record.returnDate || ""}</td>

                    <td>${record.fine || 0}</td>

                    <td>

                        <button
                            class="delete-button"
                            onclick="deleteIssueRecord(${record.id})">

                            Delete

                        </button>

                    </td>

                `;

                tableBody.appendChild(row);

            });

        })

        .catch(error => {

            console.error(
                "Error loading issue records:",
                error
            );

            alert(
                "Unable to load issue records."
            );

        });
}


// ================= DELETE ISSUE RECORD =================

function deleteIssueRecord(id) {

    if (!confirm(
        "Are you sure you want to delete this issue record?"
    )) {

        return;
    }

    fetch(
        `http://localhost:8080/issue-records/${id}`,
        {

            method: "DELETE"

        }
    )

        .then(() => {

            alert(
                "Issue record deleted successfully!"
            );

            loadIssueRecords();

            loadBooks();

            loadDashboard();

        })

        .catch(error => {

            console.error(
                "Error deleting issue record:",
                error
            );

            alert(
                "Unable to delete issue record."
            );

        });
}



// ============================================================
// DASHBOARD
// ============================================================


// ================= LOAD DASHBOARD =================

function loadDashboard() {

    // ---------------- BOOKS ----------------

    fetch(
        "http://localhost:8080/books"
    )

        .then(response => response.json())

        .then(books => {

            document.getElementById(
                "totalBooks"
            ).textContent = books.length;

            let totalAvailable = 0;

            books.forEach(book => {

                totalAvailable +=
                    book.availableCopies;

            });

            document.getElementById(
                "availableCopies"
            ).textContent =
                totalAvailable;

        })

        .catch(error => {

            console.error(
                "Error loading dashboard books:",
                error
            );

        });


    // ---------------- STUDENTS ----------------

    fetch(
        "http://localhost:8080/students"
    )

        .then(response => response.json())

        .then(students => {

            document.getElementById(
                "totalStudents"
            ).textContent =
                students.length;

        })

        .catch(error => {

            console.error(
                "Error loading dashboard students:",
                error
            );

        });


    // ---------------- ISSUED BOOKS ----------------

    fetch(
        "http://localhost:8080/issue-records"
    )

        .then(response => response.json())

        .then(records => {

            const issuedCount =
                records.filter(
                    record =>
                        record.returnDate === null
                ).length;

            document.getElementById(
                "issuedBooks"
            ).textContent =
                issuedCount;

        })

        .catch(error => {

            console.error(
                "Error loading dashboard issue records:",
                error
            );

        });
}



// ============================================================
// PAGE LOAD
// ============================================================

window.onload = function () {

    loadDashboard();

};