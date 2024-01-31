import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './cartContext';
import '../static/productpage.css';
import CartModal from './CartModal';
import NavbarH from './Navbar-H';

const ProductPage = () => {
  const { id } = useParams();
  const { cart, dispatch, openCartModal, isCartModalOpen } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProduct = await fetch(`http://localhost:4000/api/items/${id}`);
        const dataProduct = await responseProduct.json();
        setProduct(dataProduct);

        // Fetch related products (you need to define the endpoint for related products)
        const responseRelated = await fetch('http://localhost:4000/api/items');
        const dataRelated = await responseRelated.json();
        setRelatedProducts(dataRelated);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      });
    }
  };

  return (
    <div>
      <NavbarH />
      <div className="p-container">
        <div className="product-container">
          {product ? (
            <>
              <div className="product-image-container">
                <img className="product-image" src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h1>{product.name}</h1>
                <p>${product.price}</p>
                <button id='b' onClick={handleAddToCart}>Add to Cart</button>
                <button id='b' onClick={openCartModal}>Open Cart</button>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <hr></hr>

        <div className="related-products">
          <h2>Related Products</h2>
          <ul>
            {relatedProducts.map((relatedProduct) => (
              <li key={relatedProduct.id}>
                <Link to={`/product/${relatedProduct.id}`}>
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                  <div>
                    <p id='rp'>{relatedProduct.name}</p>
                    <p>${relatedProduct.price}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {isCartModalOpen && <CartModal />}
      </div>
    </div>
  
  );
};

export default ProductPage;
