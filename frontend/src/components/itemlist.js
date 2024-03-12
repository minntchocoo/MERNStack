// ItemList.js -> slider for user
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../static/itemlist.css';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
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
  }, []);

  // Slick carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  // Ensure the Slider component is only rendered when items are available
  return (
    <div className="item-list-container">
      {items.length > 0 && (
        <Slider {...sliderSettings}>
          {items.map((item) => (
            <div key={item._id} className="item">
              <Link to={`/product/${item.id}`}>
                <h3 id='n'>{item.item_name}</h3>
                <p id='pr'>Price: ${item.price}</p>
                <img src={item.image} alt={item.item_name} className="item-image" />
                <p id='n'>Quantity: {item.quantity}</p>
                {item.description && <p id='n'>Description: {item.description}</p>}
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ItemList;
