import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>ID</th>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Price</th>
          <th style={styles.th}>Stock</th>
          <th style={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td style={styles.td}>{product.id}</td>
            <td style={styles.td}>{product.name}</td>
            <td style={styles.td}>${product.price.toFixed(2)}</td>
            <td style={styles.td}>{product.stock}</td>
            <td style={styles.td}>
              <button
                style={styles.actionButton}
                onClick={() => onEdit(product.id)}
              >
                Edit
              </button>
              <button
                style={styles.actionButton}
                onClick={() => onDelete(product.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  },
  th: {
    background: '#c72032',
    color: 'white',
    padding: '1rem',
    textAlign: 'left',
  },
  td: {
    padding: '1rem',
    borderBottom: '1px solid #ddd',
  },
  actionButton: {
    padding: '0.5rem 1rem',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '0.5rem',
  },
};

export default ProductTable;