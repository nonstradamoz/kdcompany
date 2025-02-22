import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTable from '../components/ProductTable';

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Check if user is admin on component mount
  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (!isAdmin || !isLoggedIn) {
      navigate('/login');
    } else {
      // Fetch products (mock data for now)
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = () => {
    // Mock data fetching
    setProducts([
      { id: 1, name: 'Product 1', price: 29.99, stock: 100 },
      { id: 2, name: 'Product 2', price: 19.99, stock: 50 },
      { id: 3, name: 'Product 3', price: 39.99, stock: 20 },
    ]);
  };

  const handleAddProduct = () => {
    // Logic to add a new product
    alert('Add Product functionality to be implemented.');
  };

  const handleEditProduct = (id) => {
    // Logic to edit a product
    alert(`Edit Product functionality for ID: ${id} to be implemented.`);
  };

  const handleDeleteProduct = (id) => {
    // Logic to delete a product
    alert(`Delete Product functionality for ID: ${id} to be implemented.`);
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      background: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    header: {
      background: 'linear-gradient(135deg, #8B0000 0%, #c72032 100%)',
      padding: '2rem',
      borderRadius: '10px',
      color: 'white',
      marginBottom: '2rem',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
    },
    subtitle: {
      fontSize: '1.2rem',
      fontWeight: '400',
    },
    button: {
      padding: '0.5rem 1rem',
      background: '#c72032',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginBottom: '1rem',
      transition: 'background 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Products</h1>
        <p style={styles.subtitle}>Welcome, {sessionStorage.getItem('userEmail')}</p>
        <button
          style={styles.button}
          onClick={handleAddProduct}
        >
          Add New Product
        </button>
      </div>

      <ProductTable 
        products={products} 
        onEdit={handleEditProduct} 
        onDelete={handleDeleteProduct} 
      />
    </div>
  );
};

export default ManageProducts;