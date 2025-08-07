import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { OrderProvider } from "./contexts/OrderContext";
import Login from "./components/Login/Login.jsx";
import Header from "./components/Header/Header.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx";
import AddProductPage from "./pages/AddProductPage/AddProductPage.jsx";
import OrdersPage from "./pages/OrdersPage/OrdersPage.jsx";
import { useState } from "react";
import "./App.css";

function AppContent() {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [addingProduct, setAddingProduct] = useState(false);

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
  const handleSectionChange = (section) => {
    if (addingProduct) {
      setAddingProduct(false);
      setTimeout(() => setActiveSection(section), 300); // allow AddProductPage to close first
    } else {
      setActiveSection(section);
    }
  };

  const renderContent = () => {
    if (addingProduct) {
      return <AddProductPage onBack={() => setAddingProduct(false)} />;
    }
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductsPage onAddProduct={() => setAddingProduct(true)} />;
      case "orders":
        return <OrdersPage />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <ProductProvider>
      <OrderProvider>
        <div className="app">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={handleSectionChange}
          />
          <div className="app-content">
            <Header />
            <main className="main-content">{renderContent()}</main>
          </div>
        </div>
      </OrderProvider>
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

export default App;
