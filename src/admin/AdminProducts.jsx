import { useEffect, useState } from "react";
import { api } from "../services/api";
import { money } from "../utils/format";
export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  useEffect(() => {
    api.admin
      .products()
      .then((d) => setProducts(d.data))
      .finally(() => setLoading(false));
  }, []);
  const update = async (p, field, value) => {
    const d = await api.admin.updateProduct(p.id, { [field]: value });
    setProducts((xs) => xs.map((x) => (x.id === p.id ? d.data : x)));
  };
  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section className="admin-content">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">CATALOG</span>
          <h1>Products</h1>
          <p>
            Manage visibility, featured status and stock for the Fake Store
            catalog.
          </p>
        </div>
        <div className="admin-search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
          />
        </div>
      </div>
      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-loading">Loading products…</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Featured</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="table-product">
                      <img src={p.image} alt="" />
                      <div>
                        <strong>{p.title}</strong>
                        <span>#{p.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td>{money(p.price)}</td>
                  <td>
                    <input
                      className="stock-input"
                      type="number"
                      min="0"
                      value={p.stock}
                      onChange={(e) =>
                        update(p, "stock", Number(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <button
                      className={`toggle ${p.featured ? "on" : ""}`}
                      onClick={() => update(p, "featured", !p.featured)}
                    >
                      {p.featured ? "Yes" : "No"}
                    </button>
                  </td>
                  <td>
                    <button
                      className={`toggle ${p.active ? "on" : ""}`}
                      onClick={() => update(p, "active", !p.active)}
                    >
                      {p.active ? "Visible" : "Hidden"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
