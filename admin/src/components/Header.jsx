import { useAuth } from '../contexts/AuthContext';
import './Header.css';
import { FiLogOut, FiUser, FiMoon, FiSun } from 'react-icons/fi';
import { useState } from 'react';

const Header = () => {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  // This would toggle between light/dark theme, but we're keeping dark as requested
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, we would apply theme changes here
  };

  return (
    <header className="admin-header">
      <div className="header-content">
        <div className="header-left">
          <h1>URBNCTRL Admin</h1>
        </div>
        <div className="header-right">
          <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <div className="user-info">
            <span className="user-name">Witaj, {user?.name}</span>
            <span className="user-email">{user?.email}</span>
            <FiUser className="user-icon" size={18} />
          </div>
          <button onClick={logout} className="logout-button">
            <FiLogOut size={16} />
            <span>Wyloguj się</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
