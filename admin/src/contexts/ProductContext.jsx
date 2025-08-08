import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8081/api";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/simple-products`);
      setProducts(response.data);
    } catch (err) {
      setError("Błąd podczas pobierania produktów");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new product
  const addProduct = async (productData) => {
    setError(null);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/simple-products`,
        productData,
      );
      setProducts((prev) => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = "Błąd podczas dodawania produktu";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Update product
  const updateProduct = async (id, productData) => {
    setError(null);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/simple-products/${id}`,
        productData,
      );
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? response.data : product)),
      );
      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = "Błąd podczas aktualizacji produktu";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/simple-products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      return { success: true };
    } catch (err) {
      const errorMsg = "Błąd podczas usuwania produktu";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
