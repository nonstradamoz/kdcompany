import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 800;
  color: #2c3e50;
  text-decoration: none;
  background: linear-gradient(135deg, #c72032, #871d1d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  color: #2c3e50;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  &:hover, &.active {
    color: #c72032;
    background: #f8f9fa;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #2c3e50;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const role = localStorage.getItem('userRole');
    setIsAuthenticated(authStatus === 'true');
    setUserRole(role);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">TheKDCompany</Logo>
        
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </MenuButton>

        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </NavLink>
          <NavLink to="/products" className={location.pathname === '/products' ? 'active' : ''}>
            Products
          </NavLink>
          <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About
          </NavLink>
          <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            Contact
          </NavLink>
          
          {isAuthenticated ? (
            <>
              {userRole === 'admin' && (
                <NavLink to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
                  Admin Dashboard
                </NavLink>
              )}
              {userRole === 'user' && (
                <NavLink to="/account" className={location.pathname === '/account' ? 'active' : ''}>
                  My Account
                </NavLink>
              )}
              <NavLink to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
                Cart
              </NavLink>
              <NavLink to="/login" onClick={handleLogout}>
                Logout
              </NavLink>
            </>
          ) : (
            <NavLink to="/login" className={location.pathname === '/login' ? 'active' : ''}>
              Login
            </NavLink>
          )}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;