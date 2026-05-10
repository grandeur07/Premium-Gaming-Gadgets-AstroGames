import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add to cart
  const addToCart = (product) => {
  setCart((prev) => {
    const exists = prev.find(item => item.product_id === product.product_id);
    if (exists) return prev;
    return [...prev, product];
  });
};

  // Remove from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.product_id !== id));
  };

  // Add total calculation
  const getTotal = () => {
  return cart.reduce((total, item) => {
    return total + Number(item.product_cost);
  }, 0);
};

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};