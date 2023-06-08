import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Gửi yêu cầu đăng nhập thông qua API
    fetch(`http://localhost:8080/api/login?username=${username}&password=${password}`)
      .then((response) => response.text())
      .then((token) => {
        if (token === "admin") {
          // Xử lý đăng nhập thành công cho vai trò admin
          alert('Đăng nhập thành công');
          localStorage.setItem('token', token);
          navigate('/library')
          // Chuyển hướng đến trang chính hoặc trang khác
        } else if (token === "client") {
          alert('Đăng nhập thành công');
          localStorage.setItem('token', token);
          navigate('/library')
          // Chuyển hướng đến trang chính hoặc trang khác
        } else {
          // Xử lý đăng nhập thất bại
          alert('Wrong Username or password');
          // Hiển thị thông báo lỗi đăng nhập
        }
      })
      .catch((error) => {
        // Xử lý lỗi
        alert(error);
      });
    fetch(`http://localhost:8080/api/user/id?username=${username}&password=${password}`)
      .then((response) => response.text())
      .then((id) => {
        localStorage.setItem('userId', id);
      });
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
