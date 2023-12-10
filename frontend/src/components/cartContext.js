import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem = {
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        image: action.payload.image,
        quantity: 1,
      };

      const existingItemIndex = state.findIndex((item) => item.id === newItem.id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        return [...state, newItem];
      }

    case 'REMOVE_FROM_CART':
      const updatedCart = state.filter((item) => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;

    case 'CLEAR_CART':
      localStorage.removeItem('cart');
      return [];

    default:
      return state;
  }
};

// ...

const CartProvider = ({ children }) => {
  // Retrieve the initial cart state from local storage
  const initialCartState = JSON.parse(localStorage.getItem('cart')) || [];

  // Set up the cart context using useReducer
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  // State for modal visibility
  const [isCartModalOpen, setIsCartModalOpen] = React.useState(false);

  // Function to open the cart modal
  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  // Function to close the cart modal
  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  // Use useEffect to update local storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch, isCartModalOpen, openCartModal, closeCartModal }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
