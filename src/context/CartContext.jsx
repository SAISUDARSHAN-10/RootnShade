import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ Add or update cart item
  const addOrUpdateItem = (product, type, qty) => {
    if (!qty || qty <= 0) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Update quantity for that unit type
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qtyKg: type === "single" ? qty : item.qtyKg,
                qtyCase: type === "case" ? qty : item.qtyCase,
              }
            : item
        );
      }
      // Add new item
      return [
        ...prev,
        {
          ...product,
          qtyKg: type === "single" ? qty : 0,
          qtyCase: type === "case" ? qty : 0,
        },
      ];
    });
  };

  // ✅ Remove from cart
  const removeItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // ✅ Clear entire cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addOrUpdateItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
