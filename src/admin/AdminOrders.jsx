import { useEffect, useState } from "react";
import { api } from "../services/api";
import { money } from "../utils/format";
const statuses = ["pending", "processing", "shipped", "completed", "cancelled"];
export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    api.admin.orders().then((d) => setOrders(d.data));
  }, []);
  const change = async (id, status) => {
    const d = await api.admin.updateOrder(id, status);
    setOrders((xs) => xs.map((o) => (o.id === id ? d.data : o)));
  };
  return (
    <section className="admin-content">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">FULFILLMENT</span>
          <h1>Orders</h1>
          <p>Review every order and update its fulfillment status.</p>
        </div>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length ? (
              orders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <strong>{o.number}</strong>
                  </td>
                  <td>
                    {o.customer_name}
                    <br />
                    <small>{o.customer_email}</small>
                  </td>
                  <td>{new Date(o.created_at).toLocaleDateString()}</td>
                  <td>{money(o.total)}</td>
                  <td>
                    <select
                      className={`status-select ${o.status}`}
                      value={o.status}
                      onChange={(e) => change(o.id, e.target.value)}
                    >
                      {statuses.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <div className="admin-empty">No orders yet.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
