import { ProductList } from "../components/ProductList/ProductList";
import { useEffect, useState } from "react";
import type { Product } from "../types/product.types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Productos</h2>
      <ProductList products={products} />
    </div>
  );
}
