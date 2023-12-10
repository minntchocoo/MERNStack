import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarR from '../components/Navbar-R';
import '../static/register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        // Handle successful registration, e.g., redirect to login page
        console.log('Registration successful');
      } else {
        // Handle registration error, e.g., display an error message
        console.error('Registration failed');
      }
    } catch (error) {
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
            <div className="appFormInputContainer">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="appFormInput"
                id="first_name"
                name="first_name"
                onChange={handleChange}
              />
            </div>
            <div className="appFormInputContainer">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="appFormInput"
                id="last_name"
                name="last_name"
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
