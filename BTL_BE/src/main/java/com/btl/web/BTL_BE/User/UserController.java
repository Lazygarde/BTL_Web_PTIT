package com.btl.web.BTL_BE.User;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class UserController {

    private UserDAO userDAO = new UserDAO();

    @GetMapping("api/login")
    public String login(@RequestParam("username") String username, @RequestParam("password") String password) {
        // Thực hiện xử lý đăng nhập và trả về kết quả
        if (userDAO.isValidUser(username, password)) {
            // Xử lý đăng nhập thành công
            String token;
            if (userDAO.getRole(username) == 1) {
                token = "admin";
            } else {
                token = "client";
            }
            return token;
        } else {
            // Xử lý đăng nhập thất bại
            return "";
        }
    }

    @GetMapping("api/user/id")
    public int getUserId(@RequestParam("username") String username, @RequestParam("password") String password) {
        return userDAO.getId(username, password);
    }

    @GetMapping("api/register")
    public boolean register(@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("email") String email) {
        if (userDAO.isUserExists(username)) {
            return false;
        } else {
            userDAO.addUser(username, password, email);

            return true;
        }
    }
    // Các phương thức khác để xử lý các yêu cầu khác liên quan đến người dùng

}
