import { useState } from "react";
import { useProducts } from "../../contexts/ProductContext";
import { FiEdit, FiSettings, FiGrid, FiCamera, FiCheckCircle } from "react-icons/fi";
import "./productForm.css";

const ProductForm = ({ product, onClose, onSuccess, isPageView = false }) => {
  const { addProduct, updateProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Basic fields
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    currency: product?.currency || "$",
    category: product?.category || "",
    brand: product?.brand || "",
    availability: product?.availability || "In Stock",
    sku: product?.sku || "",
    // Extended fields
    collaboration: product?.collaboration || "",
    features: product?.features || [],
    featuresText: product?.features?.join(", ") || "",
    sizes: product?.sizes || [],
    sizeStock: product?.sizeStock || {},
    colors: product?.colors || [],
    colorsText: product?.colors?.join(", ") || "",
    material: product?.material || "",
    lining: product?.lining || "",
    weight: product?.weight || "Medium Weight",
    fit: product?.fit || "Regular",
    deliveryTime: product?.deliveryTime || "2-4 dni",
    careInstructions: product?.careInstructions || [],
    careInstructionsText: product?.careInstructions?.join(", ") || "",
    shippingInfo: product?.shippingInfo || "",
    tags: product?.tags || [],
    releaseDate: product?.releaseDate || "",
    limitedEdition: product?.limitedEdition || false,
    featured: product?.featured || false,

    // Product details (flattened)
    sport: product?.sport || "",
    belt: product?.belt || "",
    neckline: product?.neckline || "",
    collar: product?.collar || "",
    pockets: product?.pockets || "",
    sleeves: product?.sleeves || "",
    pattern: product?.pattern || "",
    details: product?.details || "",
    function: product?.function || "",
    productNumber: product?.productNumber || "",

    // Size and fit (flattened)
    modelHeight: product?.modelHeight || "",
    fitType: product?.fitType || "Regular fit",
    shape: product?.shape || "",
    length: product?.length || "",
    sleeveLength: product?.sleeveLength || "",
    // Images (flattened)
    primaryImage: product?.primaryImage || "",
    secondaryImage: product?.secondaryImage || "",
    galleryImages: product?.galleryImages || [],
    galleryImagesText: product?.galleryImages?.join(", ") || "",
  });

  const steps = [
    { id: 1, title: "Podstawowe informacje", icon: <FiEdit /> },
    { id: 2, title: "Szczegóły produktu", icon: <FiSettings /> },
    { id: 3, title: "Rozmiary i kolory", icon: <FiGrid /> },
    { id: 4, title: "Zdjęcia i media", icon: <FiCamera /> },
    { id: 5, title: "Podsumowanie", icon: <FiCheckCircle /> },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleArrayChange = (fieldName, value) => {
    // Zachowuj surową wartość tekstową podczas pisania
    setFormData((prev) => ({
      ...prev,
      [`${fieldName}Text`]: value, // Przechowuj surowy tekst
      [fieldName]: value
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v), // Parsuj do array
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateSKU = () => {
    const timestamp = Date.now().toString().slice(-6);
    const categoryPrefix = formData.category
      ? formData.category.substring(0, 3).toUpperCase()
      : "PRD";
    return `${categoryPrefix}-${timestamp}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.sku ||
      !formData.brand
    ) {
      setError("Nazwa, cena, kategoria, SKU i marka są wymagane");
      setLoading(false);
      return;
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      currency: formData.currency,
      category: formData.category,
      brand: formData.brand,
      availability: formData.availability,
      sku: formData.sku,
      collaboration: formData.collaboration,
      features: formData.features,
      sizes: formData.sizes,
      sizeStock: formData.sizeStock,
      colors: formData.colors,
      material: formData.material,
      lining: formData.lining,
      weight: formData.weight,
      fit: formData.fit,
      deliveryTime: formData.deliveryTime,
      careInstructions: formData.careInstructions,
      shippingInfo: formData.shippingInfo,
      tags: formData.tags,
      releaseDate: formData.releaseDate ? formData.releaseDate : null,
      limitedEdition: formData.limitedEdition,
      featured: formData.featured,
      sport: formData.sport,
      belt: formData.belt,
      neckline: formData.neckline,
      collar: formData.collar,
      pockets: formData.pockets,
      sleeves: formData.sleeves,
      pattern: formData.pattern,
      details: formData.details,
      function: formData.function,
      productNumber: formData.productNumber,
      modelHeight: formData.modelHeight,
      fitType: formData.fitType,
      shape: formData.shape,
      length: formData.length,
      sleeveLength: formData.sleeveLength,
      primaryImage: formData.primaryImage,
      secondaryImage: formData.secondaryImage,
      galleryImages: formData.galleryImages,
    };

    let result;
    if (product) {
      result = await updateProduct(product.id, productData);
    } else {
      result = await addProduct(productData);
    }

    setLoading(false);

    if (result.success) {
      onSuccess?.();
      onClose();
    } else {
      setError(result.error || "Wystąpił błąd podczas zapisywania produktu");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Nazwa produktu *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="np. Tokyo Nights Sweatshirt"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="brand">Marka *</label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                >
                  <option value="">Wybierz markę</option>
                  <option value="T-LD">T-LD</option>
                  <option value="URBNCTRL">URBNCTRL</option>
                  <option value="Inne">Inne</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Opis produktu</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Opisz produkt..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Kategoria *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Wybierz kategorię</option>
                  <option value="Apparel">Odzież</option>
                  <option value="Hoodies">Bluzy z kapturem</option>
                  <option value="T-Shirts">Koszulki</option>
                  <option value="Accessories">Akcesoria</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="price">Cena *</label>
                <div className="price-input">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    required
                  />
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    <option value="$">USD</option>
                    <option value="€">EUR</option>
                    <option value="PLN">PLN</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="sku">SKU (kod produktu) *</label>
                <div className="sku-input">
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="TLD-XXX-001"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, sku: generateSKU() }))
                    }
                    className="generate-button"
                  >
                    Generuj
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="availability">Dostępność</label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                >
                  <option value="In Stock">W magazynie</option>
                  <option value="Limited Stock">Ograniczona ilość</option>
                  <option value="Out of Stock">Wyprzedany</option>
                  <option value="Pre-order">Przedsprzedaż</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="collaboration">Współpraca</label>
                <input
                  type="text"
                  id="collaboration"
                  name="collaboration"
                  value={formData.collaboration}
                  onChange={handleChange}
                  placeholder="np. Hana Burton"
                />
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  Produkt polecany
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="limitedEdition"
                    checked={formData.limitedEdition}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  Edycja limitowana
                </label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="material">Materiał</label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="np. 70% Bawełna, 30% Poliester"
                />
              </div>

              <div className="form-group">
                <label htmlFor="weight">Waga</label>
                <select
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                >
                  <option value="Light Weight">Lekka</option>
                  <option value="Medium Weight">Średnia</option>
                  <option value="Heavy Weight">Ciężka</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label htmlFor="features">Cechy produktu</label>
                <input
                  type="text"
                  id="features"
                  value={formData.featuresText}
                  onChange={(e) =>
                    handleArrayChange("features", e.target.value)
                  }
                  placeholder="np. Comfortable Fit, Soft Interior, Tokyo Graphics"
                />
                <small>Oddzielone przecinkami</small>
              </div>

              <div className="form-group full-width">
                {" "}
                <label htmlFor="careInstructions">Instrukcje pielęgnacji</label>
                <textarea
                  id="careInstructions"
                  value={formData.careInstructionsText}
                  onChange={(e) =>
                    handleArrayChange("careInstructions", e.target.value)
                  }
                  rows="3"
                  placeholder="Pranie w pralce w 30°C, Nie wybielać..."
                />
                <small>Oddzielone przecinkami</small>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <div className="form-grid">
              {" "}
              <div className="form-group full-width">
                <label htmlFor="sizes">Dostępne rozmiary i ilość</label>
                <div className="size-stock-container">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <div key={size} className="size-stock-item">
                      <label className="size-option">
                        <input
                          type="checkbox"
                          checked={formData.sizes.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({
                                ...prev,
                                sizes: [...prev.sizes, size],
                                sizeStock: {
                                  ...prev.sizeStock,
                                  [size]: prev.sizeStock[size] || 0,
                                },
                              }));
                            } else {
                              const newSizeStock = { ...formData.sizeStock };
                              delete newSizeStock[size];

                              setFormData((prev) => ({
                                ...prev,
                                sizes: prev.sizes.filter((s) => s !== size),
                                sizeStock: newSizeStock,
                              }));
                            }
                          }}
                        />
                        <span className="size-label">{size}</span>
                      </label>

                      {formData.sizes.includes(size) && (
                        <div className="size-quantity">
                          <label htmlFor={`quantity-${size}`}>Ilość:</label>
                          <input
                            type="number"
                            id={`quantity-${size}`}
                            min="0"
                            value={formData.sizeStock[size] || 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              setFormData((prev) => ({
                                ...prev,
                                sizeStock: {
                                  ...prev.sizeStock,
                                  [size]: value,
                                },
                              }));
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group full-width">
                <label htmlFor="colors">Dostępne kolory</label>
                <input
                  type="text"
                  id="colors"
                  value={formData.colorsText}
                  onChange={(e) => handleArrayChange("colors", e.target.value)}
                  placeholder="np. Black, White, Navy"
                />
                <small>Oddzielone przecinkami</small>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="primaryImage">Główne zdjęcie</label>
                <input
                  type="url"
                  id="primaryImage"
                  name="primaryImage"
                  value={formData.primaryImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="galleryImages">Galeria zdjęć</label>
                <textarea
                  id="galleryImages"
                  value={formData.galleryImagesText}
                  onChange={(e) =>
                    handleArrayChange("galleryImages", e.target.value)
                  }
                  rows="4"
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                />
                <small>URLs oddzielone przecinkami</small>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content summary">
            <h3>Podsumowanie produktu</h3>
            <div className="summary-grid">
              <div className="summary-section">
                <h4>Podstawowe informacje</h4>
                <p>
                  <strong>Nazwa:</strong> {formData.name}
                </p>
                <p>
                  <strong>Marka:</strong> {formData.brand}
                </p>
                <p>
                  <strong>Kategoria:</strong> {formData.category}
                </p>
                <p>
                  <strong>Cena:</strong> {formData.price} {formData.currency}
                </p>
                <p>
                  <strong>SKU:</strong> {formData.sku}
                </p>
              </div>

              <div className="summary-section">
                <h4>Szczegóły</h4>
                <p>
                  <strong>Materiał:</strong> {formData.material || "Nie podano"}
                </p>{" "}
                <p>
                  <strong>Waga:</strong> {formData.weight}
                </p>
                <p>
                  <strong>Rozmiary:</strong>{" "}
                  {formData.sizes.join(", ") || "Nie wybrano"}
                </p>
                <p>
                  <strong>Stan magazynowy:</strong>
                </p>
                <ul className="size-stock-list">
                  {formData.sizes.map((size) => (
                    <li key={size}>
                      {size}: {formData.sizeStock[size] || 0} szt.
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Kolory:</strong>{" "}
                  {formData.colors.join(", ") || "Nie podano"}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  return isPageView ? (
    <div className="product-form-container">
      <div className="step-indicator">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`step ${currentStep === step.id ? "active" : ""} ${currentStep > step.id ? "completed" : ""}`}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-title">{step.title}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        {error && <div className="error-message">{error}</div>}

        {renderStep()}

        <div className="form-actions">
          <div className="action-buttons">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="prev-button">
                ← Poprzedni
              </button>
            )}

            {currentStep < steps.length ? (
              <button type="button" onClick={nextStep} className="next-button">
                Następny →
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                {loading
                  ? "Zapisywanie..."
                  : product
                    ? "Aktualizuj Produkt"
                    : "Dodaj Produkt"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div className="modal-overlay">
      <div className="product-form-modal">
        <div className="modal-header">
          <h2>{product ? "Edytuj Produkt" : "Dodaj Nowy Produkt"}</h2>
          <button onClick={onClose} className="close-button">
            ×
          </button>
        </div>

        <div className="step-indicator">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`step ${currentStep === step.id ? "active" : ""} ${currentStep > step.id ? "completed" : ""}`}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-title">{step.title}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          {error && <div className="error-message">{error}</div>}

          {renderStep()}

          <div className="form-actions">
            <div className="action-buttons">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="prev-button"
                >
                  ← Poprzedni
                </button>
              )}

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="next-button"
                >
                  Następny →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="submit-button"
                >
                  {loading
                    ? "Zapisywanie..."
                    : product
                      ? "Aktualizuj Produkt"
                      : "Dodaj Produkt"}
                </button>
              )}
            </div>

            <button type="button" onClick={onClose} className="cancel-button">
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
