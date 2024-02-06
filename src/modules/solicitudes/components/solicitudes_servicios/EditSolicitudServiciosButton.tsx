import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../../../users/hooks/useSessionStorage';
import { updateSolicitudServicio } from '../../services/solicitudesServiciosService';
import { getAllServiciosTipos } from '../../services/serviciosTiposService';
import { Servicios } from '../../utils/types/Servicios.type';
import { searchEquiposByKeyword } from '../../../equipos/services/searchEquiposService';

type EditSolicitudServiciosButtonProps = {
  solicitudId: string;
  onEditSuccess: () => void;
  onCancel: () => void;
  initialData: any; // Considera definir un tipo más específico si es posible
};

const EditSolicitudServiciosButton: React.FC<EditSolicitudServiciosButtonProps> = ({
  solicitudId,
  onEditSuccess,
  onCancel,
  initialData,
}) => {
  const [solicitudData, setSolicitudData] = useState(initialData);
  // Asegura que serviciosTipos siempre sea un arreglo
  const [serviciosTipos, setServiciosTipos] = useState<Servicios[]>([]); 
  const token = useSessionStorage('sessionJWTToken');

  // Estados busqueda & asignación de Equipo
  const [selectedEquipo, setSelectedEquipo] = useState<any>(null);
  const [confirmedSelection, setConfirmedSelection] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [useSelectedEquipo, setUseSelectedEquipo] = useState<boolean>(false);



  useEffect(() => {
    const fetchServiciosTipos = async () => {
      try {
        const response = await getAllServiciosTipos(token);
        // Asegúrate de que la respuesta contiene la propiedad 'servicios'
        if (response) {
          setServiciosTipos(response); // Actualiza directamente con la respuesta si contiene la lista de servicios
        }
      } catch (error) {
        console.error('Error al obtener los tipos de servicios:', error);
      }
    };
  
    fetchServiciosTipos();

    if (solicitudData.id_equipo) {
      setSelectedEquipo(solicitudData.id_equipo);
      setConfirmedSelection(true); // Confirma automáticamente el equipo inicial
    }
  }, [token, solicitudData.id_equipo]);
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!confirmedSelection) {
      alert('Debes confirmar la selección del equipo antes de enviar el formulario.');
      return;
    }
    // Asegúrate de validar o manejar la posibilidad de que alguno de los valores anidados pueda ser undefined
    const mappedData = {
      // Aquí podrías necesitar manejar casos donde id_creador, id_cambiador, etc., puedan ser undefined
      id_creador: solicitudData.id_creador.name,
      id_cambiador: solicitudData.id_cambiador.name,
      id_servicio: solicitudData.id_servicio,
      id_solicitud_estado: solicitudData.id_solicitud_estado.estado,
      id_equipo: solicitudData.id_equipo.modelo_equipos.id_clase.clase,
    };

    try {
      await updateSolicitudServicio(token, solicitudId, mappedData);
      onEditSuccess();
      alert('Solicitud actualizada con éxito');
    } catch (error) {
      console.error('Error al actualizar la solicitud:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setSolicitudData({ ...solicitudData, [name]: value });
  };

  const handleServicioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSolicitudData({ ...solicitudData, [name]: value });
  };

  const handleSearch = async () => {
    try {
      const equipos = await searchEquiposByKeyword(token, searchInput);
      if (equipos.length > 0) {
        setSelectedEquipo(equipos[0]); // Selección automática del primer equipo
        setSearchError(null);
      } else {
        setSearchError('No se encontraron equipos.');
      }
    } catch (error) {
      console.error('Error al buscar equipos:', error);
      setSearchError('Error al buscar equipos.');
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Creador:</label>
          <span> {solicitudData.id_creador.name}</span>
        </div>
        <div>
          <label>ID Servicio:</label>
          <select
            name="id_servicio"
            value={solicitudData.id_servicio}
            onChange={handleServicioChange}
          >
            {serviciosTipos.map((servicio) => (
              <option key={servicio._id} value={servicio._id}>
                {servicio.servicio}
              </option>
            ))}
          </select>
        </div>

        <div>
              <label>Búsqueda de Equipo:</label>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="button" onClick={handleSearch}>
                Buscar
              </button>
        </div>

            {selectedEquipo && (
              <div>
                <h3>Información del Equipo:</h3>
                <p>ID: {selectedEquipo._id}</p>
                <p>Serie: {selectedEquipo.serie}</p>
                <p>Activo Fijo: {selectedEquipo.activo_fijo}</p>
                <p>Mtto: {selectedEquipo.mtto}</p>
                {confirmedSelection && (
                  <button type="button" onClick={() => setConfirmedSelection(false)}>
                    Cambiar Equipo
                  </button>
                )}
              </div>
            )}

            {searchError && <p>{searchError}</p>}

            {selectedEquipo && !confirmedSelection && (
              <div>
                <p>¿La información del equipo es la correcta para relacionar?</p>
                <button
                    type="button"
                    onClick={() => {
                      setConfirmedSelection(true);
                      setUseSelectedEquipo(true);
                    }}
                    >
                    Sí
                  </button>
                  <button
                      type="button"
                      onClick={() => {
                        setSelectedEquipo(null);
                        setUseSelectedEquipo(false);
                      }}
                    >
                      No
                    </button>
              </div>
            )}
        <div>
          <label>ID Equipo:</label>
          <input
              type="text"
              name="id_equipo"
              value={
                useSelectedEquipo
                  ? selectedEquipo._id
                  : solicitudData.id_equipo.modelo_equipos.id_clase.clase
              }
              onChange={handleChange}
            />
        </div>

        <div>
          <label>Creación:</label>
          <input
            type="text"
            name="creacion"
            value={solicitudData.creacion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Aviso:</label>
          <input
            type="text"
            name="aviso"
            value={solicitudData.aviso}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cambio de Estado:</label>
          <input
            type="text"
            name="cambio_estado"
            value={solicitudData.cambio_estado}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Observación:</label>
          <textarea
            name="observacion"
            value={solicitudData.observacion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Observación Estado:</label>
          <textarea
            name="observacion_estado"
            value={solicitudData.observacion_estado}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Actualizar Solicitud</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditSolicitudServiciosButton;
