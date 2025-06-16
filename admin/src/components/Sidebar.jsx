import { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      icon: '📊',
      label: 'Dashboard',
      count: null
    },
    {
      id: 'products',
      icon: '👕',
      label: 'Produkty',
      count: null
    },
    {
      id: 'orders',
      icon: '📦',
      label: 'Zamówienia',
      count: 5,
      disabled: true
    },
    {
      id: 'customers',
      icon: '👥',
      label: 'Klienci',
      count: null,
      disabled: true
    },
    {
      id: 'analytics',
      icon: '📈',
      label: 'Analityki',
      count: null,
      disabled: true
    },
    {
      id: 'settings',
      icon: '⚙️',
      label: 'Ustawienia',
      count: null,
      disabled: true
    }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">🏙️</span>
          {!collapsed && <span className="logo-text">URBNCTRL</span>}
        </div>
        <button 
          className="collapse-button"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map(item => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeSection === item.id ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                onClick={() => !item.disabled && setActiveSection(item.id)}
                disabled={item.disabled}
              >
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="nav-label">{item.label}</span>
                    {item.count && (
                      <span className="nav-count">{item.count}</span>
                    )}
                    {item.disabled && (
                      <span className="coming-soon">Wkrótce</span>
                    )}
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        {!collapsed && (
          <div className="sidebar-version">
            <span>v1.0.0</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
