// CartModal.js
import React, { useState } from 'react';
import { useCart } from './cartContext';
import '../static/cartModal.css';

const CartModal = () => {
  const { cart, closeCartModal, isCartModalOpen, dispatch } = useCart();
  const [paymentType, setPaymentType] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [isCheckedOut, setIsCheckedOut] = useState(false);

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

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  
  const handleCheckout = async () => {
    const checkoutData = {
      paymentType,
      address,
      name,
      date,
      cartItems: cart,
    };

    try {
      const response = await fetch('http://localhost:4000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      if (response.ok) {
        console.log('Checkout successful!');
        // Optionally, you can perform additional actions here
        // such as clearing the cart or navigating to a confirmation page.
        setIsCheckedOut(true);
        setTimeout(() => {
          handleClearCart();
        }, 10000);
        console.log(checkoutData)
      } else {
        console.error('Checkout failed.');
      }
    } catch (error) {
      console.error('An error occurred during checkout:', error);
    }
  };

  return (
    <div className={modalClassName}>
    <div className="cart-modal-content">
      <span className="close" onClick={closeCartModal}>
        &times;
      </span>
      <h2>Your Cart</h2>
      {isCheckedOut ? (
        <div>
          <h3>Checked-out Items</h3>
          {/* Display checked-out items here */}
          {cart.map((item) => (
            <div key={item.id} className="checked-out-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Display cart items when not checked out
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button id="b2" onClick={() => handleRemoveFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleClearCart}>Clear Cart</button>
      <div className="checkout-fields">
        <label>
          Payment Type:
          <input type="text" value={paymentType} onChange={handlePaymentTypeChange} />
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={handleAddressChange} />
        </label>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={handleDateChange} />
        </label>
      </div>
      <button onClick={handleClearCart}>Clear Cart</button>
      <button onClick={handleCheckout} className="checkout-button">
        Checkout
      </button>
    </div>
  </div>
  
  );
};

export default CartModal;
