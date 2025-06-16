import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';
import { FiMail, FiLock, FiLogIn, FiAlertCircle } from 'react-icons/fi';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <HiOutlineBuildingOffice2 size={40} className="login-logo-icon" />
          </div>
          <h1>URBNCTRL</h1>
          <h2>Panel Administracyjny</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              <FiAlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">
              <FiMail size={16} className="form-icon" />
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@urbnctrl.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">
              <FiLock size={16} className="form-icon" />
              Hasło
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Wprowadź hasło"
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logowanie...' : (
              <>
                <FiLogIn size={18} />
                <span>Zaloguj się</span>
              </>
            )}
          </button>
        </form>
        
        <div className="login-info">
          <p>Domyślne dane logowania:</p>
          <p><strong>Email:</strong> admin@urbnctrl.com</p>
          <p><strong>Hasło:</strong> admin123</p>
        </div>
      </div>
    </div>  );
};

export default Login;
