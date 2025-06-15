import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="admin-header">
      <div className="header-content">
        <div className="header-left">
          <h1>URBNCTRL Admin</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="user-name">Witaj, {user?.name}</span>
            <span className="user-email">{user?.email}</span>
          </div>
          <button onClick={logout} className="logout-button">
            Wyloguj się
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
