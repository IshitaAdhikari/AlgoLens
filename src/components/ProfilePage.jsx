import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
  const { user } = useUser();
  const [stats, setStats] = useState({
    problemsSolved: 20,
    currentRating: 0,
    highestRating: 0,
    contests: 0
  });

  // Add this useEffect to log the user data for debugging
  useEffect(() => {
    console.log('Current user:', user);
  }, [user]);

  // Get the display name or default to 'User'
  const displayName = user?.displayName || user?.name || 'Ishita Adhikari';
  const userInitial = displayName ? displayName[0].toUpperCase() : 'A';

  return (
    <div className="profile-container">
      <div className="profile-header">
        <Link to="/" className="home-button">
          <span className="home-icon">🏠</span> Home
        </Link>
        <h1>AlgoLens</h1>
        <Link to="/connect-platforms" className="connect-button">
          <span className="connect-icon">🔗</span> Connect Platforms
        </Link>
      </div>

      <div className="profile-content">
        <div className="profile-avatar">
          {userInitial}
        </div>
        <h2 className="profile-name">{displayName}</h2>
        <p className="member-since">Member since February 2025</p>

        <div className="statistics-section">
          <h3>Overall Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Problems Solved</h4>
              <div className="stat-value">{stats.problemsSolved}</div>
            </div>
            <div className="stat-card">
              <h4>Current Rating</h4>
              <div className="stat-value">{stats.currentRating}</div>
            </div>
            <div className="stat-card">
              <h4>Highest Rating</h4>
              <div className="stat-value">{stats.highestRating}</div>
            </div>
            <div className="stat-card">
              <h4>Contests</h4>
              <div className="stat-value">{stats.contests}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage; 