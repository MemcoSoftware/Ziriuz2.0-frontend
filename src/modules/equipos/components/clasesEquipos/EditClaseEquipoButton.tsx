import React, { useState } from 'react';
import { updateClaseEquipo } from '../../services/clasesEquipoService';
import { useSessionStorage } from '../../hooks/useSessionStorage';

type EditClaseEquipoButtonProps = {
  claseEquipoId: string;
  onEditSuccess: () => void;
  onCancel: () => void;
  initialData: any;
};

const EditClaseEquipoButton: React.FC<EditClaseEquipoButtonProps> = ({ claseEquipoId, onEditSuccess, onCancel, initialData }) => {
  const [claseEquipoData, setClaseEquipoData] = useState(initialData);
  const loggedIn = useSessionStorage('sessionJWTToken');

  const handleEdit = async () => {
    try {
      const token = loggedIn;

      // Realizar una solicitud PUT para actualizar la clase de equipo
      await updateClaseEquipo(token, claseEquipoId, claseEquipoData);

      onEditSuccess();
      window.location.reload();
      window.alert(`Clase de equipo: ${claseEquipoData.clase} actualizada satisfactoriamente`);
    } catch (error) {
      console.error('Error al editar la clase de equipo:', error);
    }
  };

  return (
    <div>
      <h2>Editar Clase de Equipo</h2>
      <div>
        <label>Clase:</label>
        <input
          type="text"
          value={claseEquipoData.clase || ''}
          onChange={(e) => setClaseEquipoData({ ...claseEquipoData, clase: e.target.value })}
        />
      </div>
      <button onClick={handleEdit}>Guardar Cambios</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default EditClaseEquipoButton;
