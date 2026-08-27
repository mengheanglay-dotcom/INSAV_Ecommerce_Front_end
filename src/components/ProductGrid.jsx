import ProductCard from "./ProductCard";
export default function ProductGrid({ products, loading = false }) {
  if (loading)
    return (
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="skeleton-card" key={i}>
            <div className="skeleton image" />
            <div className="skeleton line" />
            <div className="skeleton line short" />
          </div>
        ))}
      </div>
    );
  if (!products.length)
    return (
      <div className="empty-state">
        <h3>No products found</h3>
        <p>Try another search or category.</p>
      </div>
    );
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
