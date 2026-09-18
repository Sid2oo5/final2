import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (costString) => {
    return parseFloat(costString.replace('$', '')) || 0;
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0).toFixed(2);
  };

  const calculateTotalCost = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Shopping Cart</h2>
      <h3 className="total-amount">Total Cart Amount: ${calculateTotalAmount()}</h3>

      {cart.length === 0 ? (
        <p className="empty-cart">Your shopping cart is empty.</p>
      ) : (
        <div className="cart-items-list">
          {cart.map((item, index) => (
            <div key={index} className="cart-card">
              <img src={item.image} alt={item.name} className="cart-card-img" />
              <div className="cart-card-details">
                <h3>{item.name}</h3>
                <p>Unit Price: {item.cost}</p>
                <div className="qty-picker">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <p className="subtotal">Subtotal: ${calculateTotalCost(item)}</p>
                <button className="delete-btn" onClick={() => handleRemove(item.name)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-controls">
        <button className="action-btn continue-btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="action-btn checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;