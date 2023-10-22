import React, { useState } from 'react';
import { updateEquipo } from '../../services/equiposService';
import { useSessionStorage } from '../../hooks/useSessionStorage';

type EditEquipoButtonProps = {
  equipoId: string;
  onEditSuccess: () => void;
  onCancel: () => void;
  initialData: any;
};

const EditEquipoButton: React.FC<EditEquipoButtonProps> = ({ equipoId, onEditSuccess, onCancel, initialData }) => {
  const [equipoData, setEquipoData] = useState<any>(initialData || {
    id_sede: "",
    modelo_equipos: "",
    id_area: "",
    id_tipo: "",
    serie: "",
    ubicacion: "",
    frecuencia: 0,
  });

  const loggedIn = useSessionStorage('sessionJWTToken');

  const handleEdit = async () => {
    try {
      const token = loggedIn;
      // Asegúrate de enviar todos los campos, incluso si no han cambiado
      const updatedEquipoData = {
        ...initialData, // Incluye todos los campos originales
        ...equipoData,   // Sobrescribe con los campos actualizados
      };

      await updateEquipo(token, equipoId, updatedEquipoData);
      onEditSuccess();

      // Mostrar una alerta
      window.alert('Cambios guardados con éxito');

      // Redirigir a la página de detalles del equipo
      window.location.href = `/ruta-a-la-pagina-de-detalles/${equipoId}`;
    } catch (error) {
      console.error('Error al editar el equipo:', error);
    }
  };

  return (
    <div>
      <h2>Editar Equipo</h2>
      <div>
        <label>ID de Sede:</label>
        <input
          type="text"
          value={equipoData.id_sede.sede_nombre}
          onChange={(e) => setEquipoData({ ...equipoData, id_sede: e.target.value })}
        />
      </div>
      <div>
        <label>Modelo de Equipos:</label>
        <input
          type="text"
          value={equipoData.modelo_equipos.modelo}
          onChange={(e) => setEquipoData({ ...equipoData, modelo_equipos: e.target.value })}
        />
      </div>
      <div>
        <label>ID de Área:</label>
        <input
          type="text"
          value={equipoData.id_area.area}
          onChange={(e) => setEquipoData({ ...equipoData, id_area: e.target.value })}
        />
      </div>
      <div>
        <label>ID de Tipo:</label>
        <input
          type="text"
          value={equipoData.id_tipo.tipo}
          onChange={(e) => setEquipoData({ ...equipoData, id_tipo: e.target.value })}
        />
      </div>
      <div>
        <label>Serie:</label>
        <input
          type="text"
          value={equipoData.serie}
          onChange={(e) => setEquipoData({ ...equipoData, serie: e.target.value })}
        />
      </div>
      <div>
        <label>Ubicación:</label>
        <input
          type="text"
          value={equipoData.ubicacion}
          onChange={(e) => setEquipoData({ ...equipoData, ubicacion: e.target.value })}
        />
      </div>
      <div>
        <label>Frecuencia Mantenimiento en meses:</label>
        <input
          type="number"
          value={equipoData.frecuencia}
          onChange={(e) => setEquipoData({ ...equipoData, frecuencia: e.target.value })}
        />
      </div>
      <button onClick={handleEdit}>Guardar Cambios</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default EditEquipoButton;
