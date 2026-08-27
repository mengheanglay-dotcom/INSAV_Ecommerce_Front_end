import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminOverview from "./AdminOverview";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";
import AdminSettings from "./AdminSettings";
export default function AdminApp() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
