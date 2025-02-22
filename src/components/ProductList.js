import React from 'react';
import Product from './Product';
import styled from 'styled-components';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
`;

const ProductList = ({ products, deleteProduct }) => {
  if (!products || products.length === 0) {
    return <h3 style={{ textAlign: 'center' }}>No products found</h3>;
  }

  return (
    <ProductGrid>
      {products.map((product) => (
        <Product key={product.id} product={product} deleteProduct={deleteProduct} />
      ))}
    </ProductGrid>
  );
};

export default ProductList;
