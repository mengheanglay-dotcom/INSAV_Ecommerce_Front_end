import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="brand footer-brand">
            INSAV<span>SHOP</span>
          </div>
          <p>
            Thoughtfully selected products for everyday life. Simple, useful,
            and made to feel good.
          </p>
        </div>
        <div>
          <h4>Shop</h4>
          <Link to="/products">All products</Link>
          <Link to="/products?category=electronics">Electronics</Link>
          <Link to="/products?category=men's clothing">Men</Link>
          <Link to="/products?category=women's clothing">Women</Link>
        </div>
        <div>
          <h4>Help</h4>
          <Link to="/cart">Cart</Link>
          <Link to="/account">My account</Link>
          <a href="mailto:support@insavshop.test">Contact support</a>
        </div>
        <div>
          <h4>Stay in the loop</h4>
          <p>Get occasional updates about new arrivals and offers.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.currentTarget.reset();
              alert("Thanks for subscribing!");
            }}
            className="subscribe"
          >
            <input
              aria-label="Email"
              placeholder="Your email address"
              type="email"
              required
            />
            <button>→</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 INSAV SHOP</span>
        <span>Built with React + Laravel</span>
      </div>
    </footer>
  );
}
