import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./login.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (!result.success) {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {" "}
        {/* Left Side - Hero Section */}
        <div className="login-left">
          <div className="hero-content">
            {/* <div className="logo-section">
              <div className="logo-circle">
                <span className="logo-text">U.</span>
              </div>
            </div> */}

            {/* <div className="hero-text">
              <h1 className="hero-title">Be a Part of</h1>
              <h1 className="hero-title-highlight">Something Beautiful</h1>
            </div> */}
          </div>
        </div>
        {/* Right Side - Login Form */}
        <div className="login-right">
          <div className="login-form-container">
            <div className="login-header">
              <h2>Login</h2>
              <p>Enter your credentials to access your account</p>
            </div>

            {error && (
              <div className="error-message">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@urbnctrl.com"
                  required
                />
              </div>

              <div className="form-group" style={{ position: "relative" }}>
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="password-input"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* <div className="login-footer">
              <p>
                Not a member?{" "}
                <span className="create-account">Create an account</span>
              </p>
            </div> */}

            <div className="default-credentials">
              <p>
                <strong>Default login credentials:</strong>
              </p>
              <p>Email: admin@urbnctrl.com</p>
              <p>Password: admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
