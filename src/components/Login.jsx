import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({setIsLoggedIn}) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      console.log("Login response:", response.data);
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        console.log("Navigating to root url!");
        setTimeout(()=>{
          navigate("/");
        },1000)
        return;
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="checkbox-container">
              <div className="checkbox-group">
                <input type="checkbox" className="checkbox" />
                <span className="checkbox-label">Remember me</span>
              </div>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button className="login-button">Sign In</button>
          </form>
          <p className="signup-text">
            Don't have an account?
            <Link to="/register" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
