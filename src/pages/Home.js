import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

// Import your images with relative paths
import design1 from '/Users/dileeppillai/Documents/sem/kdcompany/thekdcompany/src/assets/p_01.png';
import design2 from '/Users/dileeppillai/Documents/sem/kdcompany/thekdcompany/src/assets/p_02.png';
import design3 from '/Users/dileeppillai/Documents/sem/kdcompany/thekdcompany/src/assets/p_03.png';
import product1 from '/Users/dileeppillai/Documents/sem/kdcompany/thekdcompany/src/assets/bmw-m-party-web-6656-1633454533.jpg.avif';

import heroBg from '/Users/dileeppillai/Documents/sem/kdcompany/thekdcompany/src/assets/p_01.png'; // Add a hero background image

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const HomeContainer = styled.div`
  min-height: 100vh;
  overflow: hidden;
`;

const HeroSection = styled.section`
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
              url(${heroBg}) no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 20px;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  animation: ${fadeIn} 1s ease-out;
`;

const MainTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 20px rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #c72032, #871d1d);
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(199, 32, 50, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(199, 32, 50, 0.4);
  }
`;

const Section = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.dark ? '#f8f9fa' : 'white'};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #c72032;
    margin: 1rem auto;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const CardButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: #c72032;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  transition: all 0.3s ease;

  &:hover {
    background: #871d1d;
    transform: translateY(-2px);
  }
`;

const Price = styled.p`
  font-size: 1.25rem;
  color: #c72032;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Home = () => {
  const designs = [
    { id: 1, name: 'Premium Design Collection', image: design1, description: 'Exclusive handcrafted designs' },
    { id: 2, name: 'Modern Art Series', image: design2, description: 'Contemporary artistic expressions' },
    { id: 3, name: 'Custom Creations', image: design3, description: 'Personalized design solutions' },
  ];

  const products = [
    { 
      id: 1, 
      name: 'Limited Edition Print', 
      image: product1, 
      price: 199.99,
      description: 'High-quality premium print'
    },
    // Add more products as needed
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <MainTitle>Welcome to The KD Company</MainTitle>
          <SubTitle>
            Discover our exclusive collection of premium designs and custom solutions
          </SubTitle>
          <CTAButton to="/products">Explore Collection</CTAButton>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>Featured Designs</SectionTitle>
        <Grid>
          {designs.map((design) => (
            <Card key={design.id}>
              <CardImage src={design.image} alt={design.name} />
              <CardContent>
                <CardTitle>{design.name}</CardTitle>
                <p>{design.description}</p>
                <CardButton to={`/designs/${design.id}`}>View Details</CardButton>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section dark>
        <SectionTitle>Featured Products</SectionTitle>
        <Grid>
          {products.map((product) => (
            <Card key={product.id}>
              <CardImage src={product.image} alt={product.name} />
              <CardContent>
                <CardTitle>{product.name}</CardTitle>
                <Price>${product.price.toFixed(2)}</Price>
                <p>{product.description}</p>
                <CardButton to={`/products/${product.id}`}>Shop Now</CardButton>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Section>
    </HomeContainer>
  );
};

export default Home;