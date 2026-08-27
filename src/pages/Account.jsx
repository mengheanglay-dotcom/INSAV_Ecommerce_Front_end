import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { api } from "../services/api";
import { money } from "../utils/format";
export default function Account() {
  const { user, logout } = useShop();
  const nav = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) api.orders().then((d) => setOrders(d.data));
  }, [user]);
  if (!user)
    return (
      <section className="page-section">
        <div className="empty-state">
          <span className="eyebrow">MY ACCOUNT</span>
          <h1>Sign in to continue.</h1>
          <Link to="/login" className="btn btn-dark">
            Sign in →
          </Link>
        </div>
      </section>
    );
  return (
    <section className="page-section account-page">
      <div className="account-head">
        <div>
          <span className="eyebrow">MY ACCOUNT</span>
          <h1>Hello, {user.name.split(" ")[0]}.</h1>
          <p>{user.email}</p>
        </div>
        {user.role === "admin" && (
          <Link className="btn btn-dark" to="/admin">
            Dashboard →
          </Link>
        )}
        <button
          className="btn btn-outline"
          onClick={async () => {
            await logout();
            nav("/");
          }}
        >
          Log out
        </button>
      </div>
      <div className="orders-box">
        <div className="section-heading">
          <div>
            <span className="eyebrow">HISTORY</span>
            <h2>Your orders</h2>
          </div>
        </div>
        {orders.length ? (
          orders.map((o) => (
            <div className="order-row" key={o.number}>
              <div>
                <strong>{o.number}</strong>
                <span>{new Date(o.created_at).toLocaleDateString()}</span>
              </div>
              <strong>{money(o.total)}</strong>
            </div>
          ))
        ) : (
          <div className="empty-small">
            No orders yet. <Link to="/products">Start shopping →</Link>
          </div>
        )}
      </div>
    </section>
  );
}
