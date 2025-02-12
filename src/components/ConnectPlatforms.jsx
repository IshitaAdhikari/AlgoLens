import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { fetchLeetCodeStats, fetchCodeforcesStats, fetchCodechefStats } from '../services/platformServices';
import './ConnectPlatforms.css';

function ConnectPlatforms() {
  const navigate = useNavigate();
  const { user, registerUser } = useUser();
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    leetcode: false,
    codeforces: false,
    codechef: false
  });

  const [platforms, setPlatforms] = useState({
    leetcode: user?.platforms?.leetcode || '',
    codeforces: user?.platforms?.codeforces || '',
    codechef: user?.platforms?.codechef || ''
  });

  const [status, setStatus] = useState({
    leetcode: '',
    codeforces: '',
    codechef: '',
    hackerrank: '',
    atcoder: '',
    spoj: '',
    geeksforgeeks: ''
  });

  const [verifiedStats, setVerifiedStats] = useState({
    leetcode: null,
    codeforces: null,
    codechef: null
  });

  const [verifiedPlatforms, setVerifiedPlatforms] = useState({
    leetcode: false,
    codeforces: false,
    codechef: false,
    hackerrank: false,
    atcoder: false,
    spoj: false,
    geeksforgeeks: false
  });

  const platformInfo = {
    leetcode: {
      name: 'LeetCode',
      icon: '🟨',
      placeholder: 'Enter LeetCode username'
    },
    codeforces: {
      name: 'CodeForces',
      icon: '🟦',
      placeholder: 'Enter CodeForces handle'
    },
    codechef: {
      name: 'CodeChef',
      icon: '👨‍🍳',
      placeholder: 'Enter CodeChef username'
    },
    hackerrank: {
      name: 'HackerRank',
      icon: '💚',
      placeholder: 'Enter HackerRank username'
    },
    atcoder: {
      name: 'AtCoder',
      icon: '🎯',
      placeholder: 'Enter AtCoder handle'
    },
    spoj: {
      name: 'SPOJ',
      icon: '🌟',
      placeholder: 'Enter SPOJ username'
    },
    geeksforgeeks: {
      name: 'GeeksforGeeks',
      icon: '👨‍💻',
      placeholder: 'Enter GeeksforGeeks username'
    }
  };

  const fetchPlatformStats = async (platform, username) => {
    try {
      switch (platform) {
        case 'leetcode':
          const lcResponse = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
          const lcData = await lcResponse.json();
          return {
            problemsSolved: lcData.totalSolved || 0,
            rating: lcData.ranking || 0
          };

        case 'codeforces':
          const cfResponse = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
          const cfData = await cfResponse.json();
          return {
            problemsSolved: 0, // Needs additional API call to get solved problems
            rating: cfData.result[0].rating || 0,
            maxRating: cfData.result[0].maxRating || 0
          };

        // Simulated stats for platforms without public APIs
        case 'codechef':
          return {
            problemsSolved: Math.floor(Math.random() * 500) + 100,
            rating: Math.floor(Math.random() * 1000) + 1500
          };

        case 'hackerrank':
          return {
            problemsSolved: Math.floor(Math.random() * 300) + 50,
            rating: Math.floor(Math.random() * 500) + 1200
          };

        case 'atcoder':
          return {
            problemsSolved: Math.floor(Math.random() * 400) + 75,
            rating: Math.floor(Math.random() * 800) + 1000
          };

        case 'spoj':
          return {
            problemsSolved: Math.floor(Math.random() * 600) + 200,
            rating: 0 // SPOJ doesn't have a rating system
          };

        case 'geeksforgeeks':
          return {
            problemsSolved: Math.floor(Math.random() * 1000) + 300,
            rating: Math.floor(Math.random() * 2000) + 1500
          };

        default:
          return null;
      }
    } catch (error) {
      console.error(`Error fetching ${platform} stats:`, error);
      return null;
    }
  };

  const handleVerify = async (platform) => {
    if (!platforms[platform]) {
      setStatus(prev => ({ ...prev, [platform]: 'Error: Username required' }));
      return;
    }

    setStatus(prev => ({ ...prev, [platform]: 'Verifying...' }));

    try {
      const isValid = await validatePlatform(platform, platforms[platform]);
      if (isValid) {
        setStatus(prev => ({ ...prev, [platform]: 'Verified ✓' }));
        setVerifiedPlatforms(prev => ({ ...prev, [platform]: true }));
      }
    } catch (error) {
      setStatus(prev => ({ ...prev, [platform]: `Error: ${error.message}` }));
      setVerifiedPlatforms(prev => ({ ...prev, [platform]: false }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlatforms(prev => ({ ...prev, [name]: value }));
    // Clear status when user types
    setStatus(prev => ({ ...prev, [name]: '' }));
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const validatePlatform = async (platform, username) => {
    if (!username) return false;
    setStatus(prev => ({ ...prev, [platform]: 'Verifying...' }));

    try {
      let stats = null;
      
      switch (platform) {
        case 'leetcode':
          stats = await fetchLeetCodeStats(username);
          break;
        case 'codeforces':
          stats = await fetchCodeforcesStats(username);
          break;
        case 'codechef':
          stats = await fetchCodechefStats(username);
          break;
        default:
          throw new Error('Unknown platform');
      }

      if (stats) {
        setVerifiedStats(prev => ({
          ...prev,
          [platform]: stats
        }));
        setStatus(prev => ({ ...prev, [platform]: 'Verified ✓' }));
        return true;
      }
      throw new Error('Could not verify profile');

    } catch (error) {
      setStatus(prev => ({ ...prev, [platform]: `Error: ${error.message}` }));
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let totalProblems = 0;
    let currentRating = 0;
    let highestRating = 0;
    let totalContests = 0;
    const connectedPlatforms = {};

    // Calculate total stats from verified platforms
    Object.entries(selectedPlatforms).forEach(([platform, isSelected]) => {
      if (isSelected && verifiedStats[platform]) {
        connectedPlatforms[platform] = platforms[platform];
        
        switch (platform) {
          case 'leetcode':
            totalProblems += verifiedStats[platform].totalSolved || 0;
            break;
          case 'codeforces':
            totalProblems += verifiedStats[platform].problemsSolved || 0;
            currentRating = Math.max(currentRating, verifiedStats[platform].rating || 0);
            highestRating = Math.max(highestRating, verifiedStats[platform].maxRating || 0);
            totalContests++;
            break;
          case 'codechef':
            totalProblems += verifiedStats[platform].problemsSolved || 0;
            currentRating = Math.max(currentRating, verifiedStats[platform].rating || 0);
            highestRating = Math.max(highestRating, verifiedStats[platform].maxRating || 0);
            totalContests += verifiedStats[platform].contests || 0;
            break;
        }
      }
    });

    // Update user with platforms and initial stats
    registerUser({
      ...user,
      platforms: connectedPlatforms,
      stats: {
        problemsSolved: totalProblems,
        currentRating: currentRating,
        highestRating: highestRating,
        contests: totalContests
      },
      platformStats: verifiedStats // Store detailed platform stats
    });

    navigate('/profile');
  };

  const isAnyPlatformVerified = () => {
    return Object.entries(selectedPlatforms).some(([platform, isSelected]) => 
      isSelected && verifiedPlatforms[platform]
    );
  };

  return (
    <div className="connect-platforms-page">
      <div className="navigation-header">
        <Link to="/" className="home-button">
          <span className="home-icon">🏠</span>
          Home
        </Link>
        <h1 className="site-title">Connect Platforms</h1>
        <Link to="/profile" className="profile-button">
          <span className="profile-icon">👤</span>
          Profile
        </Link>
      </div>

      <div className="connect-platforms-content">
        <div className="platform-selection">
          <h3>Select Platforms to Connect</h3>
          <div className="platform-checkboxes">
            {Object.entries(platformInfo).map(([key, info]) => (
              <label key={key} className="platform-checkbox">
                <input
                  type="checkbox"
                  checked={selectedPlatforms[key]}
                  onChange={() => handlePlatformSelect(key)}
                />
                <span className="platform-name">
                  {info.icon} {info.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="platforms-form">
          {Object.entries(selectedPlatforms).map(([platform, isSelected]) => (
            isSelected && (
              <div key={platform} className="platform-input">
                <label>{platformInfo[platform].name} Username</label>
                <div className="input-group">
                  <input
                    type="text"
                    name={platform}
                    value={platforms[platform]}
                    onChange={handleChange}
                    placeholder={platformInfo[platform].placeholder}
                  />
                  <button 
                    type="button" 
                    onClick={() => handleVerify(platform)}
                    className="verify-btn"
                  >
                    Verify
                  </button>
                </div>
                {status[platform] && (
                  <span className={`status ${status[platform].includes('Error') ? 'error' : 'success'}`}>
                    {status[platform]}
                  </span>
                )}
              </div>
            )
          ))}

          <div className="platform-actions">
            <button 
              type="submit" 
              className={`submit-btn ${isAnyPlatformVerified() ? 'active' : 'disabled'}`}
              disabled={!isAnyPlatformVerified()}
            >
              Complete Setup
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/profile')} 
              className="skip-btn"
            >
              Skip for Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConnectPlatforms; 