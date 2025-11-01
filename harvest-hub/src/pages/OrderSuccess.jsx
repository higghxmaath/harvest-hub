import React from "react";
import "./success.css";

function OrderSuccess({ onContinue }) {
  return (
    <div className="success-page">
      <div className="success-box">
        <h2>✅ Order Placed Successfully!</h2>
        <p>Thank you for your order. We will contact you soon.</p>

        <button className="success-btn" onClick={onContinue}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
