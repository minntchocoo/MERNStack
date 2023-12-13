// ItemList.js
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../static/itemlist.css'; // Import the CSS file

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/items');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  // Slick carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display three items at a time
    slidesToScroll: 1,
  };

  return (
    <div className="item-list-container">
      <Slider {...sliderSettings}>
        {items.map((item, index) => (
          <div key={item._id} className="item">
            <Link to={`/product/${item._id}`}>
              {/* Use Link to navigate to the corresponding product page */}
              <h3>{item.name}</h3>
              <p>Price: {item.price}</p>
              <img src={item.image} alt={item.name} className="item-image" />
              <p>Quantity: {item.quantity}</p>
              {item.description && <p>Description: {item.description}</p>}
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ItemList;
