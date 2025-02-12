import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Navbar.css';

function Navbar() {
  const { user } = useUser();

  return (
    <nav className="main-nav">
      <Link to="/" className="nav-logo">
        AlgoLens
      </Link>
      
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/login" className="login-button">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar; 