import { useEffect, useState } from 'react';
import '../static/home.css';
// components
import ItemDetails from '../components/ItemDetails'
import ItemForm from '../components/ItemForm'
import SwipeableGallery from '../components/swipegallery'


const Home = () => {
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
        
<<<<<<< Updated upstream
            <div className="items">
                {items && items.map((item) => (
                    <ItemDetails key={item._id} item={item} />
                ))}
=======
               
                <div>
                    <h1>Items List</h1>
                    <Itemlist />
                </div>
              
>>>>>>> Stashed changes
            </div>
            <div> Images </div>
            <ItemForm/>
            <p></p>
        </div>
    );
};

export default Home;
