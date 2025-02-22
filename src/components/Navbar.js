import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../pages/Cart';

const Nav = styled.nav`
  background: linear-gradient(to right,rgb(168, 5, 5),rgb(117, 31, 31));
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  letter-spacing: 1px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #c72032, #871d1d);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(199, 32, 50, 0.3);
  }
`;

const CartLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const CartCount = styled.span`
  background: #ff4757;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: bold;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const adminSession = localStorage.getItem('adminSession');
  const { cartCount } = useCart();

  console.log('Navbar rendering with cart count:', cartCount);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/');
  };

  const styles = {
    '@media (max-width: 768px)': {
      nav: {
        padding: '1rem',
      },
      logo: {
        fontSize: '1.5rem',
      },
      navLinks: {
        gap: '1rem',
      },
      link: {
        fontSize: '1rem',
        padding: '0.4rem 0.8rem',
      },
    },
  };

  return (
    <Nav style={styles.nav}>
      <NavContainer>
        <Logo to="/">TheKDCompany</Logo>
        <NavLinks>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {adminSession ? (
            <>
              <NavLink to="/admin">Dashboard</NavLink>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
          <CartLink to="/cart">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <CartCount>{cartCount || 0}</CartCount>
          </CartLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;