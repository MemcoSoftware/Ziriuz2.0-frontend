import React, { useState } from 'react';
import { updateAreaEquipo } from '../../services/areasEquiposService';
import { useSessionStorage } from '../../hooks/useSessionStorage';

type EditAreaEquipoButtonProps = {
  areaEquipoId: string;
  onEditSuccess: () => void;
  onCancel: () => void;
  initialData: any;
};

const EditAreaEquipoButton: React.FC<EditAreaEquipoButtonProps> = ({ areaEquipoId, onEditSuccess, onCancel, initialData }) => {
  const [areaEquipoData, setAreaEquipoData] = useState(initialData);
  const loggedIn = useSessionStorage('sessionJWTToken');

  const handleEdit = async () => {
    try {
      const token = loggedIn;

      // Realizar una solicitud PUT para actualizar el área de equipo
      await updateAreaEquipo(token, areaEquipoId, areaEquipoData);

      onEditSuccess();
      window.location.reload();
      window.alert(`Área de equipo: ${areaEquipoData.area} actualizada satisfactoriamente`);
    } catch (error) {
      console.error('Error al editar el área de equipo:', error);
    }
  };

  return (
    <div>
      <h2>Editar Área de Equipo</h2>
      <div>
        <label>Área:</label>
        <input
          type="text"
          value={areaEquipoData.area || ''}
          onChange={(e) => setAreaEquipoData({ ...areaEquipoData, area: e.target.value })}
        />
      </div>
      <button onClick={handleEdit}>Guardar Cambios</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default EditAreaEquipoButton;
