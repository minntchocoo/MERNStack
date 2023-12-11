// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductPage from './components/productpage';
import { CartProvider } from './components/cartContext';
import HomeUser from './pages/Home-user';
function App() {
  return (
    <div className="App">
      <Router>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/home" element={<HomeUser/>}/>
          </Routes>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
