import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Dashboard.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const { user } = useUser();
  const [progressData, setProgressData] = useState({
    labels: [],
    datasets: []
  });

  const [rankings, setRankings] = useState({
    globalRank: 1250,
    percentile: 85,
    totalUsers: 10000,
    recentProgress: '+15'
  });

  useEffect(() => {
    // Generate last 4 months of data
    const months = ['Jan', 'Feb', 'Mar', 'Apr'];
    const ratings = [1200, 1300, 1450, 1550]; // Sample rating progression
    
    setProgressData({
      labels: months,
      datasets: [
        {
          label: 'Your Progress',
          data: ratings,
          borderColor: 'rgb(255, 75, 43)',
          backgroundColor: 'rgba(255, 75, 43, 0.5)',
          tension: 0.3
        },
        {
          label: 'Average User',
          data: [1100, 1150, 1200, 1250],
          borderColor: 'rgba(75, 192, 192, 0.8)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3,
          borderDash: [5, 5]
        }
      ]
    });
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Your Progress</h2>
      
      <div className="dashboard-content">
        <div className="progress-chart">
          <Line data={progressData} options={chartOptions} height={300} />
        </div>

        <div className="stats-cards">
          <div className="stat-card">
            <h3>Problems Solved</h3>
            <div className="stat-value">{user?.stats?.problemsSolved || 150}</div>
          </div>

          <div className="stat-card">
            <h3>Current Rating</h3>
            <div className="stat-value">{user?.stats?.currentRating || 1550}</div>
          </div>
        </div>

        {/* New Comparison Section */}
        <div className="comparison-section">
          <h3>Your Performance</h3>
          <div className="comparison-grid">
            <div className="comparison-card">
              <div className="comparison-icon">🏆</div>
              <div className="comparison-details">
                <h4>Global Rank</h4>
                <div className="rank-value">#{rankings.globalRank}</div>
                <div className="rank-change positive">
                  {rankings.recentProgress} positions this month
                </div>
              </div>
            </div>

            <div className="comparison-card">
              <div className="comparison-icon">📊</div>
              <div className="comparison-details">
                <h4>Percentile</h4>
                <div className="rank-value">Top {rankings.percentile}%</div>
                <div className="total-users">
                  among {rankings.totalUsers.toLocaleString()} users
                </div>
              </div>
            </div>

            <div className="comparison-card">
              <div className="comparison-icon">⚡</div>
              <div className="comparison-details">
                <h4>Problem Solving Rate</h4>
                <div className="rank-value">
                  +{Math.round(user?.stats?.problemsSolved / 30 || 5)} per day
                </div>
                <div className="comparison-text">
                  2x faster than average
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 