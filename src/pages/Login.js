import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : '',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if it's an admin login
      if (formData.email === 'admin@gmail.com' && formData.password === 'admin123') {
        sessionStorage.setItem('isAdmin', 'true');
        sessionStorage.setItem('userEmail', formData.email);
        navigate('/admin');
      } else {
        // Regular user login
        sessionStorage.setItem('isAdmin', 'false');
        sessionStorage.setItem('userEmail', formData.email);
        navigate('/');
      }
    } catch (error) {
      setErrors({ submit: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      padding: '1rem',
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '3rem 4rem',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '500px',
      position: 'relative',
      overflow: 'hidden',
    },
    title: {
      fontSize: '2.8rem',
      fontWeight: '800',
      color: '#1a1a1a',
      marginBottom: '0.5rem',
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#666',
      marginBottom: '2.5rem',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.8rem',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    label: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '0.3rem',
    },
    input: {
      padding: '1.2rem',
      borderRadius: '12px',
      border: '2px solid #e1e1e1',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      '&:focus': {
        outline: 'none',
        borderColor: '#8B0000',
        boxShadow: '0 0 0 4px rgba(139, 0, 0, 0.1)',
      },
    },
    error: {
      color: '#8B0000',
      fontSize: '0.875rem',
      marginTop: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    button: {
      background: '#8B0000',
      color: 'white',
      padding: '1.2rem',
      borderRadius: '12px',
      border: 'none',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1rem',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        background: '#660000',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(139, 0, 0, 0.3)',
      },
      '&:disabled': {
        background: '#ccc',
        cursor: 'not-allowed',
        transform: 'none',
        boxShadow: 'none',
      },
    },
    signupContainer: {
      marginTop: '2.5rem',
      padding: '2rem 0 0',
      borderTop: '2px solid #f0f0f0',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
    },
    signupText: {
      fontSize: '1.1rem',
      color: '#666',
    },
    signupButton: {
      display: 'inline-block',
      background: 'transparent',
      color: '#8B0000',
      padding: '1rem 2.5rem',
      borderRadius: '12px',
      border: '2px solid #8B0000',
      fontSize: '1.1rem',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: '#8B0000',
        color: 'white',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(139, 0, 0, 0.2)',
      },
    },
    forgotPassword: {
      textAlign: 'right',
      marginTop: '-1rem',
    },
    forgotPasswordLink: {
      color: '#666',
      textDecoration: 'none',
      fontSize: '0.95rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      '&:hover': {
        color: '#8B0000',
        textDecoration: 'underline',
      },
    },
    '@media (max-width: 768px)': {
      formContainer: {
        padding: '2rem',
        margin: '1rem',
      },
      title: {
        fontSize: '2.2rem',
      },
      subtitle: {
        fontSize: '1rem',
      },
      input: {
        padding: '1rem',
      },
      button: {
        padding: '1rem',
      },
    },
    '@media (max-width: 480px)': {
      formContainer: {
        padding: '1.5rem',
      },
      title: {
        fontSize: '2rem',
      },
      signupButton: {
        width: '100%',
        textAlign: 'center',
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to continue to your account</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>

          <div style={styles.forgotPassword}>
            <Link 
              to="/forgot-password" 
              style={styles.forgotPasswordLink}
              onClick={(e) => isLoading && e.preventDefault()}
            >
              Forgot Password?
            </Link>
          </div>

          {errors.submit && <span style={styles.error}>{errors.submit}</span>}

          <button 
            type="submit" 
            style={{
              ...styles.button,
              background: isLoading ? '#cccccc' : '#8B0000',
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={styles.signupContainer}>
          <p style={styles.signupText}>Don't have an account?</p>
          <Link 
            to="/signup" 
            style={styles.signupButton}
            onClick={(e) => isLoading && e.preventDefault()}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
