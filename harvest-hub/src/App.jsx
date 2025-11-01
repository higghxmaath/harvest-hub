import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminOrders from "./pages/AdminOrders"

export default function App() {
  return (
    <Routes>

      {/* Public Shop Route */}
      <Route path="/" element={<Home />} />

      {/* Admin Login */}
      <Route path="/admin-login" element={<AdminLogin />} />

      <Route path="/admin/orders" element={<AdminOrders />} />


      {/* Protected Admin Dashboard */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      }/>

    </Routes>
  );
}
