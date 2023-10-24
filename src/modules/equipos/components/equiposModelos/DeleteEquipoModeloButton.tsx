import React from 'react';
import { deleteModeloEquipoById } from '../../services/equiposModeloService';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import useUserRoleVerifier from '../../hooks/useUserRoleVerifier';
import { useNavigate } from 'react-router-dom';

type DeleteEquipoModeloButtonProps = {
  modeloEquipoId: string;
  onDeleteSuccess: () => void; // Agregamos la prop onDeleteSuccess
};

const DeleteEquipoModeloButton: React.FC<DeleteEquipoModeloButtonProps> = ({ modeloEquipoId, onDeleteSuccess }) => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!loggedIn) {
      // Manejar la redirección si el usuario no está autenticado
      return;
    }

    try {
      const token = loggedIn;
      await deleteModeloEquipoById(token, modeloEquipoId);

      // Realizar la redirección y mostrar un mensaje de éxito
      navigate('/equiposModelo'); // Otra posible redirección después de eliminar
      window.alert(`El modelo de equipo se ha eliminado satisfactoriamente`);
      
      onDeleteSuccess(); // Llamamos a la función onDeleteSuccess para notificar el éxito
    } catch (error) {
      console.error('Error al eliminar el modelo de equipo:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Eliminar Modelo de Equipo</button>
  );
};

export default DeleteEquipoModeloButton;
