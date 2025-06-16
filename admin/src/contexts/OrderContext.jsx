import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0
  });

  const API_BASE_URL = 'http://localhost:8081/api';
  // Pobieranie wszystkich zamówień
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status} - ${response.statusText}`);
      }
      
      // Sprawdź czy odpowiedź to poprawny JSON
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('JSON Parse Error:', jsonError);
        console.error('Response text:', responseText);
        throw new Error('Odpowiedź serwera nie jest poprawnym JSON');
      }
      
      setOrders(data);
      
      // Aktualizuj statystyki na podstawie pobranych danych
      updateStatsFromOrders(data);
      
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Pobieranie statystyk zamówień
  const fetchOrderStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/stats`);
      if (response.ok) {
        const responseText = await response.text();
        console.log('Stats raw response:', responseText);
        
        try {
          const data = JSON.parse(responseText);
          setStats(data);
        } catch (jsonError) {
          console.error('Stats JSON Parse Error:', jsonError);
          console.error('Stats response text:', responseText);
          // Fallback - oblicz statystyki z lokalnych danych
          updateStatsFromOrders(orders);
        }
      }
    } catch (err) {
      console.error('Error fetching order stats:', err);
      // Fallback - oblicz statystyki z lokalnych danych
      updateStatsFromOrders(orders);
    }
  };

  // Aktualizowanie statystyk na podstawie lokalnych danych
  const updateStatsFromOrders = (ordersList) => {
    const totalOrders = ordersList.length;
    const pendingOrders = ordersList.filter(order => order.orderStatus === 'PENDING').length;
    const completedOrders = ordersList.filter(order => order.orderStatus === 'DELIVERED').length;
    const totalRevenue = ordersList.reduce((sum, order) => sum + (order.total || 0), 0);

    setStats({
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue
    });
  };
  // Pobieranie zamówienia po ID
  const fetchOrderById = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`);
      if (!response.ok) {
        throw new Error(`Zamówienie nie zostało znalezione (HTTP ${response.status})`);
      }
      
      const responseText = await response.text();
      try {
        return JSON.parse(responseText);
      } catch (jsonError) {
        console.error('JSON Parse Error in fetchOrderById:', jsonError);
        console.error('Response text:', responseText);
        throw new Error('Odpowiedź serwera nie jest poprawnym JSON');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
  // Pobieranie zamówień po emailu klienta
  const fetchOrdersByEmail = async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/customer/${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error(`Błąd podczas pobierania zamówień klienta (HTTP ${response.status})`);
      }
      
      const responseText = await response.text();
      try {
        return JSON.parse(responseText);
      } catch (jsonError) {
        console.error('JSON Parse Error in fetchOrdersByEmail:', jsonError);
        console.error('Response text:', responseText);
        throw new Error('Odpowiedź serwera nie jest poprawnym JSON');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
  // Pobieranie zamówień po statusie
  const fetchOrdersByStatus = async (status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/status/${status}`);
      if (!response.ok) {
        throw new Error(`Błąd podczas pobierania zamówień po statusie (HTTP ${response.status})`);
      }
      
      const responseText = await response.text();
      try {
        return JSON.parse(responseText);
      } catch (jsonError) {
        console.error('JSON Parse Error in fetchOrdersByStatus:', jsonError);
        console.error('Response text:', responseText);
        throw new Error('Odpowiedź serwera nie jest poprawnym JSON');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
  // Aktualizowanie statusu zamówienia
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStatus)
      });

      if (!response.ok) {
        throw new Error(`Błąd podczas aktualizacji statusu zamówienia (HTTP ${response.status})`);
      }

      const responseText = await response.text();
      let updatedOrder;
      try {
        updatedOrder = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('JSON Parse Error in updateOrderStatus:', jsonError);
        console.error('Response text:', responseText);
        // Jeśli nie można sparsować odpowiedzi, wykonaj aktualizację lokalną
        updatedOrder = null;
      }
      
      // Aktualizuj lokalny stan
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, orderStatus: newStatus, updatedAt: new Date().toISOString() }
            : order
        )
      );

      // Odśwież statystyki
      await fetchOrderStats();

      return updatedOrder;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  // Aktualizowanie statusu płatności
  const updatePaymentStatus = async (orderId, newPaymentStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/payment-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPaymentStatus)
      });

      if (!response.ok) {
        throw new Error(`Błąd podczas aktualizacji statusu płatności (HTTP ${response.status})`);
      }

      const responseText = await response.text();
      let updatedOrder;
      try {
        updatedOrder = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('JSON Parse Error in updatePaymentStatus:', jsonError);
        console.error('Response text:', responseText);
        // Jeśli nie można sparsować odpowiedzi, wykonaj aktualizację lokalną
        updatedOrder = null;
      }
      
      // Aktualizuj lokalny stan
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, paymentStatus: newPaymentStatus, updatedAt: new Date().toISOString() }
            : order
        )
      );

      return updatedOrder;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Usuwanie zamówienia
  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Błąd podczas usuwania zamówienia');
      }

      // Usuń z lokalnego stanu
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      
      // Odśwież statystyki
      await fetchOrderStats();

      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Tworzenie nowego zamówienia (opcjonalne - głównie dla testów)
  const createOrder = async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Błąd podczas tworzenia zamówienia');
      }

      const newOrder = await response.json();
      
      // Dodaj do lokalnego stanu
      setOrders(prevOrders => [newOrder, ...prevOrders]);
      
      // Odśwież statystyki
      await fetchOrderStats();

      return newOrder;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Formatowanie ceny
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format(price || 0);
  };

  // Formatowanie daty
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Pobieranie ikon statusu
  const getStatusInfo = (status) => {
    const statusMap = {
      'PENDING': { label: 'Oczekujące', color: '#d97706', bgColor: '#fef3c7' },
      'CONFIRMED': { label: 'Potwierdzone', color: '#059669', bgColor: '#d1fae5' },
      'SHIPPED': { label: 'Wysłane', color: '#1e40af', bgColor: '#dbeafe' },
      'DELIVERED': { label: 'Dostarczone', color: '#166534', bgColor: '#dcfce7' },
      'CANCELLED': { label: 'Anulowane', color: '#991b1b', bgColor: '#fee2e2' }
    };

    return statusMap[status?.toUpperCase()] || statusMap['PENDING'];
  };

  // Pobieranie informacji o statusie płatności
  const getPaymentStatusInfo = (paymentStatus) => {
    const statusMap = {
      'PENDING': { label: 'Oczekująca', color: '#d97706', bgColor: '#fef3c7' },
      'PAID': { label: 'Opłacone', color: '#059669', bgColor: '#d1fae5' },
      'FAILED': { label: 'Nieudana', color: '#991b1b', bgColor: '#fee2e2' },
      'REFUNDED': { label: 'Zwrócona', color: '#374151', bgColor: '#f3f4f6' }
    };

    return statusMap[paymentStatus?.toUpperCase()] || statusMap['PENDING'];
  };

  // Inicjalne pobranie danych
  useEffect(() => {
    fetchOrders();
  }, []);

  const value = {
    // Stan
    orders,
    loading,
    error,
    stats,
    
    // Funkcje
    fetchOrders,
    fetchOrderStats,
    fetchOrderById,
    fetchOrdersByEmail,
    fetchOrdersByStatus,
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder,
    createOrder,
    
    // Utility functions
    formatPrice,
    formatDate,
    getStatusInfo,
    getPaymentStatusInfo,
    
    // Settery dla kontroli stanu
    setError,
    setLoading
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
