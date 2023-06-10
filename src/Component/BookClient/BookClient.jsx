import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const BookClient = () => {
    const params = useParams();
    const id = params.id;

    const [bookItem, setBookItem] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}`)
            .then((response) => response.json())
            .then((data) => setBookItem(data))
            .catch((err) => console.log(err));

        fetch(`http://localhost:8080/rating/idBook?idBook=${id}`)
            .then((response) => response.json())
            .then((data) => setReviews(data))
            .catch((err) => console.log(err));
    }, []);

    const handleAddToCart = () => {
        // Tạo đối tượng đại diện cho đơn hàng
        const order = {
            idUser: localStorage.getItem("userId"),
            idBook: bookItem.id,
            sum: quantity
        };

        // Thực hiện gửi yêu cầu đặt hàng đến máy chủ
        fetch("http://localhost:8080/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        })
            .then((response) => {
                if (response.ok) {
                    alert("Order placed successfully");
                    // Xử lý thành công
                    console.log("Order placed successfully");
                } else {
                    alert("Failed to place order");
                    // Xử lý lỗi
                    console.log("Failed to place order");
                }
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleAddReview = () => {
        if (rating === 0 || comment.trim() === "") {
            alert("Please select a rating and enter a comment");
            return;
        }

        const newReview = {
            idBook: id,
            idUser: localStorage.getItem("userId"),
            starCnt: rating,
            comment: comment
        };

        fetch("http://localhost:8080/rating", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReview)
        })
            .then((response) => {
                if (response.ok) {
                    alert("Review added successfully");
                    setReviews([...reviews, newReview]);
                    setRating(0);
                    setComment("");
                } else {
                    alert("Failed to add review");
                    console.log("Failed to add review");
                }
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };



    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <img src={bookItem.cover} alt={bookItem.title} className="img-fluid" />
                </div>
                <div className="col-8">
                    <h1>{bookItem.title}</h1>
                    <p>Author: {bookItem.author}</p>
                    <p>Category: {bookItem.category}</p>
                    <p>Description: {bookItem.description}</p>
                    <div className="d-flex align-items-center">
                        <label htmlFor="quantity" className="mr-2">Quantity:</label>
                        <input type="number" id="quantity" min="1" value={quantity} onChange={handleQuantityChange} style={{ maxWidth: "100px" }} />
                        <button className="btn btn-primary ml-2" onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h2>Reviews</h2>
                    <div className="row mb-3">
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
                                {reviews.map((review) => (
                                    <li className="list-group-item mb-3" key={review.id}>
                                        <div className="d-flex align-items-center">
                                            <p className="mr-3">User: {
                                                //username
                                            }</p>
                                            <p>Rating: {review.starCnt}</p>
                                        </div>
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