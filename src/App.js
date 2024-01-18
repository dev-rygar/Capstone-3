import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import AdminRoute from './components/AdminRoute'; 

// Local files
import HomePage from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SideBar from './components/admin_components/AdminSidebar';
import AddProduct from './components/admin_components/AddProduct';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import PageNotFound from './pages/PageNotFound';
import SingleProductPage from './pages/SingleProductPage';
import OrderPage from './pages/OrderPage';


function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<SingleProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrderPage />} />            
            <Route path="/dashboard" element={<AdminRoute component={SideBar} />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<PageNotFound />} />
            {/* <Route path="/admin" element={<AdminRoute component={AdminDashboard} />} /> */}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
