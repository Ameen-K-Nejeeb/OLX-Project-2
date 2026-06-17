import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../slices/authSlice";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { clearCart } from "../slices/cartSlice";

const Navbar = () => {

    const {user, isAuthenticated, loading} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cartCount = useSelector((state) => state.cart.items )
    console.log(cartCount)

    if (loading) {
    return <nav style={{ padding: '15px', background: '#f4f4f4' }}>Checking session...</nav>;
  }

    const handleLogout = async () => {
        dispatch(clearCart());

        try{
            await signOut(auth);
            navigate('/login')
        }catch(err) {
            console.error('Logout Error : ',err.message)
        }
    }


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
          {isAuthenticated ? (<li>
            <Link to="/wishlist">Wishlist</Link>
          </li>) : (<li>
            <Link to="/login">Wishlist</Link>
          </li>)}
          
          {isAuthenticated ? (<li>
            <Link to="/cart">Cart ({cartCount.length})</Link>
          </li>) : (<li>
            <Link to="/login">Cart ()</Link>
          </li>)}
          
          <li>
            <Link style={{backgroundColor:"yellow",color:'black'}} to="/sell">Sell </Link>
          </li>
        </ul>
      </div>
      <div className="section-3">
        {isAuthenticated ? (<ul className="auth-links">

          <li>
            <p>{user.email}</p>
          </li>
          <li>
            <button onClick={handleLogout} className="register-btn">LogOut</button>
          </li>

        </ul>) : (<ul className="auth-links">

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

        </ul>)}
      </div>
    </div>
  );
};

export default Navbar;
