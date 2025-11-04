import { ProductList } from "../components/ProductList/ProductList";

export default function RestaurantMenuPage() {
  const restaurantId = 1;

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>Menú de Burger House</h2>
      <ProductList restaurantId={restaurantId} />
    </div>
  );
}
