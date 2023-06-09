import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigation = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigation("/library/login");
    };
    return (
        <header className="header">
            <div className="container">
                <div className="row align-items-center">
                    {/* <div className="col-1">
                        <img
                            src="https://thumbs.dreamstime.com/b/beautiful-meticulously-designed-library-icon-perfect-use-designing-developing-websites-printed-materials-presentations-112019830.jpg"
                            alt="Logo"
                            className="logo"
                            style={{ width: '50px', height: '50px' }}
                        />
                    </div> */}

                    <div className="col-1">
                        <Link to="/library" className="icon-link">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/000/425/085/original/house-icon-vector-illustration.jpg"
                                alt="Home"
                                style={{ width: '50px', height: '50px' }}
                                className="header-icon"
                            />
                        </Link>
                    </div>
                    <div className="col-2">
                        <Link to="/order" className="icon-link">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/004/999/463/original/shopping-cart-icon-illustration-free-vector.jpg"
                                alt="Cart"
                                style={{ width: '50px', height: '50px' }}
                                className="header-icon"
                            />
                        </Link>
                    </div>
                    <div className="col-4 text-center">
                        <h1 className="header-title">BTL Web</h1>
                    </div>
                    {
                        isLoggedIn ? (
                            <div className="col-3 text-right">
                                <h4>{localStorage.getItem("token")}</h4>
                                <button className="btn btn-danger " onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <div className="col-3 text-right">
                                <Link to="/library/login" className="btn btn-success">Login</Link>
                                <Link to="/library/register" className="btn btn-primary">Register</Link>
                            </div>
                        )
                    }


                </div>
            </div>
        </header >
    );
};

export default Header;
