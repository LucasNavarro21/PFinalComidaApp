import "./ProductList.css";
import { Product } from "../../types/product.types";
import { ProductCard } from "../ProductCard/ProductCard";

interface ProductListProps {
  products: Product[];
  onAddToCart?: (product: Product, quantity: number) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="product-card-container">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
