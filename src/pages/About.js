import React from 'react';

const About = () => {
  // Define darker gradients
  const gradients = {
    primary: 'linear-gradient(135deg, #8B0000 0%, #c72032 100%)',
    secondary: 'linear-gradient(135deg, #c72032 0%, #8B0000 100%)',
    accent: 'linear-gradient(135deg, #590000 0%, #8B0000 100%)',
    light: 'linear-gradient(135deg, #c72032 0%, #871d1d 100%)',
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 2rem',
      background: 'linear-gradient(to bottom, #ffffff, #fff5f5)',
    },
    hero: {
      textAlign: 'center',
      marginBottom: '4rem',
      padding: '3rem',
      background: gradients.primary,
      borderRadius: '20px',
      color: 'white',
      boxShadow: '0 10px 30px rgba(139, 0, 0, 0.3)',
    },
    title: {
      fontSize: '2.8rem',
      fontWeight: '800',
      marginBottom: '1.5rem',
      color: 'white',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#ffffff',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: '1.8',
      opacity: '0.9',
    },
    section: {
      marginBottom: '4rem',
    },
    sectionTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '2rem',
      textAlign: 'center',
      position: 'relative',
      '&::after': {
        content: '""',
        display: 'block',
        width: '60px',
        height: '3px',
        background: gradients.primary,
        margin: '1rem auto',
      },
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '2rem',
    },
    card: {
      background: 'white',
      borderRadius: '15px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(199, 32, 50, 0.1)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: gradients.primary,
      },
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      background: gradients.primary,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '1rem',
      paddingBottom: '0.5rem',
      borderBottom: '2px solid #f0f0f0',
    },
    cardText: {
      color: '#555',
      lineHeight: '1.7',
      fontSize: '1.1rem',
    },
    values: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginTop: '2rem',
    },
    valueCard: {
      textAlign: 'center',
      padding: '2.5rem',
      background: 'white',
      borderRadius: '15px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
      border: '1px solid rgba(199, 32, 50, 0.1)',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 25px rgba(199, 32, 50, 0.2)',
        '&::before': {
          height: '100%',
          opacity: '0.1',
        },
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '0%',
        background: gradients.primary,
        transition: 'all 0.3s ease',
        opacity: '0',
      },
    },
    valueIcon: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      background: gradients.primary,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block',
      position: 'relative',
      zIndex: '1',
    },
    valueTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '0.8rem',
      position: 'relative',
      zIndex: '1',
    },
    valueText: {
      color: '#666',
      lineHeight: '1.6',
      position: 'relative',
      zIndex: '1',
    },
    team: {
      marginTop: '4rem',
      background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)',
      padding: '3rem',
      borderRadius: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    },
    highlight: {
      background: gradients.primary,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: '600',
    },
    button: {
      background: gradients.primary,
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '25px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      '&:hover': {
        background: gradients.accent,
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(199, 32, 50, 0.3)',
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>About The KD Company</h1>
        <p style={styles.subtitle}>
          We are passionate about creating beautiful, custom-designed posters that bring your vision to life. 
          With years of experience and dedication to quality, we've become a trusted name in custom poster design.
        </p>
      </div>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Story</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Our Beginning</h3>
            <p style={styles.cardText}>
              Founded in 2020, <span style={styles.highlight}>The KD Company</span> started with a simple mission: to make high-quality custom posters accessible to everyone. 
              What began as a small design studio has grown into a trusted platform for custom poster design.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Our Growth</h3>
            <p style={styles.cardText}>
              Over the years, we've expanded our services and capabilities, always staying true to our commitment to quality and customer satisfaction. 
              Today, we serve customers worldwide with our <span style={styles.highlight}>unique designs</span>.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Our Future</h3>
            <p style={styles.cardText}>
              We continue to innovate and grow, exploring new design techniques and technologies to bring you the best custom poster experience possible. 
              Our journey is just beginning.
            </p>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Values</h2>
        <div style={styles.values}>
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>★</div>
            <h3 style={styles.valueTitle}>Quality</h3>
            <p style={styles.valueText}>We never compromise on the quality of our products and services.</p>
          </div>
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>♥</div>
            <h3 style={styles.valueTitle}>Customer Focus</h3>
            <p style={styles.valueText}>Your satisfaction is our top priority in everything we do.</p>
          </div>
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>✦</div>
            <h3 style={styles.valueTitle}>Innovation</h3>
            <p style={styles.valueText}>We constantly explore new ways to improve and innovate.</p>
          </div>
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>⟐</div>
            <h3 style={styles.valueTitle}>Integrity</h3>
            <p style={styles.valueText}>We conduct our business with honesty and transparency.</p>
          </div>
        </div>
      </section>

      <section style={styles.team}>
        <h2 style={styles.sectionTitle}>Why Choose Us</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Expert Design Team</h3>
            <p style={styles.cardText}>
              Our team of experienced designers brings creativity and expertise to every project.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Custom Solutions</h3>
            <p style={styles.cardText}>
              We create unique designs tailored to your specific needs and preferences.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Quality Materials</h3>
            <p style={styles.cardText}>
              We use only the highest quality materials to ensure your posters look amazing and last long.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;