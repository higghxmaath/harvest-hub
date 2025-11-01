import React from "react";
import CartItem from "./CartItem";

function Cart({ items, onIncrease, onDecrease, onRemove, onClose, onCheckout }){

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-content" onClick={(e) => e.stopPropagation()}>
        <h2>Your Cart</h2>

        {items.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => onIncrease(item.id)}
              onDecrease={() => onDecrease(item.id)}
              onRemove={() => onRemove(item.id)}
            />
          ))
        )}

        <h3>Total: ₦{total}</h3>
        <button onClick={onClose}>Close Cart</button>
        <button onClick={() => {
  onClose();
  onCheckout();
}} className="add-btn">Checkout</button>

      </div>
    </div>
  );
}

export default Cart;
