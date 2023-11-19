import React from 'react';
import { useSwipeable } from 'react-swipeable';

const SwipeableGallery = ({ images }) => {
  let currentIndex = 0;

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
  });

  const handleSwipe = (deltaX) => {
    currentIndex = (currentIndex + deltaX + images.length) % images.length;
  };

  const handleSwipeLeft = () => {
    handleSwipe(-1);
  };

  const handleSwipeRight = () => {
    handleSwipe(1);
  };

  return (
    <div>
      <button onClick={handleSwipeLeft}>Swipe Left</button>
      <div {...handlers}>
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
      </div>
      <button onClick={handleSwipeRight}>Swipe Right</button>
    </div>
  );
};

export default SwipeableGallery;
