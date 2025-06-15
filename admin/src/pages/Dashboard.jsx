import { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductForm from '../components/ProductForm';
import './Dashboard.css';

const Dashboard = () => {
  const { products, loading, error, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
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
    if (filter === 'low-stock') return matchesSearch && product.stock < 10;
    
    return matchesSearch && product.category === filter;
  });

  const stats = {
    total: products.length,
    featured: products.filter(p => p.featured).length,
    lowStock: products.filter(p => p.stock < 10).length,
    categories: [...new Set(products.map(p => p.category))].length
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Ładowanie produktów...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Panel Zarządzania Produktami</h1>
        <button onClick={handleAddNew} className="add-button">
          + Dodaj Produkt
        </button>
      </div>

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Wszystkie produkty</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.featured}</div>
          <div className="stat-label">Wyróżnione</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.lowStock}</div>
          <div className="stat-label">Niski stan</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.categories}</div>
          <div className="stat-label">Kategorie</div>
        </div>
      </div>

      <div className="dashboard-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Szukaj produktów..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-select">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Wszystkie produkty</option>
            <option value="featured">Wyróżnione</option>
            <option value="low-stock">Niski stan magazynowy</option>
            <option value="Odzież">Odzież</option>
            <option value="Obuwie">Obuwie</option>
            <option value="Akcesoria">Akcesoria</option>
            <option value="Torby">Torby</option>
            <option value="Biżuteria">Biżuteria</option>
          </select>
        </div>
      </div>

      <div className="products-table-container">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>
              {searchTerm || filter !== 'all' 
                ? 'Nie znaleziono produktów spełniających kryteria.' 
                : 'Nie ma jeszcze żadnych produktów. Dodaj pierwszy produkt!'
              }
            </p>
          </div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Zdjęcie</th>
                <th>Nazwa</th>
                <th>Marka</th>
                <th>Kategoria</th>
                <th>Cena</th>
                <th>Stan magazynowy</th>
                <th>Status</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="product-image">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} />
                      ) : (
                        <div className="image-placeholder">Brak zdjęcia</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="product-name">
                      {product.name}
                      {product.featured && <span className="featured-badge">★</span>}
                    </div>
                  </td>
                  <td>{product.brand || '-'}</td>
                  <td>
                    <span className="category-badge">{product.category}</span>
                  </td>
                  <td className="price">{product.price?.toFixed(2)} PLN</td>
                  <td>
                    <span className={`stock ${product.stock < 10 ? 'low-stock' : ''}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <span className={`status ${product.stock > 0 ? 'available' : 'out-of-stock'}`}>
                      {product.stock > 0 ? 'Dostępny' : 'Wyprzedany'}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="edit-button"
                        title="Edytuj"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(product)}
                        className="delete-button"
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
        )}
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleFormClose}
          onSuccess={() => {
            // Refresh will happen automatically through context
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
