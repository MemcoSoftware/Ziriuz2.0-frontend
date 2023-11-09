import React, { useState } from 'react';
import { updateModeloEquipo } from '../../services/equiposModeloService';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import './styles/EditEquipoButton.css'
import { useNavigate } from 'react-router-dom';


type EditEquipoModeloButtonProps = {
  modeloEquipoId: string;
  onEditSuccess: () => void;
  onCancel: () => void;
  initialData: any;
};

const EditEquipoModeloButton: React.FC<EditEquipoModeloButtonProps> = ({ modeloEquipoId, onEditSuccess, onCancel, initialData }) => {
  const [modeloEquipoData, setModeloEquipoData] = useState(initialData);

  const loggedIn = useSessionStorage('sessionJWTToken');
  const navigate = useNavigate();
  const handleEdit = async () => {
    try {
      if (!loggedIn) {
        // Redirige al usuario a la página de inicio de sesión si no está autenticado
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
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
      setTimeout(() => {
        window.alert(`Modelo de equipo: ${modeloEquipoData.modelo} actualizado satisfactoriamente`);
      }, 2000); // 2000 milisegundos (2 segundos)
    } catch (error) {
      console.error('Error al editar el modelo de equipo:', error);
    }
  };

  return (
    <div>
      <div className="EditEquipoModeloButton-box">
      <form  className="EditEquipoModeloButton-registerequipomodelo">
        <div className="EditEquipoModeloButton-overlap-group">
          <div className="EditEquipoModeloButton-overlap">
            <p className="EditEquipoModeloButton-title">ACTUALIZAR MODELO DE EQUIPO</p>
            <p className='EditEquipoModeloButton-ID'>{modeloEquipoData._id || ''}</p>
          </div>
          <div className="EditEquipoModeloButton-container-separator" />
          
          <label htmlFor="modelo" className="EditEquipoModeloButton-modelo-nombre-title">1. Ingrese el nombre del modelo de equipo</label>
          <input 
          className="EditEquipoModeloButton-modelo-nombre-input"
          type="text"
          value={modeloEquipoData.modelo || ''}
          onChange={(e) => setModeloEquipoData({ ...modeloEquipoData, modelo: e.target.value })}
          />
          
          <label htmlFor="precio" className="EditEquipoModeloButton-modelo-precio-title">2. Ingrese el precio del modelo de equipo</label>
          <input 
          className="EditEquipoModeloButton-modelo-precio-input"
          type="number"
          value={modeloEquipoData.precio || 0}
          onChange={(e) => setModeloEquipoData({ ...modeloEquipoData, precio: e.target.value })}
          />
          
          <label htmlFor="marca" className="EditEquipoModeloButton-modelo-marca-title">3. Seleccione la Marca de Equipo a relacionar</label>
          <input
          className="EditEquipoModeloButton-modelo-marca-input"
          type="text"
          value={modeloEquipoData.id_marca ? modeloEquipoData.id_marca.marca : ''}
          onChange={(e) =>
            setModeloEquipoData({
              ...modeloEquipoData,
              id_marca: { marca: e.target.value },
            })
          }
          />
          
          <label htmlFor="clase" className="EditEquipoModeloButton-modelo-clase-title">4. Seleccione la Clase de Equipo a relacionar</label>
          <input 
          className="EditEquipoModeloButton-modelo-clase-input"
          type="text"
          value={modeloEquipoData.id_clase ? modeloEquipoData.id_clase.clase : ''}
          onChange={(e) =>
            setModeloEquipoData({
              ...modeloEquipoData,
              id_clase: { clase: e.target.value },
            })
          }
          />
          
          
          <button 
          className="EditEquipoModeloButton-modelo-canelar" onClick={onCancel}>Cancelar</button>
          <button 
          type='submit'
          className="EditEquipoModeloButton-modelo-registrar" onClick={handleEdit}>Actualizar</button>
        </div>
      </form>
    </div>


    </div>
  );
};

export default EditEquipoModeloButton;
