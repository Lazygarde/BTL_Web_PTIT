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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientHomePage;
