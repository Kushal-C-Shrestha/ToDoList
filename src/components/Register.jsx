import React, {useState} from 'react';
import './Register.css';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit=async (e) => {
    e.preventDefault();

    try {
      console.log('Form data:', formData);
      const response = await axios.post('http://localhost:5000/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200 || (response.data && response.data.error)) {
        setIsError(true);
        setMessage(response.data.error || 'Registration failed');
      } else {
        // Registration successful, navigate to the login page
        setIsError(false);
        setMessage('');
        navigate('/login');
      }

      console.log('Registration successful:', response.data);

    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.error || 'Error during registration');
      console.error('Error during registration:', error);
    }
  }

  return (
    <>
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your full name"
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Create a password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Confirm your password"
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <div className="checkbox-container">
              <input type="checkbox" className="checkbox" />
              <span className="checkbox-label">
                I agree to the <a href="#" className="terms-link">Terms & Conditions</a>
              </span>
            </div>
            
            <button className="register-button" type="submit">Create Account</button>
          </form>
          <p className="signin-text">
            Already have an account?
            <Link to="/login" className="signin-link">Sign in</Link>
          </p>
        </div>

        {isError && (
          <div className="error-message">
            {message}
          </div>
        )}
      </div>
    </>
  );
};

export default Register;