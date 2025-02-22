import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useCart } from './Cart'; // Import useCart hook

// Import existing product images
import poster1Image from '../assets/bmw-m-party-web-6656-1633454533.jpg.avif';
import poster2Image from '../assets/p_02.png';
import tshirt1Image from '../assets/p_03.png';
import sticker1Image from '../assets/p_01.png';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Existing products data
const existingProducts = [
  { 
    id: '1', 
    name: 'Limited Edition BMW Poster', 
    description: 'High-quality premium print featuring exclusive BMW artwork.', 
    price: 29.99, 
    image: poster1Image,  
    category: 'Posters',
    tag: 'Limited Edition' 
  },
  { 
    id: '2', 
    name: 'Premium Car Sticker Pack', 
    description: 'Collection of high-quality vinyl stickers for automotive enthusiasts.', 
    price: 15.99, 
    image: sticker1Image,  
    category: 'Stickers',
    tag: 'Best Seller'
  },
  { 
    id: '3', 
    name: 'Vintage Racing Poster', 
    description: 'Classic racing-inspired design printed on premium paper.', 
    price: 34.99, 
    image: poster2Image,  
    category: 'Posters',
    tag: 'New Arrival'
  },
  { 
    id: '4', 
    name: 'Car Enthusiast T-Shirt', 
    description: 'Premium cotton t-shirt with exclusive automotive design.', 
    price: 24.99, 
    image: tshirt1Image,  
    category: 'T-Shirts',
    tag: 'Popular'
  },
];

// Styled Components
const ProductsContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc, #e9ecef);
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.6s ease-out;

  h1 {
    font-size: 2.8rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    font-weight: 800;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 4px;
      background: linear-gradient(135deg, #c72032, #871d1d);
      margin: 1rem auto;
      border-radius: 2px;
    }
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.6s ease-out;
  padding: 0 1rem;
`;

const FilterButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: ${props => props.active ? 
    'linear-gradient(135deg, #c72032, #871d1d)' : 
    'white'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: ${props => !props.active && '#f8f9fa'};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  background: linear-gradient(to top, white 90%, transparent);
`;

const ProductName = styled.h3`
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 0.8rem;
  font-weight: 700;
`;

const ProductCategory = styled.span`
  display: inline-block;
  padding: 0.4rem 1rem;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ProductDescription = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ProductPrice = styled.div`
  font-size: 1.4rem;
  color: #c72032;
  font-weight: 700;
  margin-bottom: 1rem;

  &::before {
    content: '$';
    font-size: 1rem;
    opacity: 0.8;
  }
`;

const ProductTag = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #c72032, #871d1d);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 1;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(135deg, #c72032, #871d1d);
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #871d1d, #c72032);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(199, 32, 50, 0.3);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const NoProducts = styled.div`
  text-align: center;
  padding: 2rem;
  color: #64748b;
  font-size: 1.2rem;
  grid-column: 1 / -1;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState(['all']);
  const { addToCart } = useCart(); // Use the cart context

  useEffect(() => {
    // Load admin-added products from localStorage
    const adminProducts = JSON.parse(localStorage.getItem('products')) || [];
    
    // Combine existing products with admin-added products
    const allProducts = [
      ...existingProducts.map(product => ({
        ...product,
        imageData: product.image // Use image property for existing products
      })),
      ...adminProducts // Admin products already have imageData property
    ];
    
    setProducts(allProducts);

    // Extract unique categories from all products
    const productCategories = allProducts.map(product => product.category);
    const uniqueCategories = ['all', ...new Set(productCategories)];
    setCategories(uniqueCategories);
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    console.log('Handling add to cart:', product);
    if (!product.id || !product.name || !product.price) {
      console.error('Invalid product data:', product);
      return;
    }

    const productToAdd = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image || '',
      quantity: 1
    };

    addToCart(productToAdd);
  };

  return (
    <ProductsContainer>
      <Header>
        <h1>Our Products</h1>
      </Header>

      <CategoryFilter>
        {categories.map(category => (
          <FilterButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </FilterButton>
        ))}
      </CategoryFilter>

      <ProductGrid>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id}>
              {product.tag && <ProductTag>{product.tag}</ProductTag>}
              <ProductImage 
                src={product.imageData || product.image} 
                alt={product.name} 
              />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductCategory>{product.category}</ProductCategory>
                {product.description && (
                  <ProductDescription>{product.description}</ProductDescription>
                )}
                <ProductPrice>${parseFloat(product.price).toFixed(2)}</ProductPrice>
                <AddToCartButton onClick={() => handleAddToCart(product)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 20a1 1 0 100-2 1 1 0 000 2z" />
                    <path d="M20 20a1 1 0 100-2 1 1 0 000 2z" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                  </svg>
                  Add to Cart
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))
        ) : (
          <NoProducts>
            No products found in this category.
          </NoProducts>
        )}
      </ProductGrid>
    </ProductsContainer>
  );
};

export default Products;