import { useState } from "react";
import "./sidebar.css";
import {
  FiHome,
  FiShoppingBag,
  FiPackage,
  FiUsers,
  FiPieChart,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      icon: <FiHome size={20} />,
      label: "Dashboard",
      count: null,
    },
    {
      id: "products",
      icon: <FiShoppingBag size={20} />,
      label: "Produkty",
      count: null,
    },
    {
      id: "orders",
      icon: <FiPackage size={20} />,
      label: "Zamówienia",
      count: null,
    },
    {
      id: "customers",
      icon: <FiUsers size={20} />,
      label: "Klienci",
      count: null,
      disabled: true,
    },
    {
      id: "analytics",
      icon: <FiPieChart size={20} />,
      label: "Analityki",
      count: null,
      disabled: true,
    },
    {
      id: "settings",
      icon: <FiSettings size={20} />,
      label: "Ustawienia",
      count: null,
      disabled: true,
    },
  ];
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          {/* <span className="logo-icon"><HiOutlineBuildingOffice2 size={24} /></span> */}
          {!collapsed && <span className="logo-text">URBNCTRL</span>}
        </div>{" "}
        <button
          className="collapse-button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={
            collapsed ? "Expand sidebar (Alt+M)" : "Collapse sidebar (Alt+M)"
          }
          title={`${collapsed ? "Rozwiń" : "Zwiń"} sidebar (Alt+M)`}
        >
          {collapsed ? (
            <FiChevronRight size={18} />
          ) : (
            <FiChevronLeft size={18} />
          )}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeSection === item.id ? "active" : ""} ${item.disabled ? "disabled" : ""}`}
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
