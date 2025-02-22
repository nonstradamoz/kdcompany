import React, { useState } from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f6f9fc, #e9ecef);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #3498db, #2ecc71, #e74c3c);
  }

  h2 {
    text-align: center;
    color: #2c3e50;
    font-size: 3.2rem;
    font-weight: 800;
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    animation: fadeIn 1.5s ease-in-out;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: #3498db;
      margin: 15px auto;
      border-radius: 2px;
    }
  }

  form {
    background: #fff;
    padding: 3rem;
    border-radius: 20px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    transition: all 0.3s ease-in-out;
    position: relative;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    }

    input, textarea {
      padding: 15px;
      font-size: 1.1rem;
      border-radius: 12px;
      border: 2px solid #eef2f7;
      outline: none;
      background: #f8fafc;
      transition: all 0.3s ease-in-out;

      &:focus {
        background: #fff;
        border-color: #3498db;
        box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.1);
      }

      &::placeholder {
        color: #94a3b8;
        font-weight: 500;
      }
    }

    textarea {
      min-height: 150px;
      resize: vertical;
    }

    button {
      padding: 16px;
      font-size: 1.2rem;
      font-weight: 600;
      background: linear-gradient(135deg, #3498db, #2980b9);
      color: white;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.2),
          transparent
        );
        transition: 0.5s;
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
        
        &::before {
          left: 100%;
        }
      }

      &:active {
        transform: translateY(0);
      }
    }
  }

  .contact-info {
    margin-top: 3rem;
    text-align: center;
    background: rgba(255, 255, 255, 0.9);
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(10px);

    h3 {
      font-size: 2rem;
      color: #2c3e50;
      margin-bottom: 1.5rem;
      font-weight: 700;
    }

    p {
      margin: 12px 0;
      color: #4a5568;
      font-size: 1.15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      svg {
        color: #3498db;
      }
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    
    h2 {
      font-size: 2.4rem;
      margin-bottom: 2rem;
    }

    form {
      padding: 2rem;
    }

    input[type="file"],
    input,
    textarea,
    button {
      font-size: 1rem;
      padding: 12px;
    }

    .contact-info {
      padding: 1.5rem;
      
      h3 {
        font-size: 1.8rem;
      }

      p {
        font-size: 1rem;
      }
    }
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to an API)
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <ContactContainer>
      <h2>Get in Touch</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="How can we help you? Tell us about your project..."
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Message →</button>
      </form>

      <div className="contact-info">
        <h3>Contact Information</h3>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          theretrokd@gmail.com
        </p>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          +91-9074812182
        </p>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          123 Your Street, Your City, Your State, Your Country
        </p>
      </div>
    </ContactContainer>
  );
};

export default Contact;