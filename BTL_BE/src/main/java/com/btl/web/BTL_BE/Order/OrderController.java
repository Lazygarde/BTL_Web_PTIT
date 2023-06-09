package com.btl.web.BTL_BE.Order;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class OrderController {

    private OrderDAO dao = new OrderDAO();

    @GetMapping("orders")
    public ResponseEntity<?> getAllOrders() {
        return dao.selectAllOrders();
    }
    
    @GetMapping("orders/id")
    public ResponseEntity<?> getOrderbyUserId(@RequestParam("userId") int userId) {
        return dao.getOrderByUserId(userId);
    }

    @GetMapping("orders/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable String id) {
        return dao.selectOrder(id);
    }

    @DeleteMapping("orders/{id}")
    public ResponseEntity<?> deleteOrderById(@PathVariable String id) {
        boolean deleted = dao.deleteOrder(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        }
    }

    @PutMapping("orders/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable String id, @RequestBody Order updatedOrder) {
        boolean updated = dao.updateOrder(id, updatedOrder);
        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        }
    }

    @PostMapping("orders")
    public ResponseEntity<?> addOrder(@RequestBody Order newOrder) {
        Order addedOrder = dao.addOrder(newOrder);
        if (addedOrder != null) {
            return ResponseEntity.ok(addedOrder);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add order");
        }
    }

}
