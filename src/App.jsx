import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';
import ConnectPlatforms from './components/ConnectPlatforms';
import Dashboard from './components/Dashboard';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/connect-platforms" element={<ConnectPlatforms />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App; 