// itemlist.js
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Link } from 'react-router-dom';
import NavbarH from '../components/Navbar-H';
import '../static/gallery.css';

const Itemlist = ({ images }) => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const handleSwipe = (deltaX) => {
    const newCenterIndex = (centerIndex + deltaX + images.length) % images.length;
    setCenterIndex(newCenterIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(-1),
    onSwipedRight: () => handleSwipe(1),
  });

  const handleSwipeLeft = () => {
    handleSwipe(-1);
  };

  const handleSwipeRight = () => {
    handleSwipe(1);
  };

  const startAutoScroll = () => {
    setIsAutoScrolling(true);
  };

  const stopAutoScroll = () => {
    setIsAutoScrolling(false);
  };

  useEffect(() => {
    let interval;

    if (isAutoScrolling) {
      interval = setInterval(() => {
        handleSwipe(1); // Auto-scroll to the next image
      }, 1000); // Adjust the interval based on your preference
    }

    return () => {
      clearInterval(interval);
    };
  }, [isAutoScrolling]);

  const galleryContainerStyle = {
    height: '100vh',
  };

  const fixedImageWidth = '300px';

  const products = [
    { name: 'Product 1', price: '$10.99' },
    { name: 'Product 2', price: '$19.99' },
    { name: 'Product 3', price: '$15.49' },
    { name: 'Product 4', price: '$12.99' },
    { name: 'Product 5', price: '$8.99' },
  ];

  const indices = Array.from({ length: 5 }, (_, i) => (centerIndex + i - 2 + images.length) % images.length);

  const renderedImages = indices.map((index) => (
    
    <div key={index} className="product-container">
      
        <Link to={{ pathname: `/product/${index + 1}`, state: { images } }}>
        <img
            src={images[index]}
            alt={`Slide ${index + 1}`}
            style={{
            width: fixedImageWidth,
            height: '100%',
            objectFit: 'cover',
            }}
        />
        </Link>

      <div className="product-info">
        <h3>{products[index]?.name}</h3>
        <p>{products[index]?.price}</p>
        <button id='b' className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  ));
  return (
    <div style={galleryContainerStyle} onMouseEnter={stopAutoScroll} onMouseLeave={startAutoScroll}>
      <div {...handlers} className="gallery-container">
        {renderedImages}
      </div>
      <div className="button-container">
        <button id='b2' onClick={handleSwipeLeft} className="swipe-button">
          Previous
        </button>
        <button id='b2' onClick={handleSwipeRight} className="swipe-button">
          Next
        </button>
      </div>
    </div>
  );
};

const sampleImages = [
  '/nj.webp',
  '/orangeblood.jpg',
  '/svt.jpg',
  '/oo.jfif',
  '/sun.jfif',
  '/won.jfif',
  '/nj.webp',
];

export default function GalleryWrapper() {
  return <Itemlist images={sampleImages} />;
};
