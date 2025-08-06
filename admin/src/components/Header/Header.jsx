import { useAuth } from "../../contexts/AuthContext";
import "./header.css";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  return (
    <header className="admin-header">
      <div className="header-content">
        <div className="header-left">
          <h1>URBNCTRL Admin</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-details">
              <span className="user-name">
                Witaj, {user?.name || "Administrator"}
              </span>
              <span className="user-email">
                {user?.email || "admin@urbnctrl.com"}
              </span>
            </div>
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
