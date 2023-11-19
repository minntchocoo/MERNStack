import { useEffect, useState } from 'react';

// components
import ItemDetails from '../components/ItemDetails'
import ItemForm from '../components/ItemForm'
import SwipeableGallery from '../components/swipegallery'


const Home = () => {
    const [items, setItems] = useState(null);

    useEffect(() => {
        // Define your custom headers
        const headers = {
            'Content-Type': 'application/json'
            // Add any other headers you need
        };
    
        // Fetch course data from your backend API
        fetch('http://localhost:4000/api/items', { // Fixed the URL
            method: 'GET', // You can change the HTTP method if needed
            headers: headers
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // Handle the data and update the 'items' state
            setItems(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);
    
    return (
        <div className="home">
            <SwipeableGallery />
        
            <div className="items">
                {items && items.map((item) => (
                    <ItemDetails key={item._id} item={item} />
                ))}
            </div>
            <div> Images </div>
            <ItemForm/>
            <p></p>
        </div>
    );
};

export default Home;
