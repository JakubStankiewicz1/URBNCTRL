import { useState } from "react";
import { useProducts } from "../../contexts/ProductContext";
import ProductForm from "../../components/ProductForm/ProductForm.jsx";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import "./dashboard.css";

const Dashboard = () => {
  const { products, loading, error, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (product) => {
    if (
      window.confirm(`Czy na pewno chcesz usunąć produkt "${product.name}"?`)
    ) {
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

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === "all") return matchesSearch;
    if (filter === "in-stock")
      return matchesSearch && product.availability === "In Stock";
    if (filter === "out-of-stock")
      return matchesSearch && product.availability === "Out of Stock";

    return matchesSearch && product.category === filter;
  });

  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.availability === "In Stock").length,
    outOfStock: products.filter((p) => p.availability === "Out of Stock")
      .length,
    categories: [...new Set(products.map((p) => p.category))].length,
  };
  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-loading">
          <div className="dashboard-spinner"></div>
          <p>Ładowanie produktów...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {" "}
      {/* <div className="dashboard-header">
        <h1>Panel Zarządzania Produktami</h1>
        <button onClick={handleAddNew} className="dashboard-add-button">
          + Dodaj Produkt
        </button>
      </div> */}
      {error && <div className="dashboard-error-banner">{error}</div>}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-number">{stats.total}</div>
          <div className="dashboard-stat-label">Wszystkie produkty</div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-number">{stats.inStock}</div>
          <div className="dashboard-stat-label">W magazynie</div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-number">{stats.outOfStock}</div>
          <div className="dashboard-stat-label">Wyprzedane</div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-number">{stats.categories}</div>
          <div className="dashboard-stat-label">Kategorie</div>
        </div>
      </div>{" "}
      <div className="dashboard-controls">
        <div className="dashboard-search-box">
          <FiSearch className="dashboard-search-icon" />
          <input
            type="text"
            placeholder="Szukaj produktów..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="dashboard-filter-select">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Wszystkie produkty</option>
            <option value="in-stock">W magazynie</option>
            <option value="out-of-stock">Wyprzedane</option>
            <option value="Apparel">Odzież</option>
            <option value="Hoodies">Bluzy z kapturem</option>
            <option value="T-Shirts">Koszulki</option>
            <option value="Obuwie">Obuwie</option>
            <option value="Akcesoria">Akcesoria</option>
            <option value="Torby">Torby</option>
            <option value="Biżuteria">Biżuteria</option>
          </select>
        </div>
      </div>{" "}
      <div className="dashboard-products-table-container">
        {filteredProducts.length === 0 ? (
          <div className="dashboard-no-products">
            <p>
              {searchTerm || filter !== "all"
                ? "Nie znaleziono produktów spełniających kryteria."
                : "Nie ma jeszcze żadnych produktów. Dodaj pierwszy produkt!"}
            </p>
          </div>
        ) : (
          <table className="dashboard-products-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Marka</th>
                <th>Kategoria</th>
                <th>Cena</th>
                <th>SKU</th>
                <th>Materiał</th>
                <th>Rozmiary</th>
                <th>Dostępność</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="dashboard-product-name">
                      {product.name}
                      {product.collaboration && (
                        <small className="collaboration">
                          × {product.collaboration}
                        </small>
                      )}
                    </div>
                  </td>
                  <td>{product.brand || "-"}</td>
                  <td>
                    <span className="dashboard-category-badge">
                      {product.category}
                    </span>
                  </td>
                  <td className="dashboard-price">
                    {product.price?.toFixed(2)} {product.currency}
                  </td>
                  <td>
                    <code>{product.sku}</code>
                  </td>
                  <td>
                    <small>{product.material || "-"}</small>
                  </td>
                  <td>
                    <small>{product.sizes?.join(", ") || "-"}</small>
                  </td>
                  <td>
                    <span
                      className={`dashboard-status ${product.availability?.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {product.availability}
                    </span>
                  </td>{" "}
                  <td>
                    <div className="dashboard-actions">
                      <button
                        onClick={() => handleEdit(product)}
                        className="dashboard-edit-button"
                        title="Edytuj"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="dashboard-delete-button"
                        title="Usuń"
                      >
                        <FiTrash2 />
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
