import React, { useState } from 'react';
import './styles/EditRepuestoEquipoButton.css'; // Asegúrate de tener la ruta correcta
import { AxiosRequestConfig } from 'axios';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { updateRepuestoEquipo } from '../../services/repuestosEquiposService';

type EditRepuestoEquipoButtonProps = {
  repuestoEquipoId: string;
  onEditSuccess: () => void;
  onCancel: () => void;
  initialData: any;
};

const EditRepuestoEquipoButton: React.FC<EditRepuestoEquipoButtonProps> = ({ repuestoEquipoId, onEditSuccess, onCancel, initialData }) => {
  const [repuestoEquipoData, setRepuestoEquipoData] = useState(initialData);

  const loggedIn = useSessionStorage('sessionJWTToken');

  const handleEdit = async () => {
    try {
      const token = loggedIn;

      // Mapear los campos relacionados al formato correcto
      const mappedData = {
        id_cliente: repuestoEquipoData.id_cliente.client_name, // Agregamos el campo id_cliente
        repuesto_name: repuestoEquipoData.repuesto_name,
        repuesto_cantidad: repuestoEquipoData.repuesto_cantidad,
        repuesto_precio: repuestoEquipoData.repuesto_precio,
        // Agrega más campos según sea necesario
      };

      await updateRepuestoEquipo(token, repuestoEquipoId, mappedData);
      onEditSuccess();
      // Mostrar la alerta y luego recargar la página después de 2 segundos
      window.alert(`Repuesto Equipo ID: ${repuestoEquipoId} actualizado satisfactoriamente`);
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 milisegundos (2 segundos)
    } catch (error) {
      console.error('Error al editar el repuesto equipo:', error);
    }
  };

  return (
    <div>
    <form className="EditRepuestoEquipoButton-form">
        <div className="EditRepuestoEquipoButton-box">
          <div className="EditRepuestoEquipoButton-edit-repuesto-equipo">
            <div className="EditRepuestoEquipoButton-overlap-group">
              <div className="EditRepuestoEquipoButton-overlap">
                <div className="EditRepuestoEquipoButton-edit-title">ACTUALIZAR INFORMACIÓN DE REPUESTO</div>
                <div className="EditRepuestoEquipoButton-repuesto-id">ID: {repuestoEquipoData._id}</div>
              </div>
              <label className="EditRepuestoEquipoButton-repuesto-cliente">1.  Seleccione el cliente a relacionar:</label>
              <input
              className="EditRepuestoEquipoButton-cliente-input"
              type="text"
              value={repuestoEquipoData.id_cliente ? repuestoEquipoData.id_cliente.client_name: ''}
              onChange={(e) => setRepuestoEquipoData({ ...repuestoEquipoData, id_cliente: {client_name: e.target.value }})}
              />
              <label className="EditRepuestoEquipoButton-repuesto-nombre">2.  Ingrese el nombre del repuesto:</label>
              <input 
              className="EditRepuestoEquipoButton-nombre-input" 
              type="text"
              value={repuestoEquipoData.repuesto_name || ''}
              onChange={(e) => setRepuestoEquipoData({ ...repuestoEquipoData, repuesto_name: e.target.value })}
               />

              <label className="EditRepuestoEquipoButton-repuesto-cantidad">3.  Ingrese la cantidad del repuesto:</label>
              <input className="EditRepuestoEquipoButton-cantidad-input"
              type="number"
              value={repuestoEquipoData.repuesto_cantidad || 0}
              onChange={(e) => setRepuestoEquipoData({ ...repuestoEquipoData, repuesto_cantidad: e.target.value })}
              />

              <label className="EditRepuestoEquipoButton-repuesto-precio">4.  Ingrese el precio del repuesto</label>
              <input 
              className="EditRepuestoEquipoButton-precio-input"
              type="number"
              value={repuestoEquipoData.repuesto_precio || 0}
              onChange={(e) => setRepuestoEquipoData({ ...repuestoEquipoData, repuesto_precio: e.target.value })}
              />

              <div className="EditRepuestoEquipoButton-actualizar-texto-wrapper">
                <div className="EditRepuestoEquipoButton-text-wrapper" onClick={handleEdit}>ACTUALIZAR</div>
              </div>
              <div className="EditRepuestoEquipoButton-cancelar-texto-wrapper">
                <div className="EditRepuestoEquipoButton-text-wrapper" onClick={onCancel}>CANCELAR</div>
              </div>
              <div className="EditRepuestoEquipoButton-repuesto-separator" />
            </div>
          </div>
        </div>
    </form>
      
    </div>
  );
};

export default EditRepuestoEquipoButton;