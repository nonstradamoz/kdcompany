import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Cart from '/Users/dileeppillai/Documents/sem/kdcompany/thekdcompany/src/pages/Cart.js'

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    style={{ width: '1.5rem', height: '1.5rem' }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l1 9h12l1-9h2M3 3l1 9m0 0h12m-12 0l1 9h12l1-9m-12 0h12"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
  const userEmail = sessionStorage.getItem('userEmail');

  const getCartItemsCount = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  useEffect(() => {
    setCartCount(getCartItemsCount());
    const handleStorageChange = () => {
      setCartCount(getCartItemsCount());
    };
    window.addEventListener('cartUpdated', handleStorageChange);
    return () => {
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
    window.location.reload(); // Refresh to update the header
  };

  const styles = {
    header: {
      background: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: '70px',
      display: 'flex',
      alignItems: 'center',
    },
    navContainer: {
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '3rem',
    },
    logo: {
      fontSize: '1.8rem',
      fontWeight: '800',
      color: '#c72032',
      textDecoration: 'none',
      fontFamily: 'Poppins, sans-serif',
      letterSpacing: '-0.5px',
      transition: 'color 0.3s ease',
      whiteSpace: 'nowrap',
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      '@media (max-width: 768px)': {
        display: 'none',
      },
    },
    navLink: (linkName) => ({
      color: isHovered === linkName ? '#c72032' : '#2c3e50',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '1rem',
      padding: '0.5rem 0.8rem',
      transition: 'all 0.3s ease',
      position: 'relative',
      whiteSpace: 'nowrap',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: isHovered === linkName ? '100%' : '0%',
        height: '2px',
        background: '#c72032',
        transition: 'all 0.3s ease',
      }
    }),
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      '@media (max-width: 768px)': {
        display: 'none',
      },
    },
    loginBtn: {
      background: 'transparent',
      border: '2px solid #c72032',
      borderRadius: '25px',
      padding: '0.5rem 1.5rem',
      color: '#c72032',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      fontSize: '0.9rem',
      whiteSpace: 'nowrap',
    },
    cartBtn: {
      background: '#c72032',
      borderRadius: '25px',
      padding: '0.5rem 1.5rem',
      color: 'white',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      position: 'relative',
      whiteSpace: 'nowrap',
    },
    cartCount: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      background: 'white',
      color: '#c72032',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      border: '2px solid #c72032',
    },
    accountButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: 'transparent',
      border: '2px solid #c72032',
      borderRadius: '25px',
      color: '#c72032',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      position: 'relative',
      '&:hover': {
        background: '#f8f9fa',
      },
    },
    accountIcon: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      background: isAdmin ? '#8B0000' : '#c72032',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      right: 0,
      marginTop: '0.5rem',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      minWidth: '200px',
      zIndex: 1000,
    },
    dropdownItem: {
      display: 'block',
      padding: '0.8rem 1rem',
      color: '#2c3e50',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: '#f8f9fa',
        color: '#c72032',
      },
    },
    divider: {
      height: '1px',
      background: '#e1e1e1',
      margin: '0.5rem 0',
    },
    mobileMenuButton: {
      display: 'none',
      background: 'none',
      border: 'none',
      color: '#c72032',
      cursor: 'pointer',
      padding: '0.5rem',
      '@media (max-width: 768px)': {
        display: 'block',
      },
    },
    
    mobileMenu: {
      display: 'none',
      position: 'fixed',
      top: '70px',
      left: 0,
      right: 0,
      background: 'white',
      padding: '1rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      '@media (max-width: 768px)': {
        display: isMobileMenuOpen ? 'block' : 'none',
      },
    },
    
    mobileNavLink: {
      display: 'block',
      padding: '1rem',
      color: '#2c3e50',
      textDecoration: 'none',
      borderBottom: '1px solid #eee',
      fontWeight: '600',
    },
  };

  const AccountButton = () => (
    <div style={{ position: 'relative' }}>
      <button
        style={{
          ...styles.accountButton,
          background: showDropdown ? '#f8f9fa' : 'transparent',
        }}
        onClick={() => setShowDropdown(!showDropdown)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      >
        <span style={styles.accountIcon}>
          {isAdmin ? 'A' : userEmail?.charAt(0).toUpperCase()}
        </span>
        <span>{isAdmin ? 'Admin Panel' : 'My Account'}</span>
      </button>

      {showDropdown && (
        <div style={styles.dropdown}>
          {isAdmin ? (
            <>
              <Link to="/admin" style={styles.dropdownItem}>
                Admin Dashboard
              </Link>
              <div style={styles.divider}></div>
            </>
          ) : (
            <>
              <Link to="/profile" style={styles.dropdownItem}>
                My Profile
              </Link>
              <Link to="/orders" style={styles.dropdownItem}>
                My Orders
              </Link>
              <Link to="/settings" style={styles.dropdownItem}>
                Settings
              </Link>
              <div style={styles.divider}></div>
            </>
          )}
          <button
            onClick={handleLogout}
            style={{
              ...styles.dropdownItem,
              width: '100%',
              textAlign: 'left',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: '#c72032',
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );

  const navLinks = () => {
    const links = [
      { path: '/', text: 'Home' },
      { path: '/products', text: 'Products' },
      { path: '/custom-posters', text: 'Custom Posters' },
      { path: '/about', text: 'About' },
      { path: '/contact', text: 'Contact' },
      
    ];

    return links.map(link => (
      <Link 
        key={link.path}
        to={link.path} 
        style={styles.navLink(link.text.toLowerCase())}
        onMouseEnter={() => setIsHovered(link.text.toLowerCase())}
        onMouseLeave={() => setIsHovered('')}
      >
        {link.text}
      </Link>
    ));
  };

  return (
    <header style={styles.header}>
      <nav style={styles.navContainer}>
        <div style={styles.leftSection}>
          <Link to={isAdmin ? '/' : '/'} style={styles.logo}>
            {isAdmin ? 'The KD Company' : 'The KD Company'}
          </Link>
          
          <button
            style={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon />
          </button>

          <div style={styles.navLinks}>
            {navLinks()}
          </div>
        </div>

        <div style={styles.rightSection}>
          {userEmail ? (
            <AccountButton />
          ) : (
            <Link 
              to="/login" 
              style={{
                ...styles.loginBtn,
                background: isHovered === 'login' ? '#c72032' : 'transparent',
                color: isHovered === 'login' ? 'white' : '#c72032',
              }}
              onMouseEnter={() => setIsHovered('login')}
              onMouseLeave={() => setIsHovered('')}
            >
              Login
            </Link>
          )}
          {!isAdmin && (
            <Link 
              to="/cart"
              style={styles.cartBtn}
            >
              <CartIcon />
              Cart
              {cartCount > 0 && <span>({cartCount})</span>}
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={styles.mobileMenu}>
        {navLinks().map((link, index) => (
          <Link
            key={index}
            to={link.props.to}
            style={styles.mobileNavLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.props.children}
          </Link>
        ))}
        
        {userEmail ? (
          <>
            {isAdmin ? (
              <Link to="/admin" style={styles.mobileNavLink}>Admin Dashboard</Link>
            ) : (
              <>
                <Link to="/profile" style={styles.mobileNavLink}>My Profile</Link>
                <Link to="/orders" style={styles.mobileNavLink}>My Orders</Link>
                <Link to="/settings" style={styles.mobileNavLink}>Settings</Link>
              </>
            )}
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              style={{
                ...styles.mobileNavLink,
                width: '100%',
                textAlign: 'left',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: '#c72032',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.mobileNavLink}>Login</Link>
        )}
        
        {!isAdmin && (
          <Link to="/cart" style={styles.mobileNavLink}>
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;