import { Link, useLocation } from "react-router-dom";
import { money } from "../utils/format";
export default function Success() {
  const { state } = useLocation();
  const order = state?.order;
  return (
    <section className="page-section success-page">
      <div className="success-card">
        <div className="success-check">✓</div>
        <span className="eyebrow">ORDER CONFIRMED</span>
        <h1>Thank you for your order.</h1>
        <p>We’ve received your order and will prepare it for delivery.</p>
        {order && (
          <div className="order-meta">
            <div>
              <span>Order number</span>
              <strong>{order.number}</strong>
            </div>
            <div>
              <span>Total</span>
              <strong>{money(order.total)}</strong>
            </div>
          </div>
        )}
        <Link to="/products" className="btn btn-dark">
          Continue shopping →
        </Link>
      </div>
    </section>
  );
}
