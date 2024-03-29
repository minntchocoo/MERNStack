import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarR from '../components/Navbar-R';
import '../static/register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'role') {
      // If the changed field is 'role'
      setFormData({
        ...formData,
        role: e.target.value // Update the role value
      });
    } else {
      // For other fields, update as usual
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Handle successful registration, e.g., navigate to '/login'
        setRegistrationMessage('Registration successful! Please login your Account');
        console.log('Registration successful! Please login your Account');
  
        // Set the success message in sessionStorage with the correct key
        sessionStorage.setItem('registrationSuccessMessage', 'Registration successful! Please login your Account');
  
        navigate('/login'); // Use navigate to go to '/login'
      } else {
        // Handle registration error, e.g., display an error message
        setRegistrationMessage('Registration failed');
        console.error('Registration failed');
      }
    } catch (error) {
      setRegistrationMessage('Error during registration');
      console.error('Error during registration:', error);
    }
  };
  
  return (
    <div>
      <NavbarR />
      <div className="content">
        <div className="login-form">
            <h1 id='reg'> REGISTER </h1>
            <p>Please fill in the fields below: </p>
            <hr></hr>
          <form method="POST" className="appForm" onSubmit={handleSubmit}>
          {registrationMessage && <p>{registrationMessage}</p>}
          
            <div className="appFormInputContainer">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="appFormInput"
                id="username"
                name="username"
                onChange={handleChange}
              />
            </div>

            <div className="appFormInputContainer">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="appFormInput"
                id="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="appFormInputContainer">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="appFormInput"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="appFormInputContainer">
              <label htmlFor="role">Role</label>
              <select name="role" onChange={handleChange}>
                <option value="">Select Role</option>
                <option value="1">Admin</option>
                <option value="2">Shopper</option>
                <option value="3">Supplier</option>
                <option value="4">Courier</option>
              </select>
            </div>
            <button type="submit" className="appBtn">
              <i className="fa fa-plus"></i> Create Account
            </button>
          </form>
          <p>
            Already have an account? <Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
