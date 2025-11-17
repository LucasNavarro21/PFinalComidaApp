import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProductCard } from "./ProductCard";
import { mockProducts } from "../../mocks/product.mocks";

describe("ProductCard", () => {
  const product = mockProducts[0];

  it("renders product name, category, price and image", () => {
    render(<ProductCard product={product} />);
    console.log("si se ejecuto el test")
    expect(screen.getByText(product.name)).toBeDefined();
    expect(screen.getByText(product.category)).toBeDefined();
    expect(screen.getByText(`$${product.price}`)).toBeDefined();
    const img = screen.getByAltText(product.name) as HTMLImageElement;
    expect(img).toBeDefined();
    expect(img.src).toBe(product.image);
  });

  it("matches snapshot", () => {
    const { container } = render(<ProductCard product={product} />);
    expect(container).toMatchSnapshot();
  });
});