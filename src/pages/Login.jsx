import React from 'react'

const Login = () => {
  return (
    <div className="login-container">
  <div className="login-card">
    <h2>Welcome back</h2>

    <p className="subtitle">
      Log in to sell products, manage your cart, and keep your session active.
    </p>

    <form>
      <label>Email</label>
      <input
        type="email"
        placeholder="you@example.com"
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Minimum 6 characters"
      />

      <button type="submit">
        Login
      </button>

      <p className="footer-text">
        New here?
        <span> Create an account</span>
      </p>
    </form>
  </div>
</div>
  )
}

export default Login