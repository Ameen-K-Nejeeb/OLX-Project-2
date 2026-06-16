import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated, loading} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!loading && isAuthenticated) {
        navigate('/', {replace : true})
    }
  }, [isAuthenticated, loading, navigate])

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password === password2) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        await updateProfile(userCredential.user, {
          displayName: name,
        });
        navigate('/', {replace : true})
      } catch (err) {
        setError(err.message.replace("firebase: ", ""));
      }
    } else {
      setError("Passwords do not match !");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create your account</h2>

        {error && (
          <p style={{ color: "red", fontSize: "14px" }} className="subtitle">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister}>
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Minimum 6 characters"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm password</label>
          <input
            type="password"
            placeholder="Repeat password"
            onChange={(e) => setPassword2(e.target.value)}
          />

          <button type="submit">Register</button>

          <p className="footer-text">
            Already registered?
            <span> Login instead</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
