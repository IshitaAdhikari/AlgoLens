import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';
import ConnectPlatforms from './components/ConnectPlatforms';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || 
                     location.pathname === '/signup' || 
                     location.pathname === '/connect-platforms';

  return (
    <div className="App">
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/connect-platforms" element={<ConnectPlatforms />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App; 