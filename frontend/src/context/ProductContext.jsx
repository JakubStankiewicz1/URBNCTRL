import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ProductContext = createContext();

// API Base URL
const API_BASE_URL = "http://localhost:8081/api";

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Load cart from localStorage only once, with fallback for corrupted data
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("urbnctrl-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      localStorage.removeItem("urbnctrl-cart");
      return [];
    }
  });

  useEffect(() => {
    // Pobieranie produktów z backend API
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/simple-products`);
        setProducts(response.data);
        console.log("Produkty załadowane z API:", response.data);
      } catch (error) {
        console.error("Błąd podczas ładowania produktów:", error);
        setError(
          "Nie udało się załadować produktów. Sprawdź czy backend działa.",
        );
        // Fallback do pustej tablicy
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Save cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem("urbnctrl-cart", JSON.stringify(cart));
  }, [cart]);

  const getProductById = (id) => {
    return products.find((product) => product.id === parseInt(id));
  };

  const getFeaturedProducts = (limit = 10) => {
    // Filtrujemy produkty z flagą featured=true
    const featured = products.filter((product) => product.featured === true);
    // Zwracamy limit produktów lub wszystkie jeśli jest ich mniej niż limit
    return featured.slice(0, limit);
  }; // Funkcje koszyka
  const addToCart = (product, quantity = 1) => {
    let toastId = null;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        if (!toast.isActive(toastId)) {
          toastId = toast.success(`Zwiększono ilość "${product.name}" w koszyku`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        if (!toast.isActive(toastId)) {
          toastId = toast.success(`"${product.name}" został dodany do koszyka! 🛍️`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        return [...prevCart, { ...product, quantity }];
      }
    });
  };
  const removeFromCart = (productId) => {
    const removedItem = cart.find((item) => item.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

    if (removedItem) {
      toast.info(`"${removedItem.name}" został usunięty z koszyka`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };
  const clearCart = () => {
    if (cart.length > 0) {
      toast.success("Koszyk został wyczyszczony! ✨", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    setCart([]);
    localStorage.removeItem("urbnctrl-cart");
  };
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      // Handle BigDecimal or other object types
      const itemPrice =
        typeof item.price === "object" && item.price !== null
          ? parseFloat(item.price.toString())
          : parseFloat(item.price) || 0;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  }; // Składanie zamówienia
  const placeOrder = async (orderData) => {
    try {
      setLoading(true);

      console.log("=== DEBUGGING ORDER SUBMISSION START ===");
      console.log("Cart items:", cart);
      console.log("Order data from form:", orderData);

      // Sprawdź czy koszyk nie jest pusty
      if (!cart || cart.length === 0) {
        throw new Error("Koszyk jest pusty");
      }

      // Przygotuj dane zamówienia zgodnie z backendem
      const orderPayload = {
        customerEmail: orderData.email,
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        phone: orderData.phone || "",
        shippingAddress: orderData.address,
        apartment: orderData.apartment || "",
        city: orderData.city,
        postcode: orderData.postcode,
        country: orderData.country,
        subtotal: getCartTotal(),
        shippingCost: 15.0, // Stała opłata za wysyłkę (jak w przykładzie Postman)
        total: getCartTotal() + 15.0,
        paymentMethod:
          orderData.paymentMethod === "credit"
            ? "Credit Card"
            : orderData.paymentMethod,
        orderNote: orderData.orderNote || "",
        newsletterSignup: orderData.newsletter || false,
        orderItems: cart.map((item) => {
          console.log("Processing cart item:", item);

          // Konwertuj BigDecimal na number jeśli potrzeba
          const itemPrice =
            typeof item.price === "object" && item.price !== null
              ? parseFloat(item.price.toString())
              : parseFloat(item.price) || 0;

          const itemQuantity = parseInt(item.quantity) || 1;
          const itemSubtotal = itemPrice * itemQuantity;

          return {
            productId: parseInt(item.id),
            productName: item.name || "Unnamed Product",
            productImage:
              item.images?.primary ||
              item.primaryImage ||
              item.galleryImages?.[0] ||
              "",
            productSku: item.sku || "",
            price: itemPrice,
            quantity: itemQuantity,
            selectedSize: item.selectedSize || "M",
            selectedColor: item.selectedColor || "Default",
            subtotal: itemSubtotal,
          };
        }),
      };

      console.log(
        "Final order payload:",
        JSON.stringify(orderPayload, null, 2),
      );
      console.log("=== DEBUGGING ORDER SUBMISSION END ===");

      const response = await axios.post(`${API_BASE_URL}/orders`, orderPayload);

      if (response.data) {
        // Zamówienie zostało złożone pomyślnie
        clearCart(); // Wyczyść koszyk
        return {
          success: true,
          order: response.data,
          orderNumber: response.data.orderNumber,
        };
      }
    } catch (error) {
      console.error("Błąd podczas składania zamówienia:", error);
      let errorMessage = "Błąd podczas składania zamówienia";

      if (error.response?.data) {
        // Jeśli backend zwrócił konkretny błąd
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };
  const value = {
    products,
    loading,
    error,
    getProductById,
    getFeaturedProducts,
    // Cart functions
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isInCart,
    // Order functions
    placeOrder,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
