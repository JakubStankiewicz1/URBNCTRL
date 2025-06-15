import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import './App.css'

function AppContent() {
  const { user, loading } = useAuth();

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

  return (
    <ProductProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Dashboard />
        </main>
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
