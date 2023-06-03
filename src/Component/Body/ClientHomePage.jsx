import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ClientHomePage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/book")
            .then((response) => response.json())
            .then((data) => {
                setBooks(data);
            })
            .catch((error) => {
                console.log("Error fetching books:", error);
            });
    }, []);

    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this book?");

        if (confirmed) {
            fetch(`http://localhost:8080/book/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // Các header khác nếu cần thiết
                },
            })
                .then((response) => {
                    if (response.ok) {
                        // Xóa thành công
                        console.log("Book deleted successfully");
                        // Thực hiện cập nhật danh sách sau khi xóa
                        const newBooks = books.filter((book) => book.id !== id);
                        setBooks(newBooks);
                    } else {
                        // Xóa thất bại
                        console.log("Failed to delete book");
                    }
                })
                .catch((error) => {
                    console.log("Error deleting book:", error);
                });
        }
    };

    return (
        <div className="container">
            <div className="row">
                {books.map((book) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={book.id}>
                        <div className="card h-100">
                            <Link to={`/library/book/${book.id}`}>
                                <img src={book.cover} className="card-img-top" alt="Book Cover" />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">Author: {book.author}</p>
                            </div>
                            {localStorage.getItem("token") === "admin" && (
                                <div className="card-footer">
                                    <div className="d-flex justify-content-center">
                                        <Link to={`/library/book/${book.id}`} className="btn btn-primary">
                                            View
                                        </Link>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {localStorage.getItem("token") === "admin" && (
                <div className="d-flex justify-content-center mt-3">
                    <Link to={`/library/book/-1`} className="btn btn-primary">
                        Add new
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ClientHomePage;
