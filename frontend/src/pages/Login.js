import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import NavbarR from '../components/Navbar-R';
import '../static/login.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');

  useEffect(() => {
    // Get success message from sessionStorage
    const successMessage = sessionStorage.getItem('registrationSuccessMessage');
    if (successMessage) {
      setRegistrationStatus(successMessage);
      // Clear the success message from sessionStorage
      sessionStorage.removeItem('registrationSuccessMessage');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST', //send login data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const decodedToken = jwtDecode(data.token);
        console.log(decodedToken);
        if (decodedToken.role === 1) {
          setLoginStatus('Login successful');
      
          // Replace the user token in localStorage
          localStorage.setItem('userToken', data.token);
      
          // Redirect to the admin page
          navigate('/admin');
        } else if (decodedToken.role === 3) {
          setLoginStatus('Login successful');
          console.log("role", decodedToken.role);
      
          // Replace the user token in localStorage
          localStorage.setItem('userToken', data.token);
      
          // Redirect to the supplier page
          navigate('/supplier');
        } else if (decodedToken.role === 4) {
          setLoginStatus('Login successful');
      
          // Replace the user token in localStorage
          localStorage.setItem('userToken', data.token);
      
          // Redirect to the courier page
          navigate('/courier');
        } else if (decodedToken.role === 2) {
          // Handle other roles here if needed
          setLoginStatus('Login successful but not an admin, supplier, or courier');
          navigate('/home');
        }
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
          {registrationStatus && <p id='reg-status'>{registrationStatus}</p>}
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
