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
                    {localStorage.getItem("token") !== null && (
                        <div className="col-1">
                            <Link to="/order" className="icon-link">
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/004/999/463/original/shopping-cart-icon-illustration-free-vector.jpg"
                                    alt="Cart"
                                    style={{ width: '50px', height: '50px' }}
                                    className="header-icon"
                                />
                            </Link>
                        </div>
                    )}
                    
                    {localStorage.getItem("token") === "admin" && (
                        <>
                            <div className="col-1">
                                <Link to="/admin/book/-1" className="icon-link">
                                    <img
                                        src="data:image/png;base64,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"
                                        alt="Cart"
                                        style={{ width: '50px', height: '50px' }}
                                        className="header-icon"
                                    />
                                </Link>
                            </div>
                        </>
                    )}
                   
                    <div className="col-6 text-center">
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
