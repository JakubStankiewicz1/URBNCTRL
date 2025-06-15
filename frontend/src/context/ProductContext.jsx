import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import productsData from '../assets/products_new.json';

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
    const [cart, setCart] = useState([]);

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

    // Ładowanie koszyka z localStorage przy inicjalizacji
    useEffect(() => {
        const savedCart = localStorage.getItem('urbnctrl-cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Zapisywanie koszyka do localStorage przy każdej zmianie
    useEffect(() => {
        localStorage.setItem('urbnctrl-cart', JSON.stringify(cart));
    }, [cart]);

    const getProductById = (id) => {
        return products.find(product => product.id === parseInt(id));
    };

    const getFeaturedProducts = (limit = 10) => {
        // Filtrujemy produkty z flagą featured=true
        const featured = products.filter(product => product.featured === true);
        // Zwracamy limit produktów lub wszystkie jeśli jest ich mniej niż limit
        return featured.slice(0, limit);
    };    // Funkcje koszyka
    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                // Jeśli produkt już jest w koszyku, zwiększ ilość
                toast.success(`Zwiększono ilość "${product.name}" w koszyku`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Jeśli produkt nie ma w koszyku, dodaj nowy
                toast.success(`"${product.name}" został dodany do koszyka! 🛍️`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return [...prevCart, { ...product, quantity }];
            }
        });
    };    const removeFromCart = (productId) => {
        const removedItem = cart.find(item => item.id === productId);
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
        
        if (removedItem) {
            toast.info(`"${removedItem.name}" został usunięty z koszyka`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };    const clearCart = () => {
        if (cart.length > 0) {
            toast.success("Koszyk został wyczyszczony! ✨", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartItemsCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const isInCart = (productId) => {
        return cart.some(item => item.id === productId);
    };

    const value = {
        products,
        loading,
        getProductById,
        getFeaturedProducts,
        // Cart functions
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        isInCart
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
