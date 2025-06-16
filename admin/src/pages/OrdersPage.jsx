import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiDownload, FiEye, FiTrash2, FiPackage, FiCheck, FiX, FiClock, FiTruck } from 'react-icons/fi';
import { useOrders } from '../contexts/OrderContext';
import './OrdersPage.css';

const OrdersPage = () => {
  const {
    orders,
    loading,
    error,
    stats,
    fetchOrders,
    fetchOrderStats,
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder,
    formatPrice,
    formatDate,
    setError
  } = useOrders();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchOrderStats && fetchOrderStats();
  }, []);

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return <FiClock className="status-icon pending" />;
      case 'CONFIRMED':
        return <FiCheck className="status-icon confirmed" />;
      case 'SHIPPED':
        return <FiTruck className="status-icon shipped" />;
      case 'DELIVERED':
        return <FiPackage className="status-icon delivered" />;
      case 'CANCELLED':
        return <FiX className="status-icon cancelled" />;
      default:
        return <FiClock className="status-icon pending" />;
    }
  };

  const getStatusClass = (status) => {
    return `status-badge ${status?.toLowerCase() || 'pending'}`;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${order.firstName} ${order.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || order.orderStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="orders-page">
        <div className="page-loading">
          <div className="spinner"></div>
          <p>Ładowanie zamówień...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>Zamówienia</h1>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={fetchOrders}>
            <FiDownload size={16} />
            Odśwież
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <FiX size={16} />
          {error}
        </div>
      )}

      {/* Statystyki */}
      <div className="stats-grid">
        <div className="stat-card">
          <FiPackage className="stat-icon" />
          <div className="stat-content">
            <h3>{stats.totalOrders || orders.length}</h3>
            <p>Wszystkie zamówienia</p>
          </div>
        </div>
        <div className="stat-card">
          <FiClock className="stat-icon pending" />
          <div className="stat-content">
            <h3>{stats.pendingOrders || orders.filter(o => o.orderStatus === 'PENDING').length}</h3>
            <p>Oczekujące</p>
          </div>
        </div>
        <div className="stat-card">
          <FiCheck className="stat-icon confirmed" />
          <div className="stat-content">
            <h3>{stats.completedOrders || orders.filter(o => o.orderStatus === 'DELIVERED').length}</h3>
            <p>Zrealizowane</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-currency">PLN</span>
          <div className="stat-content">
            <h3>{formatPrice(stats.totalRevenue || orders.reduce((sum, o) => sum + (o.total || 0), 0))}</h3>
            <p>Łączne przychody</p>
          </div>
        </div>
      </div>

      {/* Filtry i wyszukiwanie */}
      <div className="filters-section">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Szukaj po numerze zamówienia, emailu lub nazwisku..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <FiFilter className="filter-icon" />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="ALL">Wszystkie statusy</option>
            <option value="PENDING">Oczekujące</option>
            <option value="CONFIRMED">Potwierdzone</option>
            <option value="SHIPPED">Wysłane</option>
            <option value="DELIVERED">Dostarczone</option>
            <option value="CANCELLED">Anulowane</option>
          </select>
        </div>
      </div>

      {/* Lista zamówień */}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Numer zamówienia</th>
              <th>Klient</th>
              <th>Data</th>
              <th>Wartość</th>
              <th>Status zamówienia</th>
              <th>Status płatności</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-orders">
                  {searchTerm || statusFilter !== 'ALL' ? 'Brak zamówień spełniających kryteria' : 'Brak zamówień'}
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id} className="order-row">
                  <td>
                    <span className="order-number">{order.orderNumber}</span>
                  </td>
                  <td>
                    <div className="customer-info">
                      <span className="customer-name">{`${order.firstName} ${order.lastName}`}</span>
                      <span className="customer-email">{order.customerEmail}</span>
                    </div>
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <span className="order-total">{formatPrice(order.total)}</span>
                  </td>
                  <td>
                    <span className={getStatusClass(order.orderStatus)}>
                      {getStatusIcon(order.orderStatus)}
                      {order.orderStatus || 'PENDING'}
                    </span>
                  </td>
                  <td>
                    <span className={`payment-status ${order.paymentStatus?.toLowerCase() || 'pending'}`}>
                      {order.paymentStatus || 'PENDING'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon" 
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderDetails(true);
                        }}
                        title="Zobacz szczegóły"
                      >
                        <FiEye size={16} />
                      </button>
                      <button 
                        className="btn-icon danger" 
                        onClick={() => deleteOrder(order.id)}
                        title="Usuń zamówienie"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal szczegółów zamówienia */}
      {showOrderDetails && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowOrderDetails(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Szczegóły zamówienia {selectedOrder.orderNumber}</h2>
              <button 
                className="modal-close"
                onClick={() => setShowOrderDetails(false)}
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="order-details-grid">
                {/* Informacje o kliencie */}
                <div className="detail-section">
                  <h3>Informacje o kliencie</h3>
                  <div className="detail-item">
                    <span>Imię i nazwisko:</span>
                    <span>{`${selectedOrder.firstName} ${selectedOrder.lastName}`}</span>
                  </div>
                  <div className="detail-item">
                    <span>Email:</span>
                    <span>{selectedOrder.customerEmail}</span>
                  </div>
                  {selectedOrder.phone && (
                    <div className="detail-item">
                      <span>Telefon:</span>
                      <span>{selectedOrder.phone}</span>
                    </div>
                  )}
                </div>

                {/* Adres dostawy */}
                <div className="detail-section">
                  <h3>Adres dostawy</h3>
                  <div className="detail-item">
                    <span>Adres:</span>
                    <span>{selectedOrder.shippingAddress}</span>
                  </div>
                  {selectedOrder.apartment && (
                    <div className="detail-item">
                      <span>Mieszkanie:</span>
                      <span>{selectedOrder.apartment}</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <span>Miasto:</span>
                    <span>{selectedOrder.city}</span>
                  </div>
                  <div className="detail-item">
                    <span>Kod pocztowy:</span>
                    <span>{selectedOrder.postcode}</span>
                  </div>
                  <div className="detail-item">
                    <span>Kraj:</span>
                    <span>{selectedOrder.country}</span>
                  </div>
                </div>

                {/* Szczegóły zamówienia */}
                <div className="detail-section">
                  <h3>Szczegóły zamówienia</h3>
                  <div className="detail-item">
                    <span>Data zamówienia:</span>
                    <span>{formatDate(selectedOrder.createdAt)}</span>
                  </div>
                  <div className="detail-item">
                    <span>Metoda płatności:</span>
                    <span>{selectedOrder.paymentMethod}</span>
                  </div>
                  {selectedOrder.orderNote && (
                    <div className="detail-item">
                      <span>Notatka:</span>
                      <span>{selectedOrder.orderNote}</span>
                    </div>
                  )}
                </div>

                {/* Zarządzanie statusami */}
                <div className="detail-section">
                  <h3>Zarządzanie statusami</h3>
                  <div className="status-controls">
                    <div className="status-control">
                      <label>Status zamówienia:</label>
                      <select 
                        value={selectedOrder.orderStatus || 'PENDING'}
                        onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="PENDING">Oczekujące</option>
                        <option value="CONFIRMED">Potwierdzone</option>
                        <option value="SHIPPED">Wysłane</option>
                        <option value="DELIVERED">Dostarczone</option>
                        <option value="CANCELLED">Anulowane</option>
                      </select>
                    </div>
                    <div className="status-control">
                      <label>Status płatności:</label>
                      <select 
                        value={selectedOrder.paymentStatus || 'PENDING'}
                        onChange={(e) => updatePaymentStatus(selectedOrder.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="PENDING">Oczekująca</option>
                        <option value="PAID">Opłacone</option>
                        <option value="FAILED">Nieudana</option>
                        <option value="REFUNDED">Zwrócona</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Produkty w zamówieniu */}
              <div className="order-items-section">
                <h3>Produkty w zamówieniu</h3>
                <div className="order-items">
                  {selectedOrder.orderItems?.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-image">
                        {item.productImage ? (
                          <img src={item.productImage} alt={item.productName} />
                        ) : (
                          <div className="no-image">
                            <FiPackage size={24} />
                          </div>
                        )}
                      </div>
                      <div className="item-details">
                        <h4>{item.productName}</h4>
                        <p>SKU: {item.productSku}</p>
                        {item.selectedSize && <p>Rozmiar: {item.selectedSize}</p>}
                        {item.selectedColor && <p>Kolor: {item.selectedColor}</p>}
                      </div>
                      <div className="item-pricing">
                        <span className="item-price">{formatPrice(item.price)}</span>
                        <span className="item-quantity">x {item.quantity}</span>
                        <span className="item-subtotal">{formatPrice(item.subtotal)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Wartość produktów:</span>
                    <span>{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Koszt dostawy:</span>
                    <span>{formatPrice(selectedOrder.shippingCost)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Razem:</span>
                    <span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
