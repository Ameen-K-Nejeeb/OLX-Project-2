import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="background">
      <div className="section-1">
        <span className="brand-mark">o</span>
        <h2 className="banner-name">OLX Market</h2>
      </div>
      <div className="section-2">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
          <li>
            <Link to="/cart">Cart ()</Link>
          </li>
          <li>
            <Link style={{backgroundColor:"yellow",color:'black'}} to="/sell">Sell </Link>
          </li>
        </ul>
      </div>
      <div className="section-3">
        <ul className="auth-links">
          <li>
            <Link to="/login" className="login-btn" >
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="register-btn">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
