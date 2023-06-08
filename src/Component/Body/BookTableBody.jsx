import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookTableBody = () => {
    const [book, setBook] = useState([]);
    const [remain, setRemain] = useState([]);

    useEffect(() => {
        console.log("Book");
        fetch("http://localhost:8080/book")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBook(data);
            })
            .catch((err) => console.log(err));
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
                        // Ví dụ:
                        const newBook = book.filter((item) => item.id !== id);
                        setBook(newBook);
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

    useEffect(() => {
        setRemain(book);
    }, [book]);

    return (
        <div>
            <div className="container">
                <br></br>
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center">Title</th>
                            <th className="text-center">Author</th>
                            <th className="text-center">Category</th>
                            <th className="text-center">Release</th>
                            <th className="text-center">Page Number</th>
                            <th className="text-center">Sold Quantity</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {book.map((bookItem) => (
                            <tr key={bookItem.id}>
                                <td>{bookItem.title}</td>
                                <td>{bookItem.author}</td>
                                <td className="text-center">{bookItem.category}</td>
                                <td className="text-center">{bookItem.releaseDate}</td>
                                <td className="text-center">{bookItem.pageNumber}</td>
                                <td className="text-center">{bookItem.soldNum}</td>
                                <td>
                                    {localStorage.getItem("token") === "admin" && (
                                        <>
                                            <div className="d-flex justify-content-center">
                                                <Link to={`/admin/book/${bookItem.id}`} className="btn btn-primary">
                                                    View
                                                </Link>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDelete(bookItem.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {localStorage.getItem("token") === "admin" && (
                    <div className="d-flex justify-content-center">
                        <Link to={`/admin/book/-1`} className="btn btn-primary">
                            Add new
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookTableBody;