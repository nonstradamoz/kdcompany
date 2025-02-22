import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      console.log('Loading initial cart:', savedCart);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  });

  // Calculate total quantity of items in cart
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      console.log('Updated cart items:', cartItems);
      console.log('Current cart count:', cartCount);
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems, cartCount]);

  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
        console.log('Updated cart after quantity increase:', updatedItems);
        return updatedItems;
      }
      
      const newItems = [...prevItems, { ...product, quantity: 1 }];
      console.log('Updated cart after new item:', newItems);
      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    if (!productId) return;
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
      console.log('Updated cart after remove:', updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (!productId || newQuantity < 1) return;
    
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      console.log('Updated cart after quantity change:', updatedItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    console.log('Cart cleared');
  };

  const value = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  console.log('CartContext value:', value);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart Component
const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  
  const totalPrice = cartItems.reduce((total, item) => {
    return total + ((item.price || 0) * (item.quantity || 1));
  }, 0);

  console.log('Cart component rendering with items:', cartItems);

  const styles = {
    pageContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)',
      padding: '2rem 1rem',
    },
    cartContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
    },
    header: {
      background: 'linear-gradient(135deg,rgb(168, 5, 5),rgb(117, 31, 31))',
      color: 'white',
      padding: '2rem',
      fontSize: '1.8rem',
      fontWeight: '600',
      textAlign: 'center',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    content: {
      padding: '2rem',
    },
    cartItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem',
      margin: '1rem 0',
      backgroundColor: '#fff',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.02)',
      transition: 'transform 0.2s ease',
    },
    productInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flex: '1',
    },
    productImage: {
      width: '80px',
      height: '80px',
      objectFit: 'cover',
      borderRadius: '10px',
    },
    productName: {
      fontSize: '1.1rem',
      fontWeight: '500',
      color: '#2d3436',
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      margin: '0 2rem',
    },
    quantityButton: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#f1f2f6',
      color: '#2d3436',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    quantity: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      fontWeight: '500',
    },
    price: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#2193b0',
      minWidth: '100px',
      textAlign: 'right',
    },
    removeButton: {
      padding: '0.6rem 1.2rem',
      backgroundColor: '#ff7675',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginLeft: '1rem',
    },
    summary: {
      marginTop: '2rem',
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '15px',
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 0',
    },
    totalLabel: {
      fontSize: '1.2rem',
      color: '#2d3436',
    },
    totalAmount: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#2193b0',
    },
    checkoutButton: {
      width: '100%',
      padding: '1rem',
      marginTop: '1rem',
      backgroundColor: '#00b894',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    emptyCart: {
      textAlign: 'center',
      padding: '4rem 2rem',
      color: '#636e72',
      fontSize: '1.2rem',
    },
    '@media (max-width: 768px)': {
      cartItem: {
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '1rem',
      },
      productInfo: {
        flexDirection: 'column',
        textAlign: 'center',
      },
      quantityControls: {
        justifyContent: 'center',
        margin: '1rem 0',
      },
      price: {
        textAlign: 'center',
      },
      removeButton: {
        width: '100%',
        marginLeft: 0,
      },
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.cartContainer}>
        <div style={styles.header}>Shopping Cart</div>
        <div style={styles.content}>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <div style={styles.productInfo}>
                    {item.image && (
                      <img src={item.image} alt={item.name} style={styles.productImage} />
                    )}
                    <span style={styles.productName}>{item.name}</span>
                  </div>
                  
                  <div style={styles.quantityControls}>
                    <button 
                      style={styles.quantityButton}
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    >
                      -
                    </button>
                    <span style={styles.quantity}>{item.quantity || 1}</span>
                    <button 
                      style={styles.quantityButton}
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <span style={styles.price}>
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </span>
                  
                  <button
                    style={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <div style={styles.summary}>
                <div style={styles.summaryRow}>
                  <span style={styles.totalLabel}>Total</span>
                  <span style={styles.totalAmount}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button style={styles.checkoutButton}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          ) : (
            <div style={styles.emptyCart}>
              Your cart is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;