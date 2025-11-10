import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProductList } from "./ProductList";
import { mockProducts } from "../../mocks/product.mocks";

describe("ProductList", () => {
  it("renders a list of ProductCard components", () => {
    render(<ProductList products={mockProducts} />);
    const cards = screen.getAllByRole("img"); // todas las imágenes de productos
    expect(cards.length).toBe(mockProducts.length);
  });
});
