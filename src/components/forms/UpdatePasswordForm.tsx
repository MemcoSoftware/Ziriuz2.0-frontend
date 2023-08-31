import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../services/authService";

interface UpdatePasswordFormProps {
  email: string; // Prop para recibir el correo electrónico
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({ email }) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updatePassword(email, newPassword);
      console.log(response);

      if (response.status === 200) {
        console.log("Contraseña actualizada exitosamente");
        navigate("/login"); // Redirigir a la página de inicio de sesión
      } else {
        console.log("Error al actualizar la contraseña");
        // Puedes mostrar un mensaje de error al usuario si lo deseas
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
    }
  };

  return (
    <div>
      <h1>Actualizar Contraseña</h1>
      <p>Correo Electrónico: {email}</p>
      <form onSubmit={handleSubmit}>
        <label>Nueva Contraseña:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Actualizar Contraseña</button>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
