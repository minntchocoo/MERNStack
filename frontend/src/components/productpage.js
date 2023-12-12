import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useCart } from './cartContext';
import '../static/productpage.css';
import CartModal from './CartModal';
import NavbarH from '../components/Navbar-H';

const ProductPage = () => {
  const { id } = useParams();
  const { images } = useLocation().state ?? {};
  const { cart, dispatch, openCartModal, isCartModalOpen } = useCart(); // Get isCartModalOpen from useCart
  console.log('Cart Context:', cart);

  const products = [
    { name: 'Product 1', price: '$10.99' },
    { name: 'Product 2', price: '$19.99' },
    { name: 'Product 3', price: '$15.49' },
    { name: 'Product 4', price: '$12.99' },
    { name: 'Product 5', price: '$8.99' },
  ];

  const sampleImages = [
    '/nj.webp',
    '/orangeblood.jpg',
    '/svt.jpg',
    '/oo.jfif',
    '/sun.jfif',
    '/won.jfif',
    '/nj.webp',
  ];

  const product = products[id - 1];

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id,
        name: product?.name,
        price: product?.price,
        image: sampleImages?.[id - 1],
      },
    });
    console.log('Cart Context:', cart);
  };
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
    <div> 
      <NavbarH/>
      <div className="p-container">
      
      <div className="product-container">
        <div className="product-image-container">
        
          <img
            className="product-image"
            src={sampleImages?.[id - 1]}
            alt={`Product ${id}`}
          />
        </div>
        <div className="product-info">
          <h1>{product?.name}</h1>
          <p>{product?.price}</p>
          {/* Add more details about the product */}
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={openCartModal}>Open Cart</button>
        </div>
      </div>
      <div className="related-products">
        <h2 id='t'>RELATED PRODUCTS</h2>
        <ul>
          {products.map((p, index) => (
            <li key={index}>
              <img src={sampleImages[index]} alt={`Product ${index + 1}`} />
              <div>
                <p id='d'>{p.name}</p>
                <p id='d'>{p.price}</p>
                <a href={`/product/${index + 1}`}>View Product</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Render the CartModal component conditionally */}
      {isCartModalOpen && <CartModal />}
    </div>
    </div>

    
    
  );
};

export default ProductPage;
