import { useEffect, useState } from 'react';
import '../static/home.css';
// components
import ItemList from '../components/itemlist';
import ItemForm from '../components/ItemForm'
import SwipeableGallery from '../components/swipegallery'
import NavbarH from '../components/Navbar-H';
import Navbar from '../components/Navbar';


const Home = () => {
    const [items, setItems] = useState([]);
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
            <Navbar />
            <SwipeableGallery />
        
               
                <div>
                    <h1>Items List</h1>
                    <ItemList />
                </div>
              
         
            <div> Images </div>
            <p></p>
        </div>
    );
};

export default Home;
