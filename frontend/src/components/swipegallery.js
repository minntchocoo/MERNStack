import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import '../static/gallery.css';

const SwipeableGallery = ({ images }) => {
  const [centerIndex, setCenterIndex] = useState(0);

  const handleSwipe = (deltaX) => {
    const newCenterIndex = (centerIndex + deltaX + images.length) % images.length;
    setCenterIndex(newCenterIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
  });

  const handleSwipeLeft = () => {
    handleSwipe(-1);
  };

  const handleSwipeRight = () => {
    handleSwipe(1);
  };

  const renderedImages = images.map((image, index) => (
    <div
      key={index}
      className="image-container"
      style={{
        display: index === centerIndex ? 'flex' : 'none', // Show only the center image
      }}
    >
      <img
        src={image}
        alt={`Image ${index + 1}`}
        className="gallery-image"
      />
      {index === centerIndex && ( // Show button only for the center image
        <button className="get-started-button">Get Started</button>
      )}
    </div>
  ));

  return (
    <div>
      <div {...handlers} className="gallery-container">
        {renderedImages}
      </div>
      <div className="button-container">
        <button onClick={handleSwipeLeft} className="swipe-button">
          Swipe Left
        </button>
        <button onClick={handleSwipeRight} className="swipe-button">
          Swipe Right
        </button>
      </div>
    </div>
  );
};

const sampleImages = [
  '/heaven.jpg',
  '/bc.png',
  '/kalpa.webp',
  // Add more sample image URLs as needed
];

export default () => <SwipeableGallery images={sampleImages} />;
