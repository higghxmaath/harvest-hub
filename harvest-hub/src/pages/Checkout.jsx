import { useState } from "react";

function Checkout({ cartItems, onSubmitOrder, onBack }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    delivery: "pickup"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      alert("Please fill required fields");
      return;
    }
    onSubmitOrder(form);
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <label>Full Name*</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Phone Number*</label>
        <input name="phone" value={form.phone} onChange={handleChange} required />

        <label>Address</label>
        <textarea name="address" value={form.address} onChange={handleChange} />

        <label>Delivery Option</label>
        <select name="delivery" value={form.delivery} onChange={handleChange}>
          <option value="pickup">Pickup</option>
          <option value="delivery">Home Delivery</option>
        </select>

        <h3>Total: ₦{total}</h3>

        <button type="submit" className="add-btn">Place Order</button>
        <button type="button" className="add-btn" onClick={onBack}>Back</button>
      </form>
    </div>
  );
}

export default Checkout;
