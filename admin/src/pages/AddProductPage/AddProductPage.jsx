import { useState } from "react";
import { useProducts } from "../../contexts/ProductContext";
import ProductForm from "../../components/ProductForm/ProductForm.jsx";
import "./addProductPage.css";
import { FiArrowLeft } from "react-icons/fi";

const AddProductPage = ({ onBack }) => {
  const [loading, setLoading] = useState(false);

  const handleSuccess = () => {
    // Show success message and go back to products list
    onBack();
  };

  return (
    <div className="add-product-page">
      <div className="page-header">
        <button onClick={onBack} className="back-button">
          <FiArrowLeft size={20} />
          <span>Powrót do listy produktów</span>
        </button>
        <div className="header-content">
          <h1>Dodaj nowy produkt</h1>
          <p>Wypełnij formularz, aby dodać nowy produkt do kolekcji URBNCTRL</p>
        </div>
      </div>

      <div className="form-container">
        <ProductForm onSuccess={handleSuccess} isPageView={true} />
      </div>
    </div>
  );
};

export default AddProductPage;
