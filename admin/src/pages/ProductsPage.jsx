import { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductForm from '../components/ProductForm';
import './ProductsPage.css';

const ProductsPage = () => {
  const { products, loading, error, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (product) => {
    if (window.confirm(`Czy na pewno chcesz usunąć produkt "${product.name}"?`)) {
      await deleteProduct(product.id);
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'featured') return matchesSearch && product.featured;
    if (filter === 'limited') return matchesSearch && product.limitedEdition;
    if (filter === 'in-stock') return matchesSearch && product.availability === 'In Stock';
    if (filter === 'out-of-stock') return matchesSearch && product.availability === 'Out of Stock';
    
    return matchesSearch && product.category === filter;
  });

  const stats = {
    total: products.length,
    featured: products.filter(p => p.featured).length,
    limited: products.filter(p => p.limitedEdition).length,
    inStock: products.filter(p => p.availability === 'In Stock').length,
    outOfStock: products.filter(p => p.availability === 'Out of Stock').length
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Ładowanie produktów...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Zarządzanie Produktami</h1>
          <p>Zarządzaj swoim katalogiem produktów URBNCTRL</p>
        </div>
        <button onClick={handleAddNew} className="add-product-button">
          <span className="button-icon">+</span>
          Dodaj Produkt
        </button>
      </div>

      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Wszystkie produkty</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <div className="stat-number">{stats.featured}</div>
            <div className="stat-label">Polecane</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💎</div>
          <div className="stat-info">
            <div className="stat-number">{stats.limited}</div>
            <div className="stat-label">Limitowane</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-number">{stats.inStock}</div>
            <div className="stat-label">W magazynie</div>
          </div>
        </div>
      </div>

      <div className="products-controls">
        <div className="search-filters">
          <div className="search-input">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Szukaj produktów..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Wszystkie produkty</option>
            <option value="featured">Polecane</option>
            <option value="limited">Limitowane</option>
            <option value="in-stock">W magazynie</option>
            <option value="out-of-stock">Wyprzedane</option>
            <option value="Apparel">Odzież</option>
            <option value="Hoodies">Bluzy</option>
            <option value="T-Shirts">Koszulki</option>
          </select>
        </div>
        
        <div className="view-controls">
          <button 
            className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <span className="view-icon">⊞</span>
            Siatka
          </button>
          <button 
            className={`view-button ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            <span className="view-icon">☰</span>
            Lista
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>Brak produktów</h3>
          <p>
            {searchTerm || filter !== 'all' 
              ? 'Nie znaleziono produktów spełniających kryteria wyszukiwania.' 
              : 'Nie masz jeszcze żadnych produktów. Dodaj pierwszy produkt do swojego katalogu!'
            }
          </p>
          {!searchTerm && filter === 'all' && (
            <button onClick={handleAddNew} className="add-first-product">
              Dodaj pierwszy produkt
            </button>
          )}
        </div>
      ) : (
        <div className={`products-content ${viewMode}`}>
          {viewMode === 'grid' ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    {product.primaryImage ? (
                      <img src={product.primaryImage} alt={product.name} />
                    ) : (
                      <div className="image-placeholder">
                        <span>📷</span>
                      </div>
                    )}
                    <div className="product-badges">
                      {product.featured && <span className="badge featured">⭐ Polecane</span>}
                      {product.limitedEdition && <span className="badge limited">💎 Limited</span>}
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-brand">{product.brand}</p>
                    <p className="product-category">{product.category}</p>
                    
                    <div className="product-details">
                      <div className="product-price">
                        {product.price} {product.currency}
                      </div>
                      <div className={`product-status ${product.availability?.toLowerCase().replace(/\s+/g, '-')}`}>
                        {product.availability}
                      </div>
                    </div>
                    
                    <div className="product-actions">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="action-button edit"
                      >
                        ✏️ Edytuj
                      </button>
                      <button 
                        onClick={() => handleDelete(product)}
                        className="action-button delete"
                      >
                        🗑️ Usuń
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="products-table-wrapper">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Produkt</th>
                    <th>Marka</th>
                    <th>Kategoria</th>
                    <th>Cena</th>
                    <th>Status</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className="table-product">
                          <div className="table-product-image">
                            {product.primaryImage ? (
                              <img src={product.primaryImage} alt={product.name} />
                            ) : (
                              <div className="image-placeholder">📷</div>
                            )}
                          </div>
                          <div className="table-product-info">
                            <h4>{product.name}</h4>
                            <span className="sku">SKU: {product.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td>{product.brand}</td>
                      <td>
                        <span className="category-tag">{product.category}</span>
                      </td>
                      <td className="price-cell">
                        {product.price} {product.currency}
                      </td>
                      <td>
                        <span className={`status-badge ${product.availability?.toLowerCase().replace(/\s+/g, '-')}`}>
                          {product.availability}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button 
                            onClick={() => handleEdit(product)}
                            className="table-action edit"
                            title="Edytuj"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDelete(product)}
                            className="table-action delete"
                            title="Usuń"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleFormClose}
          onSuccess={() => {
            // Refresh będzie automatyczne przez context
          }}
        />
      )}
    </div>
  );
};

export default ProductsPage;