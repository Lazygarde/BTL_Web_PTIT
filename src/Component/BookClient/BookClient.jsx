import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Book.css";

export const BookClient = () => {
    const params = useParams();
    const id = params.id;
    const [bookItem, setBookItem] = useState({});
    const [category, setCategory] = useState([]);
    const [editing, setEditing] = useState(id < 0 ? true : false);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}`)
            .then((response) => response.json())
            .then((data) => setBookItem(data))
            .catch((err) => console.log(err));
        
    }, []);

    const handleAddToCart = () => {
        // Tạo một đối tượng chứa dữ liệu mua sách
        const orderData = {
            bookId: bookItem.id,
            quantity: quantity
        };

        // Gửi dữ liệu mua sách lên server
        fetch("http://localhost:8080/cart", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Xử lý dữ liệu phản hồi từ server (nếu cần)
                console.log('Order added:', data);
                // Chuyển hướng đến trang giỏ hàng
                window.location.href = "/cart";
            })
            .catch((error) => {
                // Xử lý lỗi (nếu có)
                console.error('Error:', error);
            });
    };

    const handleRatingChange = (e) => {
        setRating(parseInt(e.target.value));
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddReview = () => {
        // Tạo một đối tượng chứa dữ liệu đánh giá và nhận xét
        const reviewData = {
            bookId: bookItem.id,
            rating: rating,
            comment: comment
        };

        // Gửi dữ liệu đánh giá và nhận xét lên server
        fetch("http://localhost:8080/review", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Xử lý dữ liệu phản hồi từ server (nếu cần)
                console.log('Review added:', data);
                // Reset dữ liệu đánh giá và nhận xét
                setRating(0);
                setComment("");
            })
            .catch((error) => {
                // Xử lý lỗi (nếu có)
                console.error('Error:', error);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <img src={bookItem.image} alt={bookItem.title} className="img-fluid" />
                </div>
                <div className="col-8">
                    <h1>{bookItem.title}</h1>
                    <p>Author: {bookItem.author}</p>
                    <p>Price: {bookItem.price}</p>
                    <p>Category: {bookItem.category?.name}</p>
                    <p>Quantity: {bookItem.quantity}</p>
                    <p>Description: {bookItem.description}</p>
                    <p>
                        <button className="btn btn-primary" onClick={handleAddToCart}>Add to cart</button>
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h2>Reviews</h2>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="rating">Rating</label>
                                <select className="form-control" id="rating" value={rating} onChange={handleRatingChange}>
                                    <option value="0">Select rating</option>
                                    <option value="1">1 star</option>
                                    <option value="2">2 stars</option>
                                    <option value="3">3 stars</option>
                                    <option value="4">4 stars</option>
                                    <option value="5">5 stars</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="comment">Comment</label>
                                <textarea className="form-control" id="comment" rows="3" value={comment} onChange={handleCommentChange}></textarea>
                            </div>
                            <button className="btn btn-primary" onClick={handleAddReview}>Add review</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <ul className="list-group">
                                {bookItem.reviews?.map((review) => (
                                    <li className="list-group-item" key={review.id}>
                                        <p>Rating: {review.rating}</p>
                                        <p>Comment: {review.comment}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
