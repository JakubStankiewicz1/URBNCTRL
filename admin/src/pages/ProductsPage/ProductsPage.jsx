import { useState } from "react";
import { useProducts } from "../../contexts/ProductContext";
import ProductForm from "../../components/ProductForm/ProductForm.jsx";
import "./productsPage.css";
import {
  FiBox,
  FiStar,
  FiAward,
  FiCheck,
  FiPlusCircle,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiGrid,
  FiList,
  FiChevronDown,
} from "react-icons/fi";

const ProductsPage = ({ onAddProduct }) => {
  const { products, loading, error, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'
  const [filter, setFilter] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
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
    if (onAddProduct) {
      onAddProduct();
    } else {
      setEditingProduct(null);
      setShowForm(true);
    }
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
    if (filter === "featured") return matchesSearch && product.featured;
    if (filter === "limited") return matchesSearch && product.limitedEdition;
    if (filter === "in-stock")
      return matchesSearch && product.availability === "In Stock";
    if (filter === "out-of-stock")
      return matchesSearch && product.availability === "Out of Stock";

    return matchesSearch && product.category === filter;
  });

  const stats = {
    total: products.length,
    featured: products.filter((p) => p.featured).length,
    limited: products.filter((p) => p.limitedEdition).length,
    inStock: products.filter((p) => p.availability === "In Stock").length,
    outOfStock: products.filter((p) => p.availability === "Out of Stock")
      .length,
  };
  if (loading) {
    return (
      <div className="productspage">
        <div className="productspage-loading">
          <div className="productspage-spinner"></div>
          <p>Ładowanie produktów...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="productspage">
      <div className="productspage-header">
        {/* <div className="productspage-header-content">
          <h1>Zarządzanie Produktami</h1>
          <p>Zarządzaj swoim katalogiem produktów URBNCTRL</p>
        </div>{" "} */}
        <button onClick={handleAddNew} className="productspage-add-button">
          <FiPlusCircle size={20} />
          <span>Dodaj Produkt</span>
        </button>
      </div>{" "}
      {error && (
        <div className="productspage-error-banner">
          <span className="productspage-error-icon">⚠️</span>
          {error}
        </div>
      )}
      <div className="productspage-stats-overview">
        <div className="productspage-stat-card">
          <div className="productspage-stat-icon">
            <FiBox size={24} />
          </div>
          <div className="productspage-stat-info">
            <div className="productspage-stat-number">{stats.total}</div>
            <div className="productspage-stat-label">Wszystkie produkty</div>
          </div>
        </div>
        <div className="productspage-stat-card">
          <div className="productspage-stat-icon">
            <FiStar size={24} />
          </div>
          <div className="productspage-stat-info">
            <div className="productspage-stat-number">{stats.featured}</div>
            <div className="productspage-stat-label">Polecane</div>
          </div>
        </div>{" "}
        <div className="productspage-stat-card">
          <div className="productspage-stat-icon">
            <FiAward size={24} />
          </div>
          <div className="productspage-stat-info">
            <div className="productspage-stat-number">{stats.limited}</div>
            <div className="productspage-stat-label">Limitowane</div>
          </div>
        </div>
        <div className="productspage-stat-card">
          <div className="productspage-stat-icon">
            <FiCheck size={24} />
          </div>
          <div className="productspage-stat-info">
            <div className="productspage-stat-number">{stats.inStock}</div>
            <div className="productspage-stat-label">W magazynie</div>
          </div>
        </div>
      </div>{" "}


      <div className="productspage-controls">
        <div className="productspage-search-filters">
          {" "}
          <div className="productspage-search-input">
            <FiSearch className="productspage-search-icon" />
            <input
              type="text"
              placeholder="Szukaj produktów..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>


          <div style={{ position: "relative", display: "inline-block", minWidth: 200 }}>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="productspage-filter-select custom-select"
              onFocus={() => setFilterOpen(true)}
              onBlur={() => setFilterOpen(false)}
              style={{ appearance: "none", WebkitAppearance: "none", MozAppearance: "none", paddingRight: "32px" }}
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
            <FiChevronDown
              className="custom-select-arrow"
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: `translateY(-50%) rotate(${filterOpen ? 180 : 0}deg)`,
                transition: "transform 0.3s cubic-bezier(0.25,0.8,0.25,1)",
                pointerEvents: "none",
                fontSize: "22px",
                color: "#aaa"
              }}
            />
          </div>


        </div>{" "}



        
        <div className="productspage-view-controls">
          <button
            className={`productspage-view-button ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <FiGrid className="productspage-view-icon" />
            Siatka
          </button>
          <button
            className={`productspage-view-button ${viewMode === "table" ? "active" : ""}`}
            onClick={() => setViewMode("table")}
          >
            <FiList className="productspage-view-icon" />
            Lista
          </button>
        </div>
      </div>{" "}


      {filteredProducts.length === 0 ? (
        <div className="productspage-empty-state">
          <FiBox className="productspage-empty-icon" />
          <h3>Brak produktów</h3>
          <p>
            {searchTerm || filter !== "all"
              ? "Nie znaleziono produktów spełniających kryteria wyszukiwania."
              : "Nie masz jeszcze żadnych produktów. Dodaj pierwszy produkt do swojego katalogu!"}
          </p>
          {!searchTerm && filter === "all" && (
            <button
              onClick={handleAddNew}
              className="productspage-add-first-product"
            >
              Dodaj pierwszy produkt
            </button>
          )}
        </div>
      ) : (
        <div className={`productspage-content ${viewMode}`}>
          {viewMode === "grid" ? (
            <div className="productspage-grid">
              {" "}
              {filteredProducts.map((product) => (
                <div key={product.id} className="productspage-product-card">
                  <div className="productspage-product-image">
                    {product.primaryImage ? (
                      <img src={product.primaryImage} alt={product.name} />
                    ) : (
                      <div className="productspage-image-placeholder">
                        <span>📷</span>
                      </div>
                    )}
                    <div className="productspage-product-badges">
                      {product.featured && (
                        <span className="productspage-badge featured">
                          ⭐ Polecane
                        </span>
                      )}
                      {product.limitedEdition && (
                        <span className="productspage-badge limited">
                          💎 Limited
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="productspage-product-info">
                    <h3 className="productspage-product-name">
                      {product.name}
                    </h3>
                    <p className="productspage-product-brand">
                      {product.brand}
                    </p>
                    <p className="productspage-product-category">
                      {product.category}
                    </p>

                    <div className="productspage-product-details">
                      <div className="productspage-product-price">
                        {product.price} {product.currency}
                      </div>
                      <div
                        className={`productspage-product-status ${product.availability?.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {product.availability}
                      </div>
                    </div>

                    <div className="productspage-product-actions">
                      <button
                        onClick={() => handleEdit(product)}
                        className="productspage-action-button edit"
                      >
                        <FiEdit /> Edytuj
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="productspage-action-button delete"
                      >
                        <FiTrash2 /> Usuń
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="productspage-table-wrapper">
              <table className="productspage-table">
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
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="productspage-table-product">
                          <div className="productspage-table-product-image">
                            {product.primaryImage ? (
                              <img
                                src={product.primaryImage}
                                alt={product.name}
                              />
                            ) : (
                              <div className="productspage-image-placeholder">
                                📷
                              </div>
                            )}
                          </div>
                          <div className="productspage-table-product-info">
                            <h4>{product.name}</h4>
                            <span className="productspage-sku">
                              SKU: {product.sku}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{product.brand}</td>
                      <td>
                        <span className="productspage-category-tag">
                          {product.category}
                        </span>
                      </td>
                      <td className="productspage-price-cell">
                        {product.price} {product.currency}
                      </td>
                      <td>
                        <span
                          className={`productspage-status-badge ${product.availability?.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {product.availability}
                        </span>
                      </td>
                      <td>
                        <div className="productspage-table-actions">
                          <button
                            onClick={() => handleEdit(product)}
                            className="productspage-table-action edit"
                            title="Edytuj"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="productspage-table-action delete"
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
