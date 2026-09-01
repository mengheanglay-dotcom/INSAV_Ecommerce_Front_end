import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import Icon from "./Icon";
import { useState } from "react";

export default function Navbar() {
  const { cart, user, logout } = useShop();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      {/* Announcement */}
      <div className="announcement">
        Free shipping on orders over $100
        <span>•</span>
        Easy returns within 30 days
      </div>

      <div className="nav-wrap">
        {/* Logo */}
        <Link to="/" className="brand">
          INSAV<span>SHOP</span>
        </Link>

        {/* Navigation */}
        <nav className={open ? "nav open" : "nav"}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/products" onClick={closeMenu}>
            Shop
          </NavLink>

          <Link to="/products?category=electronics" onClick={closeMenu}>
            Electronics
          </Link>

          <Link to="/products?category=men's clothing" onClick={closeMenu}>
            Men
          </Link>

          <Link to="/products?category=women's clothing" onClick={closeMenu}>
            Women
          </Link>
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          {/* Search */}
          <button
            className="icon-btn desktop-search"
            onClick={() => navigate("/products")}
            aria-label="Search"
          >
            <Icon name="search" />
          </button>

          {/* Account */}
          {user ? (
            <>
              <button
                className="account-name"
                onClick={() => navigate("/account")}
              >
                {user.name.split(" ")[0]}
              </button>

              {/* Admin */}
              {user.role === "admin" && (
                <button
                  className="admin-nav-btn"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </button>
              )}

              {/* Logout */}
              <button
                className="icon-btn"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                aria-label="Logout"
              >
                <Icon name="logout" />
              </button>
            </>
          ) : (
            <button
              className="icon-btn"
              onClick={() => navigate("/login")}
              aria-label="Account"
            >
              <Icon name="user" />
            </button>
          )}

          {/* Cart */}
          <Link className="cart-link" to="/cart">
            <Icon name="bag" />
            <span className="cart-count">{cart.count}</span>
          </Link>

          {/* Mobile menu */}
          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
