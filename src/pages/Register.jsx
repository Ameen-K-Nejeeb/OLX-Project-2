import React, { useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()


    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')

        if(password !== password2){
            setError('Passwords do not match !')
        }

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            await updateProfile(userCredential.user, {
                displayName : name,
            });
        navigate('/')
        } catch(err) {
            setError(err.message.replace('firebase: ', ''))
        }

    }


  return (
    <div className="register-container">
  <div className="register-card">
    <h2>Create your account</h2>

    {error && <p style={{ color: "red", fontSize: "14px"}} className="subtitle">{error}</p>}

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

      <button type="submit">
        Register
      </button>

      <p className="footer-text">
        Already registered?
        <span> Login instead</span>
      </p>
    </form>
  </div>
</div>
  )
}

export default Register