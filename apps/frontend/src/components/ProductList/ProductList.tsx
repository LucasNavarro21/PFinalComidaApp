import type { Product } from "../../services/types/product.types";
import { ProductCard } from "../ProductCard/ProductCard";
import "./ProductList.css";

export interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <p className="no-products">No hay productos disponibles.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
