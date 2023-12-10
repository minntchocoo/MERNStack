import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavbarR from '../components/Navbar-R';
import '../static/login.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setLoginStatus('Login successful');
        // Redirect to home.js
        navigate('/home');
      } else {
        setLoginStatus('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginStatus('An error occurred during login');
    }
  };

  return (
    <div>
      <NavbarR />
      <div className="content">
        <div className="login-form">
          <form onSubmit={handleLogin} className="appForm">
            <div className="appFormInputContainer">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="appFormInput"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="appFormInputContainer">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="appFormInput"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="appBtn">
              <i className="fa fa-plus"></i> Login
            </button>
          </form>
          <p>{loginStatus}</p>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
