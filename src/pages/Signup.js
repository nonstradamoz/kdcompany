import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
      maxWidth: '600px',
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
    nameFields: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.5rem',
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
    },
    focusedInput: {
      outline: 'none',
      borderColor: '#8B0000',
      boxShadow: '0 0 0 4px rgba(139, 0, 0, 0.1)',
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
    },
    buttonHover: {
      background: '#660000',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(139, 0, 0, 0.3)',
    },
    buttonDisabled: {
      background: '#ccc',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },
    loginContainer: {
      marginTop: '2.5rem',
      padding: '2rem 0 0',
      borderTop: '2px solid #f0f0f0',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
    },
    loginText: {
      fontSize: '1.1rem',
      color: '#666',
    },
    loginLink: {
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
    },
    loginLinkHover: {
      background: '#8B0000',
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(139, 0, 0, 0.2)',
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
      nameFields: {
        gridTemplateColumns: '1fr',
        gap: '1rem',
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
      loginLink: {
        width: '100%',
        textAlign: 'center',
      },
    },
  };

  const [hoveredElements, setHoveredElements] = useState({
    button: false,
    loginLink: false,
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/login');
    } catch (error) {
      setErrors({ submit: 'Failed to create account. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join us and start your journey today</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.nameFields}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => e.target.style = {...styles.input, ...styles.focusedInput}}
                onBlur={(e) => e.target.style = styles.input}
                placeholder="Enter your first name"
                disabled={isLoading}
              />
              {errors.firstName && <span style={styles.error}>{errors.firstName}</span>}
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => e.target.style = {...styles.input, ...styles.focusedInput}}
                onBlur={(e) => e.target.style = styles.input}
                placeholder="Enter your last name"
                disabled={isLoading}
              />
              {errors.lastName && <span style={styles.error}>{errors.lastName}</span>}
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.focusedInput}}
              onBlur={(e) => e.target.style = styles.input}
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
              onFocus={(e) => e.target.style = {...styles.input, ...styles.focusedInput}}
              onBlur={(e) => e.target.style = styles.input}
              placeholder="Create a password"
              disabled={isLoading}
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.focusedInput}}
              onBlur={(e) => e.target.style = styles.input}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
          </div>

          {errors.submit && <span style={styles.error}>{errors.submit}</span>}

          <button 
            type="submit" 
            style={{
              ...styles.button,
              ...(hoveredElements.button ? styles.buttonHover : {}),
              ...(isLoading ? styles.buttonDisabled : {}),
            }}
            onMouseEnter={() => setHoveredElements(prev => ({...prev, button: true}))}
            onMouseLeave={() => setHoveredElements(prev => ({...prev, button: false}))}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={styles.loginContainer}>
          <p style={styles.loginText}>Already have an account?</p>
          <Link 
            to="/login" 
            style={{
              ...styles.loginLink,
              ...(hoveredElements.loginLink ? styles.loginLinkHover : {}),
            }}
            onMouseEnter={() => setHoveredElements(prev => ({...prev, loginLink: true}))}
            onMouseLeave={() => setHoveredElements(prev => ({...prev, loginLink: false}))}
            onClick={(e) => isLoading && e.preventDefault()}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup; 