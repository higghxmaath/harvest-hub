import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-xl font-bold mb-4">Customer Orders</h2>

      {orders.length === 0 && <p>No orders yet...</p>}

      {orders.map((order) => (
        <div key={order.id} className="border rounded p-4 mb-4 bg-white shadow">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          
          <h3 className="font-semibold mt-2">Customer Info</h3>
          <p>Name: {order.customer?.name}</p>
          <p>Phone: {order.customer?.phone}</p>
          <p>Address: {order.customer?.address}</p>
          <p>Delivery: {order.delivery}</p>

          <h3 className="font-semibold mt-3">Items</h3>
          <ul className="ml-4 list-disc">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.name} — {item.quantity} × ₦{item.price}
              </li>
            ))}
          </ul>

          <p className="mt-2"><strong>Total: ₦{order.total}</strong></p>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
