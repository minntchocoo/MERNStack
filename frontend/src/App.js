<<<<<<< Updated upstream
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductPage from './components/productpage';
import { CartProvider } from './components/cartContext';
import ProtectedRoute from './components/privateRoute'; // Importing the ProtectedRoute component
import HomeUser from './pages/Home-user';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <CartProvider>
          <Routes>
            <Route
               path="/product/:id"
               element={<ProtectedRoute allowedRoles={['user']} children={<ProductPage />} />}
             />
            <Route
               path="/home"
               element={<ProtectedRoute allowedRoles={['user']} children={<HomeUser />} />}
             />
          
>>>>>>> Stashed changes
          </Routes>
        </div>
      </div>
    </Router>
 
  );
}

export default App;
