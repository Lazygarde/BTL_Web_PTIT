package com.btl.web.BTL_BE.Order;

import com.btl.web.BTL_BE.DAO;
import static com.btl.web.BTL_BE.DAO.con;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;

public class OrderDAO extends DAO {
    
    public static String SELECT_ALL_ORDERS = "SELECT * FROM orders";
    
    public ResponseEntity<?> selectAllOrders() {
        List<Order> orders = new ArrayList<>();
        try {
            PreparedStatement ps = con.prepareStatement(SELECT_ALL_ORDERS);
            ResultSet result = ps.executeQuery();
            while (result.next()) {
                int id = result.getInt("id");
                int idUser = result.getInt("idUser");
                int idBook = result.getInt("idBook");
                int sum = result.getInt("sum");
                orders.add(new Order(id, idUser, idBook, sum));
            }
            ps.close();
            return ResponseEntity.ok().body(orders);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    public ResponseEntity<?> selectOrder(String id) {
        Order order = null;
        try {
            String query = "SELECT * FROM orders WHERE id = ?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, id);
            ResultSet result = ps.executeQuery();
            if (result.next()) {
                int idUser = result.getInt("idUser");
                int idBook = result.getInt("idBook");
                int sum = result.getInt("sum");
                order = new Order(Integer.parseInt(id), idUser, idBook, sum);
            }
            ps.close();
            if (order != null) {
                return ResponseEntity.ok().body(order);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    public boolean deleteOrder(String id) {
        try {
            String query = "DELETE FROM orders WHERE id = ?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, id);
            int rowsAffected = ps.executeUpdate();
            ps.close();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    public Order addOrder(Order newOrder) {
        try {
            String query = "INSERT INTO orders (idUser, idBook, sum) VALUES (?, ?, ?)";
            PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, newOrder.getIdUser());
            ps.setInt(2, newOrder.getIdBook());
            ps.setInt(3, newOrder.getSum());
            
            int rowsAffected = ps.executeUpdate();
            if (rowsAffected > 0) {
                ResultSet generatedKeys = ps.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int generatedId = generatedKeys.getInt(1);
                    newOrder.setId(generatedId);
                    return newOrder;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    public boolean updateOrder(String id, Order updatedOrder) {
        try {
            String query = "UPDATE orders SET idUser = ?, idBook = ?, sum = ? WHERE id = ?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, updatedOrder.getIdUser());
            ps.setInt(2, updatedOrder.getIdBook());
            ps.setInt(3, updatedOrder.getSum());
            ps.setString(4, id);
            int rowsAffected = ps.executeUpdate();
            ps.close();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
