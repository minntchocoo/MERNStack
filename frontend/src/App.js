import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductPage from './components/productpage'; // Corrected the component name
import { CartProvider } from './components/cartContext';
import ProtectedRoute from './components/privateRoute'; // Corrected the component name
import HomeUser from './pages/Home-user';
import AdminView from './pages/Admin';
import AdminList from './pages/A-ItemV';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
              path="/admin"
              element={<ProtectedRoute allowedRoles={['admin']}><AdminView /></ProtectedRoute>}
            />
          <Route
            path="/admin/list"
            element={<ProtectedRoute allowedRoles={['admin']}><AdminList /></ProtectedRoute>}
          />
        </Routes>

        <CartProvider>
          <Routes>
            <Route
              path="/product/:id"
              element={<ProductPage />}
            />
            <Route
              path="/home"
              element={<ProtectedRoute allowedRoles={['user']}><HomeUser /></ProtectedRoute>}
            />
          </Routes>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
