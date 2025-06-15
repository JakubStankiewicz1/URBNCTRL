import { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import './ProductForm.css';

const ProductForm = ({ product, onClose, onSuccess }) => {
  const { addProduct, updateProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    brand: product?.brand || '',
    stock: product?.stock || '',
    imageUrl: product?.imageUrl || '',
    featured: product?.featured || false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    if (!formData.name || !formData.price || !formData.category) {
      setError('Nazwa, cena i kategoria są wymagane');
      setLoading(false);
      return;
    }

    // Convert price and stock to numbers
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0
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
      setError(result.error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="product-form-modal">
        <div className="modal-header">
          <h2>{product ? 'Edytuj Produkt' : 'Dodaj Nowy Produkt'}</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="product-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nazwa produktu *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Wprowadź nazwę produktu"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="brand">Marka</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Wprowadź markę"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Opis</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Wprowadź opis produktu"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Cena (PLN) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
                placeholder="0.00"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="stock">Ilość w magazynie</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>
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
              <option value="Odzież">Odzież</option>
              <option value="Obuwie">Obuwie</option>
              <option value="Akcesoria">Akcesoria</option>
              <option value="Torby">Torby</option>
              <option value="Biżuteria">Biżuteria</option>
              <option value="Inne">Inne</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="imageUrl">URL zdjęcia</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              Produkt wyróżniony
            </label>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Anuluj
            </button>
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'Zapisywanie...' : (product ? 'Aktualizuj' : 'Dodaj')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
