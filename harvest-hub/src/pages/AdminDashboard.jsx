import { useState } from "react";
import { Link } from "react-router-dom";   // ✅ Add this
import ProductManager from "../components/admin/ProductManager";

export default function AdminDashboard() {
  const [tab, setTab] = useState("products");

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white p-5 shadow-lg">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-3">
          <button
            className={`w-full text-left p-2 rounded ${
              tab === "products"
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setTab("products")}
          >
            Products
          </button>

          {/* ✅ Link to Orders page */}
          <Link
            to="/admin/orders"
            className="block w-full text-left p-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Orders
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {tab === "products" && <ProductManager />}
      </main>
    </div>
  );
}
