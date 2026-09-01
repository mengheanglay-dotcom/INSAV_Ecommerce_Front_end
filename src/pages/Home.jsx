import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import ProductGrid from "../components/ProductGrid";
import SectionHeading from "../components/SectionHeading";
import { categoryLabel } from "../utils/format";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .products({ sort: "rating" })
      .then((d) => setProducts(d.data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow light">NEW SEASON · 2026</span>
          <h1>
            Better things.
            <br />
            <em>Simply chosen.</em>
          </h1>
          <p>
            A refined collection of everyday essentials, tech, and pieces you'll
            actually want to keep.
          </p>
          <Link to="/products" className="btn btn-light">
            Explore collection <span>→</span>
          </Link>
        </div>
        <div className="hero-art">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="hero-product">
            <span>INSAV</span>
            <strong>ESSENTIALS</strong>
          </div>
        </div>
      </section>
      <section className="trust-strip">
        <div>
          <strong>Curated quality</strong>
          <span>Products worth your space</span>
        </div>
        <div>
          <strong>Secure checkout</strong>
          <span>Protected by Laravel</span>
        </div>
        <div>
          <strong>Fast delivery</strong>
          <span>Free over $100</span>
        </div>
        <div>
          <strong>Easy returns</strong>
          <span>30-day return window</span>
        </div>
      </section>
      <section className="page-section">
        <SectionHeading eyebrow="MOST LOVED" title="Popular right now" />
        <ProductGrid products={products.slice(0, 8)} loading={loading} />
      </section>
      <section className="category-banner">
        <div>
          <span className="eyebrow">THE EDIT</span>
          <h2>Find your everyday favorites.</h2>
          <p>
            From useful tech to timeless wardrobe pieces, discover a cleaner way
            to shop.
          </p>
          <Link to="/products" className="btn btn-dark">
            Shop the edit →
          </Link>
        </div>
        <div className="category-stack">
          <Link to="/products?category=electronics">
            <span>01</span>
            <b>Electronics</b>
            <small>Smart essentials</small>
          </Link>
          <Link to="/products?category=men's clothing">
            <span>02</span>
            <b>Men’s</b>
            <small>Everyday style</small>
          </Link>
          <Link to="/products?category=women's clothing">
            <span>03</span>
            <b>Women’s</b>
            <small>Modern staples</small>
          </Link>
        </div>
      </section>
      <section className="page-section soft">
        <SectionHeading
          eyebrow="SHOP BY CATEGORY"
          title="Made for your routine"
          link={null}
        />
        <div className="category-grid">
          {[
            "electronics",
            "men's clothing",
            "women's clothing",
            "jewelery",
          ].map((c, i) => (
            <Link
              className="category-card"
              key={c}
              to={`/products?category=${encodeURIComponent(c)}`}
            >
              <span>0{i + 1}</span>
              <h3>{categoryLabel(c)}</h3>
              <p>Explore the collection</p>
              <b>→</b>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
