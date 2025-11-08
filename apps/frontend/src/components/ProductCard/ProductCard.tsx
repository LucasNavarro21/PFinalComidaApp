import "./ProductCard.css";
import { useProducts } from "../../hooks/useProduct";

export function ProductCard() {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="product-card-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p className="product-category">{product.category}</p>
            <span className="product-price">${product.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
