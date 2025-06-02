import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../assets/products.json';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Symulujemy ładowanie danych
        const loadProducts = async () => {
            try {
                setLoading(true);
                // W prawdziwej aplikacji tutaj byłby fetch z API
                setProducts(productsData);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const getProductById = (id) => {
        return products.find(product => product.id === parseInt(id));
    };

    const getFeaturedProducts = (limit = 5) => {
        // Zwracamy pierwsze 'limit' produktów jako featured
        return products.slice(0, limit);
    };

    const value = {
        products,
        loading,
        getProductById,
        getFeaturedProducts
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
