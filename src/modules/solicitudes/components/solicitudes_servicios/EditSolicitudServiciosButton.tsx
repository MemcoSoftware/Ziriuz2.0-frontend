import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../../../users/hooks/useSessionStorage';
import { updateSolicitudServicio } from '../../services/solicitudesServiciosService';
import { getAllServiciosTipos } from '../../services/serviciosTiposService';
import { Servicios } from '../../utils/types/Servicios.type';
import { searchEquiposByKeyword } from '../../../equipos/services/searchEquiposService';
import { DateTime } from 'luxon';
import useUserRoleVerifier from '../../hooks/useUserRoleVerifier';

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
  const isAdmin = useUserRoleVerifier(['administrador']);
  const userId = useSessionStorage('userId');

  // Estados busqueda & asignación de Equipo
  const [selectedEquipo, setSelectedEquipo] = useState<any>(null);
  const [confirmedSelection, setConfirmedSelection] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [useSelectedEquipo, setUseSelectedEquipo] = useState<boolean>(false);
  const [equiposEncontrados, setEquiposEncontrados] = useState<any[]>([]); // Nuevo estado para almacenar equipos encontrados

  // Estados id_solicitud_estado
  const estadoAprobadoId = "65aff1402643ef00d73c7545";
  const estadoRechazadoId = "65aff1442643ef00d73c7547";
  const [estadoAccion, setEstadoAccion] = useState('');

  // Estado para realizar un seguimiento del valor anterior de id_solicitud_estado
  const [prevSolicitudEstado, setPrevSolicitudEstado] = useState(initialData.id_solicitud_estado);

  
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

  
 // Función para formatear la fecha y hora actuales al formato local de Colombia
 const formatDateTimeLocal = () => {
  const now = DateTime.now().setZone('America/Bogota');
  return now.toFormat('yyyy-MM-dd HH:mm:ss');
};

  
const handleEstadoChange = (nuevoEstadoId: string) => {
  const esAprobado = nuevoEstadoId === estadoAprobadoId;

  // Verificar si id_solicitud_estado ha cambiado antes de actualizar cambio_estado
  if (solicitudData.id_solicitud_estado !== nuevoEstadoId) {
    setSolicitudData((prevData: typeof initialData) => ({
      ...prevData,
      id_solicitud_estado: nuevoEstadoId,
      id_cambiador: userId,
      cambio_estado: formatDateTimeLocal(), // Usar la nueva función para establecer la fecha y hora locales
    }));
    setEstadoAccion(esAprobado ? "Aprobando Solicitud de Servicio" : "Rechazando Solicitud de Servicio");
  }
};
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Confirma que la selección del equipo sea válida y no `null` o `undefined`
    if (!confirmedSelection || !selectedEquipo) {
      alert('Debes confirmar la selección del equipo antes de enviar el formulario.');
      return;
    }

      const currentDateTime = formatDateTimeLocal();

      const mappedData = {
        id_creador: solicitudData.id_creador,
        id_cambiador: userId, // Este debe ser el _id del usuario que hace el cambio
        id_servicio: solicitudData.id_servicio,
        id_solicitud_estado: solicitudData.id_solicitud_estado,
        id_equipo: selectedEquipo._id, // Este debe ser el _id del equipo seleccionado
        creacion: solicitudData.creacion,
        aviso: solicitudData.aviso,
        cambio_estado: currentDateTime, // Agrega la fecha y hora actuales aquí
        observacion: solicitudData.observacion,
        observacion_estado: solicitudData.observacion_estado
      };
        

    try {
      const response = await updateSolicitudServicio(token, solicitudId, mappedData);
      console.log(response); // Asegúrate de que la respuesta sea la esperada
      onEditSuccess();
      alert('Solicitud actualizada con éxito');
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar la solicitud:', error);
    }
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setSolicitudData((prevData: typeof solicitudData) => ({ ...prevData, [name]: value }));
  };
  

  const handleServicioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSolicitudData({ ...solicitudData, [name]: value });
  };

  const handleSearch = async () => {
    try {
      const equipos = await searchEquiposByKeyword(token, searchInput);
      if (equipos.length > 0) {
        setEquiposEncontrados(equipos); // Almacena todos los equipos encontrados en un estado
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

                  {equiposEncontrados && equiposEncontrados.length > 0 && (
                    <div>
                      <h3>Equipos Encontrados:</h3>
                      <ul>
                        {equiposEncontrados.map((equipo) => (
                          <li key={equipo._id}>
                            <p>ID: {equipo._id}</p>
                            <p>Serie: {equipo.serie}</p>
                            <p>Activo Fijo: {equipo.activo_fijo}</p>
                            <p>Mtto: {equipo.mtto}</p>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedEquipo(equipo);
                                setConfirmedSelection(true);
                                setUseSelectedEquipo(true);
                                setEquiposEncontrados([]); // Limpia la lista de equipos encontrados
                              }}
                            >
                              Seleccionar este Equipo
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedEquipo && confirmedSelection && (
                    <div>
                      <h3>Información del Equipo Seleccionado:</h3>
                      <p>ID: {selectedEquipo._id}</p>
                      <p>Serie: {selectedEquipo.serie}</p>
                      <p>Activo Fijo: {selectedEquipo.activo_fijo}</p>
                      <p>Mtto: {selectedEquipo.mtto}</p>
                      <button type="button" onClick={() => setConfirmedSelection(false)}>
                        Cambiar Equipo
                      </button>
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
          </div>
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
            readOnly // Hace que el campo sea de solo lectura
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
          <label>Observación:</label>
          <textarea
            name="observacion"
            value={solicitudData.observacion}
            onChange={handleChange}
          />
        </div>
        {isAdmin && (
          <div>
            <label>ID Estado Solicitud:</label>
            {/* Mostramos el estado de la acción si se ha seleccionado uno, de lo contrario el estado actual de la solicitud */}
            <p>{estadoAccion || solicitudData.id_solicitud_estado.estado}</p>
            <div>
              <button type="button" onClick={() => handleEstadoChange(estadoAprobadoId)}>Aprobar</button>
              <button type="button" onClick={() => handleEstadoChange(estadoRechazadoId)}>Rechazar</button>
            </div>
          </div>
        )}

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
