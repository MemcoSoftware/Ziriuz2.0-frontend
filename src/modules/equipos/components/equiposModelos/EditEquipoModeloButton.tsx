import React, { useState } from 'react';
import { updateModeloEquipo } from '../../services/equiposModeloService';
import { useSessionStorage } from '../../hooks/useSessionStorage';

type EditEquipoModeloButtonProps = {
  modeloEquipoId: string;
  onEditSuccess: () => void;
  onCancel: () => void;
  initialData: any;
};

const EditEquipoModeloButton: React.FC<EditEquipoModeloButtonProps> = ({ modeloEquipoId, onEditSuccess, onCancel, initialData }) => {
  const [modeloEquipoData, setModeloEquipoData] = useState(initialData);

  const loggedIn = useSessionStorage('sessionJWTToken');

  const handleEdit = async () => {
    try {
      const token = loggedIn;

      // Mapear los campos relacionados al formato correcto
      const mappedData = {
        ...modeloEquipoData,
        id_marca: modeloEquipoData.id_marca ? modeloEquipoData.id_marca.marca : null,
        id_clase: modeloEquipoData.id_clase ? modeloEquipoData.id_clase.clase : null,
      };

      // Realiza la solicitud PUT para actualizar el modelo de equipo
      await updateModeloEquipo(token, modeloEquipoId, mappedData);

      onEditSuccess();
      window.location.reload();
      window.alert(`Modelo de equipo: ${modeloEquipoData.modelo} actualizado satisfactoriamente`);
    } catch (error) {
      console.error('Error al editar el modelo de equipo:', error);
    }
  };

  return (
    <div>
      <h2>Editar Modelo de Equipo</h2>
      <div>
        <label>Modelo:</label>
        <input
          type="text"
          value={modeloEquipoData.modelo || ''}
          onChange={(e) => setModeloEquipoData({ ...modeloEquipoData, modelo: e.target.value })}
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          value={modeloEquipoData.precio || 0}
          onChange={(e) => setModeloEquipoData({ ...modeloEquipoData, precio: e.target.value })}
        />
      </div>
      <div>
        <label>ID de Marca:</label>
        <input
          type="text"
          value={modeloEquipoData.id_marca ? modeloEquipoData.id_marca.marca : ''}
          onChange={(e) =>
            setModeloEquipoData({
              ...modeloEquipoData,
              id_marca: { marca: e.target.value },
            })
          }
        />
      </div>
      <div>
        <label>ID de Clase:</label>
        <input
          type="text"
          value={modeloEquipoData.id_clase ? modeloEquipoData.id_clase.clase : ''}
          onChange={(e) =>
            setModeloEquipoData({
              ...modeloEquipoData,
              id_clase: { clase: e.target.value },
            })
          }
        />
      </div>
      <button onClick={handleEdit}>Guardar Cambios</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default EditEquipoModeloButton;
