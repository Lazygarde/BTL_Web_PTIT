import React, { useState, useEffect } from "react";

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh sách các đơn hàng của người dùng
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            // Gọi API để lấy danh sách các đơn hàng của người dùng dựa trên ID người dùng
            const userId = localStorage.getItem("userId");
            const response = await fetch(`http://localhost:8080/orders?userId=${userId}`);
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Order List</h2>
            {orders.map((order) => (
                <div key={order.id}>
                    <p>Order ID: {order.id}</p>
                    <p>Order Date: {order.date}</p>
                    <p>Total Amount: {order.totalAmount}</p>
                    {/* Hiển thị các thông tin khác về đơn hàng */}
                </div>
            ))}
        </div>
    );
};

export default OrderList;
