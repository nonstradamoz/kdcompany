
// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import ProductList from '../components/ProductList';
// import styled from 'styled-components';

// // Importing images
// import poster1Image from '/Users/dileeppillai/Documents/sem/kdcompany/thekdcompany/src/assets/images/p_01.png';
// import poster2Image from '/Users/dileeppillai/Documents/sem/kdcompany/thekdcompany/src/assets/images/p_02.png';
// import tshirt1Image from '/Users/dileeppillai/Documents/sem/kdcompany/thekdcompany/src/assets/images/p_03.png';
// import sticker1Image from '/Users/dileeppillai/Documents/sem/kdcompany/thekdcompany/src/assets/bmw-m-party-web-6656-1633454533.jpg.avif';

// const productsData = [
//   { id: '1', name: 'Poster 1', description: 'Aesthetic poster.', price: 29.99, image: poster1Image, category: 'posters' },
//   { id: '2', name: 'Poster 2', description: 'Aesthetic poster.', price: 29.99, image: poster2Image, category: 'posters' },
//   { id: '3', name: 'T-Shirt 1', description: 'Stylish T-shirt.', price: 19.99, image: tshirt1Image, category: 'tshirts' },
//   { id: '4', name: 'Sticker 1', description: 'Cool sticker.', price: 5.99, image: sticker1Image, category: 'stickers' }
// ];

// const ProductsContainer = styled.div`
//   padding: 2rem;
//   background: #f9f9f9;
//   min-height: 80vh;
// `;

// const CategoryFilter = styled.div`
//   text-align: center;
//   margin-bottom: 1rem;

//   button {
//     margin: 0 5px;
//     padding: 10px 15px;
//     border: none;
//     border-radius: 5px;
//     background-color: #007bff;
//     color: white;
//     cursor: pointer;

//     &:hover {
//       background-color: #0056b3;
//     }
//   }
// `;

// const Products = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const categoryParam = searchParams.get('category') || 'all';
//   const [selectedCategory, setSelectedCategory] = useState(categoryParam);

//   useEffect(() => {
//     setSelectedCategory(categoryParam);
//   }, [categoryParam]);

//   const handleCategoryChange = (category) => {
//     setSearchParams({ category });
//   };

//   const filteredProducts = selectedCategory === 'all'
//     ? productsData
//     : productsData.filter((product) => product.category === selectedCategory);

//   return (
//     <ProductsContainer>
//       <h2>Our Products</h2>
//       <CategoryFilter>
//         <button onClick={() => handleCategoryChange('all')}>All</button>
//         <button onClick={() => handleCategoryChange('posters')}>Posters</button>
//         <button onClick={() => handleCategoryChange('tshirts')}>T-Shirts</button>
//         <button onClick={() => handleCategoryChange('stickers')}>Stickers</button>
//       </CategoryFilter>
//       <ProductList products={filteredProducts} />
//     </ProductsContainer>
//   );
// };

// export default Products;




import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import styled from "styled-components";

// Importing images
import poster1Image from '/Users/dileeppillai/Documents/sem/kdcompany/thekdcompany/src/assets/images/p_01.png';
import poster2Image from '/Users/dileeppillai/Documents/sem/kdcompany/thekdcompany/src/assets/images/p_02.png';
import tshirt1Image from '/Users/dileeppillai/Documents/sem/kdcompany/thekdcompany/src/assets/images/p_03.png';
import sticker1Image from '/Users/dileeppillai/Documents/sem/kdcompany/thekdcompany/src/assets/bmw-m-party-web-6656-1633454533.jpg.avif';

const productsData = [
  { id: "1", name: "Poster 1", description: "Aesthetic poster.", price: 29.99, image: poster1Image, category: "posters" },
  { id: "2", name: "Poster 2", description: "Aesthetic poster.", price: 29.99, image: poster2Image, category: "posters" },
  { id: "3", name: "T-Shirt 1", description: "Stylish T-shirt.", price: 19.99, image: tshirt1Image, category: "tshirts" },
  { id: "4", name: "Sticker 1", description: "Cool sticker.", price: 5.99, image: sticker1Image, category: "stickers" }
];

const ProductsContainer = styled.div`
  padding: 2rem;
  background: #f9f9f9;
  min-height: 80vh;
`;

const CategoryFilter = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  button {
    margin: 0 5px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract category from URL
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category") || "all";

  // Filter products based on category
  const filteredProducts =
    categoryParam === "all"
      ? productsData
      : productsData.filter((product) => product.category === categoryParam);

  return (
    <ProductsContainer>
      <h2>Our Products</h2>
      <CategoryFilter>
        <button onClick={() => navigate("/products?category=all")}>All</button>
        <button onClick={() => navigate("/products?category=posters")}>Posters</button>
        <button onClick={() => navigate("/products?category=tshirts")}>T-Shirts</button>
        <button onClick={() => navigate("/products?category=stickers")}>Stickers</button>
      </CategoryFilter>
      <ProductList products={filteredProducts} />
    </ProductsContainer>
  );
};

export default Products;
