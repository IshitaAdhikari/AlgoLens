import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login', { replace: true });
  };

  const handleSignupClick = () => {
    navigate('/signup', { replace: true });
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <Link to="/" className="logo">AlgoLens</Link>
        <div className="nav-links">
          {user && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
            </>
          )}
        </div>
        <div className="nav-buttons">
          {!user ? (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <button 
                onClick={handleSignupClick} 
                className="signup-btn"
                type="button"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate('/profile')} 
              className="profile-btn"
              type="button"
            >
              My Profile
            </button>
          )}
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-content">
          <h1>Elevate Your <span className="highlight">Coding Journey</span></h1>
          <p className="hero-subtitle">
            Track your progress, visualize growth, and compete with peers across LeetCode, CodeForces, and CodeChef
          </p>
          <button onClick={handleGetStarted} className="get-started-btn">
            Get Started
            <span className="btn-icon">→</span>
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Active Users</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3+</span>
            <span className="stat-label">Platforms</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Progress Tracking</span>
          </div>
        </div>
      </main>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Real-time monitoring of your performance across platforms</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Visualize Growth</h3>
            <p>Interactive charts and detailed analytics</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Set Goals</h3>
            <p>Define milestones and track achievements</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AlgoLens</h3>
            <p>Track your competitive programming journey</p>
          </div>
          
          <div className="footer-section">
            <h3>Links</h3>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage; 