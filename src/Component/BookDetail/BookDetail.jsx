import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Book.css";

export const BookDetail = () => {
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
        fetch("http://localhost:8080/category")
            .then((response) => response.json())
            .then((data) => setCategory(data))
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
        <div className="Bookdetail">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="title-author d-flex">
                            <div className="title">
                                <label htmlFor="Text">Tiêu đề: </label> <br />
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={bookItem.title}
                                    onChange={(e) =>
                                        setBookItem({ ...bookItem, title: e.target.value })
                                    }
                                    readOnly={!editing}
                                />
                            </div>
                        </div>
                        <div className="category">
                            <label htmlFor="Text">Thể loại: </label> <br />
                            <select
                                name="category"
                                id="category"
                                value={bookItem.category}
                                onChange={(e) =>
                                    setBookItem({ ...bookItem, category: e.target.value })
                                }
                                disabled={!editing}
                            >
                                {category.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="quantity">
                            <label htmlFor="Text">Số lượng: </label> <br />
                            <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                disabled={false}
                            />
                        </div>
                        {false && (
                            <button className="add-to-cart" onClick={handleAddToCart}>
                                Thêm vào giỏ hàng
                            </button>
                        )}
                        <div className="rating">
                            <label htmlFor="Text">Đánh giá: </label> <br />
                            <select
                                name="rating"
                                id="rating"
                                value={rating}
                                onChange={handleRatingChange}
                                disabled={false}
                            >
                                <option value={0}>Chọn đánh giá</option>
                                <option value={1}>1 sao</option>
                                <option value={2}>2 sao</option>
                                <option value={3}>3 sao</option>
                                <option value={4}>4 sao</option>
                                <option value={5}>5 sao</option>
                            </select>
                        </div>
                        <div className="comment">
                            <label htmlFor="Text">Nhận xét: </label> <br />
                            <textarea
                                name="comment"
                                id="comment"
                                value={comment}
                                onChange={handleCommentChange}
                                readOnly={!editing}
                            ></textarea>
                        </div>
                        <button className="add-review" onClick={handleAddReview} disabled={!editing}>
                            Thêm nhận xét
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
