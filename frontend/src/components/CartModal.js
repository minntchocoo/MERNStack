// CartModal.js
import React from 'react';
import { useCart } from './cartContext';
import '../static/cartModal.css';

const CartModal = () => {
const { cart, closeCartModal, isCartModalOpen, dispatch } = useCart();
  // Conditionally apply the "show" class
  const modalClassName = `cart-modal ${isCartModalOpen ? 'show' : ''}`;

  const handleRemoveFromCart = (itemId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id: itemId },
    });
  };

  const handleClearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
    });
  };


  return (
    <div className={modalClassName}>
      <div className="cart-modal-content">
        <span className="close" onClick={closeCartModal}>
          &times;
        </span>
        <h2>Your Cart</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>Quantity: {item.quantity}</p> {/* Display quantity */}
              </div>
              <button id= 'b2' onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={handleClearCart}>Clear Cart</button>

      </div>
    </div>
  );
};

export default CartModal;
