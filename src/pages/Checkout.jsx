import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { api } from "../services/api";
import { money } from "../utils/format";
export default function Checkout() {
  const { cart } = useShop();
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (!cart.items.length)
    return (
      <section className="page-section">
        <div className="empty-state">
          <h1>Your cart is empty.</h1>
          <Link to="/products" className="btn btn-dark">
            Shop now →
          </Link>
        </div>
      </section>
    );
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const d = await api.placeOrder(form);
      nav("/checkout/success", { state: { order: d.order } });
    } catch (err) {
      setError(Object.values(err.errors || {}).flat()[0] || err.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="page-section checkout-page">
      <div className="page-title">
        <span className="eyebrow">CHECKOUT</span>
        <h1>Complete your order</h1>
      </div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submit}>
          <div className="form-section">
            <h3>Contact information</h3>
            <div className="field-grid">
              <label>
                Full name
                <input
                  name="name"
                  value={form.name}
                  onChange={change}
                  required
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={change}
                  required
                />
              </label>
              <label>
                Phone
                <input
                  name="phone"
                  value={form.phone}
                  onChange={change}
                  required
                />
              </label>
            </div>
          </div>
          <div className="form-section">
            <h3>Delivery address</h3>
            <label>
              Address
              <input
                name="address"
                value={form.address}
                onChange={change}
                required
              />
            </label>
            <div className="field-grid">
              <label>
                City
                <input
                  name="city"
                  value={form.city}
                  onChange={change}
                  required
                />
              </label>
              <label>
                Postal code
                <input
                  name="postal_code"
                  value={form.postal_code}
                  onChange={change}
                  required
                />
              </label>
            </div>
          </div>
          {error && <div className="form-error">{error}</div>}
          <button className="btn btn-dark full" disabled={busy}>
            {busy ? "Placing order..." : "Place order →"}
          </button>
        </form>
        <aside className="summary">
          <h3>Review</h3>
          {cart.items.map((i) => (
            <div className="review-item" key={i.id}>
              <img src={i.image} />
              <div>
                <span>{i.title}</span>
                <small>Qty {i.qty}</small>
              </div>
              <strong>{money(i.price * i.qty)}</strong>
            </div>
          ))}
          <div className="summary-lines">
            <div>
              <span>Subtotal</span>
              <strong>{money(cart.subtotal)}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <strong>{cart.shipping ? "$10.00" : "Free"}</strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{money(cart.total)}</strong>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
