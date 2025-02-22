import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [siteData, setSiteData] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalSales: 0,
  });

  // Check if user is admin on component mount
  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (!isAdmin || !isLoggedIn) {
      navigate('/login');
    } else {
      // Fetch site data (mock data for now)
      fetchSiteData();
    }
  }, [navigate]);

  const fetchSiteData = () => {
    // Mock data fetching
    setSiteData({
      totalUsers: 150, // Example data
      totalOrders: 75,  // Example data
      totalSales: 1200, // Example data
    });
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
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '2rem',
    },
    card: {
      background: 'white',
      borderRadius: '10px',
      padding: '1.5rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
      },
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#c72032',
    },
    cardValue: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#2c3e50',
    },
    footer: {
      marginTop: '2rem',
      textAlign: 'center',
      fontSize: '0.9rem',
      color: '#666',
    },
    icon: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      fontSize: '2rem',
      color: '#c72032',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <p style={styles.subtitle}>Welcome, {sessionStorage.getItem('userEmail')}</p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Users</h3>
          <p style={styles.cardValue}>{siteData.totalUsers}</p>
          <i className="fas fa-users" style={styles.icon}></i>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Orders</h3>
          <p style={styles.cardValue}>{siteData.totalOrders}</p>
          <i className="fas fa-shopping-cart" style={styles.icon}></i>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Sales</h3>
          <p style={styles.cardValue}>${siteData.totalSales.toFixed(2)}</p>
          <i className="fas fa-dollar-sign" style={styles.icon}></i>
        </div>
      </div>

      <div style={styles.footer}>
        <p>© {new Date().getFullYear()} The KD Company. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Admin;