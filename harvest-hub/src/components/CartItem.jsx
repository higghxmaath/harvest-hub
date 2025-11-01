import React from "react";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <h4>{item.name}</h4>
      <p>₦{item.price}</p>

      <div className="qty-controls">
        <button onClick={onDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </div>

      <button className="remove-btn" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;
