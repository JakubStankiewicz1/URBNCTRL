import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import { useState } from 'react';
import './App.css'

function AppContent() {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('products');

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Ładowanie...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductsPage />;
      default:
        return <ProductsPage />;
    }
  };

  return (
    <ProductProvider>
      <div className="app">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="app-content">
          <Header />
          <main className="main-content">
            {renderContent()}
          </main>
        </div>
      </div>
    </ProductProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App
