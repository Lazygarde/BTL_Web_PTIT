package com.btl.web.BTL_BE.User;

import com.btl.web.BTL_BE.DAO;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;

public class UserDAO extends DAO {

    public void addUser(String username, String password, String email) {
        try {
            String query = "INSERT INTO user (username, password, email, role) VALUES (?, ?, ?, ?)";
            PreparedStatement preparedStatement = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);
            preparedStatement.setString(3, email);
            preparedStatement.setInt(4, 0); // Đặt vai trò mặc định là 0
            preparedStatement.executeUpdate();

            ResultSet generatedKeys = preparedStatement.getGeneratedKeys();
            if (generatedKeys.next()) {
                int generatedId = generatedKeys.getInt(1);
                System.out.println("User added successfully with ID: " + generatedId);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public ResponseEntity<?> getUser(String userName, String password) {
        List<User> users = new ArrayList<>();
        try {
            String querry = "select * from user where username = ? and password = ?";
            PreparedStatement preparedStatement = con.prepareStatement(querry);
            preparedStatement.setString(1, userName);
            preparedStatement.setString(2, password);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String username = resultSet.getString("username");
                String pass = resultSet.getString("password");
                String email = resultSet.getString("email");
                int role = resultSet.getInt("role");
                User user = new User(id, username, pass, role, email);
                users.add(user);
            }
            preparedStatement.close();
            return ResponseEntity.ok().body(users);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        } 

    }

    public boolean isUserExists(String username) {
        String query = "SELECT COUNT(*) AS count FROM User WHERE username = ?";
        try {
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, username);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                int count = resultSet.getInt("count");
                return count > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean isValidUser(String username, String password) {
        String query = "SELECT COUNT(*) AS count FROM User WHERE username = ? AND password = ?";

        try {
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                int count = resultSet.getInt("count");
                return count > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public int getId(String username, String password) {
        String query = "SELECT id FROM User WHERE username = ? AND password = ?";

        try {
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                return resultSet.getInt("id");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }

    public int getRole(String username) {
        try {
            String query = "select * from user where username = ?";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, username);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                return resultSet.getInt("role");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    public String getName(String id) {
        try{
            String query = "select * from user where id = ?";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                return resultSet.getString("userName");
            }

        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
