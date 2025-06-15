import React, {useState} from 'react';
import './Register.css';
import { useNavigate, Link} from 'react-router-dom';

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
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }).then((result) => {
        if (!result.ok) {
          setIsError(true);
          setMessage(result.error || 'Registration failed');
        } else {
          // Registration successful, navigate to the login page
          navigate('/login');
        }
      });

      console.log('Registration successful:', result);
      
    } catch (error) {
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