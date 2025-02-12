import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const result = loginUser(formData);
    
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <Link to="/" className="logo">CodeCracker</Link>
      </div>
      
      <div className="login-content">
        <div className="login-form-container">
          <h2>Welcome Back!</h2>
          <p className="login-subtitle">Log in to continue your coding journey</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          
          <div className="divider">
            <span>OR</span>
          </div>
          
          <button className="google-login-button">
            <img src="/google-icon.png" alt="Google" />
            Continue with Google
          </button>
          
          <p className="signup-prompt">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; 