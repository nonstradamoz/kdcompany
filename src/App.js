import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import CustomPosters from './pages/CustomPosters';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AuthGuard from './components/AuthGuard';
import ManageProducts from './pages/ManageProducts';
import { CartProvider } from './pages/Cart';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const mainContentStyle = {
    paddingTop: '80px', // Adjust this value based on your header height
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Navbar />
          <main style={mainContentStyle}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/custom-posters" element={<CustomPosters />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/admin" 
                element={
                  <AuthGuard>
                    <Admin />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/manage-products" 
                element={
                  <AuthGuard>
                    <ManageProducts />
                  </AuthGuard>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;