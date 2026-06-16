import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const {isAuthenticated, loading} = useSelector((state) => state.auth)

  // Redirect if already authenticated
  useEffect(() => {
    if(!loading && isAuthenticated){
        navigate('/', {replace : true})
    }
  }, [isAuthenticated, loading, navigate])


  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try{
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/', {replace : true})
    }catch (err){
        setError('invalid email credentials or incorrect password. ')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome back</h2>

        { error && <p className="subtitle" style={{color:'red', fontSize:'14px'}}>{error}</p>}

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" 
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            />

          <label>Password</label>
          <input type="password" 
            placeholder="Minimum 6 characters" 
            onChange={(e) => setPassword(e.target.value)}
            />

          <button type="submit">Login</button>

          <p className="footer-text">
            New here?
            <Link to='/register'><span> Create an account</span></Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
