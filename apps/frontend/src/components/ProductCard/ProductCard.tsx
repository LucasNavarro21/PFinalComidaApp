import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import type { Product } from "../../types/product.types";

// import { ProductService } from "../../services/mock/ProductServiceMock";
import { ProductService } from "../../services/api/ProductServiceApi";

export const ProductCard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await ProductService.findAll();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  if (products.length === 0) return <p>No products available.</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <span>${product.price}</span>
        </div>
      ))}
    </div>
  );
};
