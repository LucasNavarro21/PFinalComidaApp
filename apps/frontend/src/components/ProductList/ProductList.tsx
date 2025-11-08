// src/components/ProductList/ProductList.tsx
import React from "react";
import "./productList.css";
import { ProductCard } from "../ProductCard/ProductCard";
import { useProducts } from "../../hooks/useProduct";

interface ProductListProps {
  restaurantId: number;
}

export const ProductList: React.FC<ProductListProps> = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products.length) return <p>No hay productos disponibles.</p>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
