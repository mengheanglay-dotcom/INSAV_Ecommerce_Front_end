import { Link } from "react-router-dom";
import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { categoryLabel, money } from "../utils/format";
import Icon from "./Icon";
export default function ProductCard({ product }) {
  const { addToCart } = useShop();
  const [busy, setBusy] = useState(false);
  const rating = product.rating?.rate || 0;
  const add = async () => {
    setBusy(true);
    try {
      await addToCart(product.id);
    } finally {
      setBusy(false);
    }
  };
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image">
        <img src={product.image} alt={product.title} />
        <span className="category-chip">{categoryLabel(product.category)}</span>
      </Link>
      <div className="product-info">
        <Link to={`/products/${product.id}`} className="product-title">
          {product.title}
        </Link>
        <div className="rating">
          <Icon name="star" size={15} />
          <span>{rating.toFixed(1)}</span>
          <span className="muted">({product.rating?.count || 0})</span>
        </div>
        <div className="product-row">
          <strong>{money(product.price)}</strong>
          <button className="add-mini" onClick={add} disabled={busy}>
            {busy ? "..." : "+"}
          </button>
        </div>
      </div>
    </article>
  );
}
