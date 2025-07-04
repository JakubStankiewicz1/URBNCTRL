import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { OrderProvider } from "./contexts/OrderContext";
import Login from "./components/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import OrdersPage from "./pages/OrdersPage";
import { useState } from "react";
import "./App.css";

function AppContent() {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState("products");
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
        return <ProductsPage onAddProduct={() => setAddingProduct(true)} />;
    }
  };
  return (
    <ProductProvider>
      <OrderProvider>
        <div className="app">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
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
