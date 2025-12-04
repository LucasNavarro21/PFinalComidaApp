import { CreateRestaurantForm } from "../components/CreateRestaurantForm/CreateRestaurantForm";
import { RestaurantService } from "../services/api/RestaurantServiceApi";
import { useAuthContext } from "../context/AuthContext";

export const CreateRestaurantPage = () => {
  const { token } = useAuthContext();

  const handleCreate = async (data: { name: string; address: string }) => {
    try {
      if (!token) return alert("Necesitas iniciar sesión");

      const res = await RestaurantService.create(data, token);

      alert("Restaurante creado con éxito");
      console.log(res);
    } catch (error) {
      console.error(error);
      alert("Error al crear restaurante");
    }
  };

  return (
    <div>
      <CreateRestaurantForm onSubmit={handleCreate} />
    </div>
  );
};
