import React, { useState } from 'react';
import { updateEquipo } from '../../services/equiposService';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import './styles/EditEquipoButton.css';
type EditEquipoButtonProps = {
  equipoId: string;
  onEditSuccess: () => void;
  onCancel: () => void;
  initialData: any;
};

const EditEquipoButton: React.FC<EditEquipoButtonProps> = ({ equipoId, onEditSuccess, onCancel, initialData }) => {
  const [equipoData, setEquipoData] = useState(initialData);

  const loggedIn = useSessionStorage('sessionJWTToken');

  const handleEdit = async () => {
    try {
      const token = loggedIn;

      // Mapear los campos relacionados al formato correcto
      const mappedData = {
        ...equipoData,
        id_sede: equipoData.id_sede.sede_nombre,
        modelo_equipos: equipoData.modelo_equipos.modelo,
        id_area: equipoData.id_area.area,
        id_tipo: equipoData.id_tipo.tipo,
      };

      await updateEquipo(token, equipoId, mappedData);
      onEditSuccess();
       // Mostrar la alerta y luego recargar la página después de 2 segundos
      window.alert(`Equipo SERIE: ${equipoData.serie} actualizado satisfactoriamente`);
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 milisegundos (2 segundos)
    } catch (error) {
      console.error('Error al editar el equipo:', error);
    }
  };

  return (
    <div>
    <div className="EditEquipoButton-box">
      <form className="EditEquipoButton-form">
        <div className="EditEquipoButton-overlap-group">
          <div className="EditEquipoButton-overlap">
            <div className="EditEquipoButton-text-wrapper">ACTUALIZAR EQUIPO</div>
          </div>
          <div className="EditEquipoButton-rectangle" />
          
          <label className="EditEquipoButton-div">Seleccione la sede a relacionar:</label>
          <input 
          type="text"
          value={equipoData.id_sede ? equipoData.id_sede.sede_nombre : ''}
          onChange={(e) => setEquipoData({ ...equipoData, id_sede: { sede_nombre: e.target.value } })}
          className="EditEquipoButton-rectangle-2" />

          <label className="EditEquipoButton-p">Ingrese el numero de serie (SN) del equipo:</label>
          <input
          type="text"
          value={equipoData.serie || ''}
          onChange={(e) => setEquipoData({ ...equipoData, serie: e.target.value })}
          className="EditEquipoButton-rectangle-3" />

          <label className="EditEquipoButton-text-wrapper-2">Ingrese la ubicación dentro de la Sede para el equipo:</label>
          <input
          type="text"
          value={equipoData.ubicacion || ''}
          onChange={(e) => setEquipoData({ ...equipoData, ubicacion: e.target.value })}
          className="EditEquipoButton-rectangle-4" />



          <label className="EditEquipoButton-text-wrapper-3">Ingrese la frecuencia en meses para el mantenimiento del equipo:</label>
          <input
          type="number"
          value={equipoData.frecuencia || ''}
          onChange={(e) => setEquipoData({ ...equipoData, frecuencia: e.target.value })}
          className="EditEquipoButton-rectangle-5" />



          <label className="EditEquipoButton-text-wrapper-4">Seleccione el Modelo de Equipo a relacionar:</label>
          <input
          type="text"
          value={equipoData.modelo_equipos ? equipoData.modelo_equipos.modelo : ''}
          onChange={(e) => setEquipoData({ ...equipoData, modelo_equipos: { modelo: e.target.value } })}
          className="EditEquipoButton-rectangle-6" />


          <label className="EditEquipoButton-text-wrapper-5">Seleccione el Área de Equipo a relacionar:</label>
          <input
          type="text"
          value={equipoData.id_area ? equipoData.id_area.area : ''}
          onChange={(e) => setEquipoData({ ...equipoData, id_area: { area: e.target.value } })}
          className="EditEquipoButton-rectangle-7" />

          <label className="EditEquipoButton-text-wrapper-6">Seleccione el Tipo de Equipo a relacionar:</label>
          <input 
          type="text"
          value={equipoData.id_tipo ? equipoData.id_tipo.tipo : ''}
          onChange={(e) => setEquipoData({ ...equipoData, id_tipo: { tipo: e.target.value } })}
          className="EditEquipoButton-rectangle-8" />

          <div className="EditEquipoButton-div-wrapper">
            <button 
             className="EditEquipoButton-text-wrapper-7"
             onClick={onCancel}
             >CANCELAR</button>
          </div>
          <div className="EditEquipoButton-overlap-2">
            <button type="submit" className="EditEquipoButton-text-wrapper-8" onClick={handleEdit}>ACTUALIZAR</button>
          </div>
        </div>
      </form>
    </div>



    </div>
  );
};

export default EditEquipoButton;
