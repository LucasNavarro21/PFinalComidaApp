import { useState } from "react";
import type { Product } from "../../types/product.types";
import "./ProductForm.css";

interface ProductFormProps {
  onSubmit: (data: Partial<Product>) => Promise<void>;
  initialData?: Partial<Product>;
  isLoading?: boolean;
  mode?: "create" | "edit";
}

export function ProductForm({ onSubmit, initialData, isLoading = false, mode = "create" }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    initialData || {
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
    }
  );
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.price || !formData.description) {
      setError("Por favor completa los campos obligatorios");
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar producto");
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{mode === "create" ? "Crear Producto" : "Editar Producto"}</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Nombre *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          placeholder="Ej: Pizza Margarita"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Describe el producto..."
          rows={4}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Precio *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price || 0}
            onChange={handleChange}
            step="0.01"
            min="0"
            placeholder="0.00"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            placeholder="Ej: Pizzas"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="image">URL Imagen</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image || ""}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <button type="submit" disabled={isLoading} className="submit-button">
        {isLoading ? "Guardando..." : mode === "create" ? "Crear Producto" : "Guardar Cambios"}
      </button>
    </form>
  );
}
