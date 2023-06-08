package com.btl.web.BTL_BE.Book;

import com.btl.web.BTL_BE.DAO;
import static com.btl.web.BTL_BE.DAO.con;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;

public class BookDAO extends DAO {
    
    public static String SELECT_ALL_BOOKS = "Select * from book";
    
    public ResponseEntity<?> SelectAllBooks() {
        List<Book> books = new ArrayList<>();
        try {
            PreparedStatement ps = con.prepareStatement(SELECT_ALL_BOOKS);
            ResultSet result = ps.executeQuery();
            while (result.next()) {
                int id = result.getInt("id");
                String title = result.getString("title");
                String author = result.getString("author");
                String category = GetCategory(result.getInt("idCategory"));
                Date releaseDate = result.getDate("releaseDate");
                int pageNum = result.getInt("pageNum");
                int soldNum = result.getInt("soldNum");
                String des = result.getString("description");
                String cover = result.getString("cover");
                books.add(new Book(id, title, author, category, releaseDate, pageNum, soldNum, des, cover));
            }
            ps.close();
            return ResponseEntity.ok().body(books);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    private String GetCategory(int id) {
        try {
            String query = "select * from category where id = ?";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setInt(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            
            if (resultSet.next()) {
                return resultSet.getString("name");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "IT";
    }
    
    ResponseEntity<?> SelectBook(String id) {
        Book book = new Book();
        try {
            String query = "Select * from book where id = ?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, id);
            ResultSet result = ps.executeQuery();
            while (result.next()) {
                String title = result.getString("title");
                String author = result.getString("author");
                String category = GetCategory(result.getInt("idCategory"));
                Date releaseDate = result.getDate("releaseDate");
                int pageNum = result.getInt("pageNum");
                int soldNum = result.getInt("soldNum");
                String des = result.getString("description");
                String cover = result.getString("cover");
                book = new Book(Integer.parseInt(id), title, author, category, releaseDate, pageNum, soldNum, des, cover);
            }
            ps.close();
            return ResponseEntity.ok().body(book);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    public String SELECT_ALL_CATEGORY = "Select * from category";
    
    public boolean deleteBook(String id) {
        try {
            String query = "DELETE FROM book WHERE id = ?";
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
    
    public ResponseEntity<?> GetAllCategory() {
        List<Category> category = new ArrayList<>();
        try {
            PreparedStatement ps = con.prepareStatement(SELECT_ALL_CATEGORY);
            ResultSet result = ps.executeQuery();
            while (result.next()) {
                int id = result.getInt("id");
                String title = result.getString("name");
                category.add(new Category(id, title));
            }
            ps.close();
            return ResponseEntity.ok().body(category);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    public boolean updateBook(String id, Book updatedBook) {
        try {
            String query = "UPDATE book SET title = ?, author = ?, idCategory = ?, category = ?, releaseDate = ?, pageNum = ?, soldNum = ?, description = ?, cover = ? WHERE id = ?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, updatedBook.getTitle());
            ps.setString(2, updatedBook.getAuthor());
            ps.setInt(3, updatedBook.getIdCategory());
            ps.setString(4, getCategoryById(updatedBook.getIdCategory()));
            ps.setDate(5, updatedBook.getReleaseDate());
            System.out.println(updatedBook.getPageNumber());
            ps.setInt(6, updatedBook.getPageNumber());
            ps.setInt(7, updatedBook.getSoldNum());
            ps.setString(8, updatedBook.getDescription());
            ps.setString(9, updatedBook.getCover());
            ps.setString(10, id);
            int rowsAffected = ps.executeUpdate();
            ps.close();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    private String getCategoryById(int idCategory) {
        try {
            String query = "SELECT name FROM category WHERE id = ?";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setInt(1, idCategory);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getString("name");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "";
    }
    
    public Book addBook(Book newBook) {
        try {
            String query = "INSERT INTO book (title, author, idCategory, category, releaseDate, pageNum, soldNum, description, cover) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, newBook.getTitle());
            ps.setString(2, newBook.getAuthor());
            ps.setInt(3, newBook.getIdCategory());
            ps.setString(4, getCategoryById(newBook.getIdCategory()));
            ps.setDate(5, newBook.getReleaseDate());
            ps.setInt(6, newBook.getPageNumber());
            ps.setInt(7, newBook.getSoldNum());
            ps.setString(8, newBook.getDescription());
            ps.setString(9, newBook.getCover());
            
            int rowsAffected = ps.executeUpdate();
            if (rowsAffected > 0) {
                ResultSet generatedKeys = ps.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int generatedId = generatedKeys.getInt(1);
                    newBook.setId(generatedId);
                    return newBook;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
