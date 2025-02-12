import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './SignupPage.css';

function SignupPage() {
  const navigate = useNavigate();
  const { registerUser } = useUser();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    // Register new user
    registerUser({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      stats: {
        problemsSolved: 0,
        currentRating: 0,
        highestRating: 0,
        contests: 0
      },
      platforms: {}
    });

    // Navigate to connect platforms
    navigate('/connect-platforms');
  };

  return (
    <div className="signup-page">
      <div className="signup-header">
        <Link to="/" className="logo">CodeCracker</Link>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </nav>
      </div>
      
      <div className="signup-content">
        <div className="signup-form-container">
          <h2>Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage; 