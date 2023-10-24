import React, { useState } from 'react';
import { updateMarcaEquipo } from '../../services/marcasEquipoService';
import { useSessionStorage } from '../../hooks/useSessionStorage';

type EditMarcaEquipoButtonProps = {
  marcaEquipoId: string;
  onEditSuccess: () => void;
  onCancel: () => void;
  initialData: any;
};

const EditMarcaEquipoButton: React.FC<EditMarcaEquipoButtonProps> = ({ marcaEquipoId, onEditSuccess, onCancel, initialData }) => {
  const [marcaEquipoData, setMarcaEquipoData] = useState(initialData);
  const loggedIn = useSessionStorage('sessionJWTToken');

  const handleEdit = async () => {
    try {
      const token = loggedIn;

      // Realizar una solicitud PUT para actualizar la marca de equipo
      await updateMarcaEquipo(token, marcaEquipoId, marcaEquipoData);

      onEditSuccess();
      window.location.reload();
      window.alert(`Marca de equipo: ${marcaEquipoData.marca} actualizada satisfactoriamente`);
    } catch (error) {
      console.error('Error al editar la marca de equipo:', error);
    }
  };

  return (
    <div>
      <h2>Editar Marca de Equipo</h2>
      <div>
        <label>Marca:</label>
        <input
          type="text"
          value={marcaEquipoData.marca || ''}
          onChange={(e) => setMarcaEquipoData({ ...marcaEquipoData, marca: e.target.value })}
        />
      </div>
      <button onClick={handleEdit}>Guardar Cambios</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default EditMarcaEquipoButton;
