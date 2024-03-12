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
import SupplierView from './pages/supplier/supplierview';
import CourierView from './pages/courier/courierview';
import PrequestView from './pages/admin/admin-preq';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route
              path="/admin"
              element={<ProtectedRoute allowedRoles={[1]}><AdminView /></ProtectedRoute>}
            />
          <Route
            path="/admin/list"
            element={<ProtectedRoute allowedRoles={[1]}><AdminList /></ProtectedRoute>}
          />
          <Route
            path="/admin/prequest"
            element={<ProtectedRoute allowedRoles={[1]}><PrequestView /></ProtectedRoute>}
          />
          <Route
            path="/admin/user-content"
            element={<ProtectedRoute allowedRoles={[1]}><AdminList /></ProtectedRoute>}
          />
          
          
          {/* Supplier Routes */}
          <Route
            path="/supplier"
            element={<ProtectedRoute allowedRoles={[3]}><SupplierView /></ProtectedRoute>}
          />


          {/* Courier Routes */}
          <Route
            path="/courier"
            element={<ProtectedRoute allowedRoles={[4]}><CourierView /></ProtectedRoute>}
          />

        </Routes>

        {/* Shopper Routes */}
        <CartProvider>
          <Routes>
            <Route
              path="/product/:id"
              element={<ProductPage />}
            />
            <Route
              path="/home"
              element={<ProtectedRoute allowedRoles={[2]}><HomeUser /></ProtectedRoute>}
            />
          </Routes>
        </CartProvider>

      </Router>
    </div>
  );
}

export default App;