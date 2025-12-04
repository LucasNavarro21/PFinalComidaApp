import { useState } from "react";
import "./ProductCard.css";
import { Product } from "../../types/product.types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    if (onAddToCart && quantity > 0) {
      onAddToCart(product, quantity);
      setQuantity(0);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <span className="product-price">${product.price}</span>
      </div>

      {onAddToCart && (
        <div className="product-cart-controls">
          <div className="quantity-control">
            <button
              className="qty-btn"
              onClick={handleDecrement}
              disabled={quantity === 0}
            >
              −
            </button>
            <span className="qty-display">{quantity}</span>
            <button className="qty-btn" onClick={handleIncrement}>
              +
            </button>
          </div>
          <button
            className="btn-add-cart"
            onClick={handleAddToCart}
            disabled={quantity === 0}
          >
            Agregar al carrito
          </button>
        </div>
      )}
    </div>
  );
}
