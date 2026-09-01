import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import Icon from "../components/Icon";
export default function AdminLayout() {
  const { user, logout } = useShop();
  const nav = useNavigate();
  if (!user || user.role !== "admin")
    return (
      <div className="admin-denied">
        <div>
          <span className="eyebrow">ADMIN AREA</span>
          <h1>Access denied.</h1>
          <p>You need an administrator account to continue.</p>
          <button className="btn btn-dark" onClick={() => nav("/login")}>
            Sign in →
          </button>
        </div>
      </div>
    );
  const links = [
    ["/admin", "Overview", "grid"],
    ["/admin/products", "Products", "bag"],
    ["/admin/orders", "Orders", "receipt"],
    ["/admin/users", "Customers", "user"],
    ["/admin/settings", "Settings", "settings"],
  ];
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>INSAV</span>SHOP <small>ADMIN</small>
        </div>
        <div className="admin-profile">
          <div className="avatar">{user.name?.charAt(0).toUpperCase()}</div>
          <div>
            <strong>{user.name}</strong>
            <span>Administrator</span>
          </div>
        </div>
        <nav className="admin-nav">
          {links.map(([to, label, icon]) => (
            <NavLink end={to === "/admin"} key={to} to={to}>
              <Icon name={icon} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="admin-bottom">
          <NavLink to="/">
            <Icon name="arrow" />
            View store
          </NavLink>
          <button
            onClick={async () => {
              await logout();
              nav("/");
            }}
          >
            <Icon name="logout" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-top">
          <div>
            <span className="eyebrow">CONTROL CENTER</span>
            <h2>Store administration</h2>
          </div>
          <div className="admin-top-actions">
            <span className="secure-badge">● Secure session</span>
            <button className="admin-mobile-exit" onClick={() => nav("/")}>
              Exit
            </button>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
