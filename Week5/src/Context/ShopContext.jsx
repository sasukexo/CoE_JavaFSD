import React, { createContext, useEffect, useState } from "react";
import { productsData } from "../data";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState(productsData);
    const [filteredProducts, setFilteredProducts] = useState(productsData);
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    const searchProducts = (query) => {
        if (!query.trim()) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.title && product.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    const addToCart = (product, id) => {
        const cartItem = cart.find((item) => item.id === id);
        if (cartItem) {
            setCart(cart.map((item) =>
                item.id === id ? { ...item, amount: item.amount + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, amount: 1 }]);
        }
    };
    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const increaseAmount = (id) => {
        const cartItem = cart.find((item) => item.id === id);
        if (cartItem) {
            addToCart(cartItem, id);
        }
    };

    const decreaseAmount = (id) => {
        const cartItem = cart.find((item) => item.id === id);
        if (cartItem) {
            if (cartItem.amount > 1) {
                setCart(cart.map((item) =>
                    item.id === id ? { ...item, amount: item.amount - 1 } : item
                ));
            } else {
                removeFromCart(id);
            }
        }
    };

    useEffect(() => {
        const newTotal = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
        setTotal(newTotal);
    }, [cart]);

    useEffect(() => {
        setQuantity(cart.reduce((acc, item) => acc + item.amount, 0));
    }, [cart]);

    return (
        <ShopContext.Provider value={{
            products,
            filteredProducts,
            searchProducts,
            addToCart,
            removeFromCart,
            increaseAmount,
            decreaseAmount,
            clearCart,
            quantity,
            total,
            cart
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
