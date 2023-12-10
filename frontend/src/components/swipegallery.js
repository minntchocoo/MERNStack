import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import '../static/gallery.css'

const SwipeableGallery = ({ images }) => {
 
  const [centerIndex, setCenterIndex] = useState(0);

  const handleSwipe = (deltaX) => {
    // Calculate the new center index based on the current center index and the swipe direction
    const newCenterIndex = (centerIndex + deltaX + images.length) % images.length;

    // Set the new center index
    setCenterIndex(newCenterIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
  });

  const handleSwipeLeft = () => {
    handleSwipe(1);
  };

  const handleSwipeRight = () => {
    handleSwipe(-1);
  };

  const renderedImages = images.map((image, index) => (
    <img
      key={index}
      src={image}
      alt={`Image ${index + 1}`}
      style={{
        width: index === centerIndex ? '600px' : '300px', // Center image has larger width
        height: index === centerIndex ? '600px' : '300px', // Center image has larger height
        objectFit: 'cover',
      }}
    />
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

// Updated sample images with placeholder URLs
const sampleImages = [
  '/sun.jfif',
  '/oo.jfif',
  '/won.jfif',
  // Add more sample image URLs as needed
];

export default () => <SwipeableGallery images={sampleImages} />;
