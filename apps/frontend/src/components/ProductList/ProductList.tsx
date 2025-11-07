import React, { useEffect, useState } from "react";
import "./ProductList.css";
import type { Product } from "../../services/types/product.types";
import { ProductCard } from "../ProductCard/ProductCard";

// import { productService } from "../../services/mock/ProductServiceMock";
import { productService } from "../../services/api/ProductServiceApi";

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productService.findAll();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products available.</p>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} />
      ))}
    </div>
  );
};
