import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../../../users/hooks/useSessionStorage';
import { updateSolicitudServicio } from '../../services/solicitudesServiciosService';
import { getAllServiciosTipos } from '../../services/serviciosTiposService';
import { Servicios } from '../../utils/types/Servicios.type';
import { searchEquiposByKeyword } from '../../../equipos/services/searchEquiposService';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import useUserRoleVerifier from '../../hooks/useUserRoleVerifier';
import './styles/EditSolicitudServiciosButton.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CallIcon from '@mui/icons-material/Call';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Estados id_solicitud_estado
  const estadoAprobadoId = "65aff1402643ef00d73c7545";
  const estadoRechazadoId = "65aff1442643ef00d73c7547";
  const [estadoAccion, setEstadoAccion] = useState('');

  // Estado para realizar un seguimiento del valor anterior de id_solicitud_estado
  const [prevSolicitudEstado, setPrevSolicitudEstado] = useState(initialData.id_solicitud_estado);

  const navigate = useNavigate();
  
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
      setIsSearchActive(equipos.length > 0); // Actualiza el estado según si se encontraron equipos
      if (equipos.length > 0) {
        setEquiposEncontrados(equipos); // Almacena todos los equipos encontrados en un estado
        setSearchError(null);
      } else {
        setSearchError('No se encontraron equipos.');
        setIsSearchActive(false); // Asegúrate de restablecer si no se encuentran equipos
      }
    } catch (error) {
      console.error('Error al buscar equipos:', error);
      setSearchError('Error al buscar equipos.');
      setIsSearchActive(false); // Asegúrate de restablecer en caso de error
    }
  };
  const handleEquipoSelection = (equipo:any) => {
    setSelectedEquipo(equipo);
    setConfirmedSelection(true);
    setUseSelectedEquipo(true);
    setEquiposEncontrados([]); // Limpia la lista de equipos encontrados
    setIsSearchActive(false); // Desactiva la búsqueda para que el equipo-selected vuelva a su posición original
  };

  const handleEquipoSelectedRedirect = () =>{
    navigate(`/equipos/${selectedEquipo._id}`);
  }

  const handleEquipoFoundRedirect = (equipo: any) => {
    navigate(`/equipos/${equipo._id}`);
  };
  


  return (
    <div>
      <form onSubmit={handleSubmit}>
         <div className="div-wrapper">
              <div className="overlap-wrapper">
                <div className="overlap">
                  <div className="container" />
                  <header className="header">
                    <div className="overlap-group">
                      <p className="solicitud-id">SOLICITUD DE SERVICIO - 65baa109d9d9486412afd0e9</p>
                    </div>
                  </header>
                  <div className="section">

                    {/* SERVICIO SELECTOR */}
                    <div className="tipo-servicio-p">1- Tipo de servicio:</div>
                    <select 
                    className="tipo-servicio-input"
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

                        {/* BUSQUEDA DE EQUIPOS */}
                    <p className="busqueda-equipos-p">
                      2- Busqueda de equipo por SN, MTTO o ACTIVO FIJO&nbsp;&nbsp;&nbsp;&nbsp; (Si se desea reemplazar):
                    </p>
                    <input 
                    className="busqueda-equipos"
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button 
                    className="div"
                    type="button" 
                    onClick={handleSearch}
                    >
                      Buscar
                    </button>

                    {/* EQUIPOS ENCONTRADOS Y SELECCION */}
                    {equiposEncontrados && equiposEncontrados.length > 0 && (
                        <div className="equipos-encontrados">
                          <ul className="equipos-list">
                          {equiposEncontrados.map((equipo) => (
                            <li key={equipo._id} className='equipo-card-list'>
                              <div className="equipo-card">
                                <div className="overlap-group-2">
                                  <div className="equipo-classname-p">{equipo.modelo_equipos.id_clase.clase}</div>
                                  <div className="equipo-oid">ID: {equipo._id}</div>
                                  <div className="serial-p">SN: {equipo.serie}</div>
                                  <LocationOnIcon className="location-icon" />
                                  <div className="location-text">{equipo.ubicacion}</div>
                                  <ManageHistoryIcon className="frequency-icon" />
                                  <div className="frequency-value">{equipo.frecuencia}</div>
                                  <div className="sede-name">{equipo.id_sede.sede_nombre}</div>
                                  <div className="sede-oid">ID: {equipo.id_sede._id}</div>
                                  <AccountBalanceIcon className="client-icon"/>
                                  <div className="client-name">{equipo.id_sede.id_client.client_name}</div>
                                  <LocationOnIcon className="icon"/>
                                  <div className="sede-address">{equipo.id_sede.sede_address}</div>
                                  <CallIcon className="sede-telephone-icon"/>
                                  <div className="sede-telephone-value">{equipo.id_sede.sede_telefono}</div>
                                  <button 
                                  className="seleccionar-button"
                                  type="button"
                                  onClick={() => handleEquipoSelection(equipo)}
                                  >
                                    Seleccionar Equipo
                                  </button>
                                  <RemoveRedEyeIcon 
                                    className="eye"
                                    onClick={() => handleEquipoFoundRedirect(equipo)}
                                  />
                                </div>
                              </div>
                            </li>
                           ))}
                          </ul>
                          <div className="text-wrapper">Equipos encontrados</div>
                        </div>
                      )}


                  {selectedEquipo && confirmedSelection && (
                  <div className={`equipo-selected ${isSearchActive ? "search-active" : ""}`}>
                      <div className="overlap-group-wrapper">
                        <div className="overlap-group-3">
                          <div className="equipo">{selectedEquipo.modelo_equipos.id_clase.clase}</div>
                          <div className="equipo-2">ID: {selectedEquipo._id}</div>
                          <div className="serial">SN: {selectedEquipo.serie}</div>
                          <LocationOnIcon className="location"/>
                          <div className="location-value">{selectedEquipo.ubicacion}</div>
                          <ManageHistoryIcon className="frecuency" />
                          <div className="frecuency-value">{selectedEquipo.frecuencia}</div>
                          <div className="sede-name-title">{selectedEquipo.id_sede.sede_nombre}</div>
                          <div className="sede">ID: {selectedEquipo.id_sede._id}</div>
                          <AccountBalanceIcon className="client"/>
                          <div className="client-2">{selectedEquipo.id_sede.id_client.client_name}</div>
                          <LocationOnIcon className="img"/>
                          <div className="sede-2">{selectedEquipo.id_sede.sede_address}</div>
                          <CallIcon className="sede-telephone" />
                          <div className="sede-telephone-2">{selectedEquipo.id_sede.sede_telefono}</div>
                          <RemoveRedEyeIcon 
                          className="eye"
                          onClick={handleEquipoSelectedRedirect}
                          />
                          <button className="confirmed-selection" onClick={() => setConfirmedSelection(false)}>
                            Confirmar Selección
                          </button>
                        </div>
                      </div>
                      <div className="equipo-selected-2">Información del Equipo Seleccionado</div>
                    </div>
                  )}
                  
                  {searchError && <p>{searchError}</p>}

                  {selectedEquipo && !confirmedSelection && (
                    <div className='confirmation-div'>
                      <p className='confirmation-question'>¿La información del equipo es la correcta para relacionar?</p>
                      <button
                        className='confirmation-yes'
                        type="button"
                        onClick={() => {
                          setConfirmedSelection(true);
                          setUseSelectedEquipo(true);
                        }}
                      >
                        Sí
                      </button>
                      <button
                        className='confirmation-no'
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


                  <div className="middle-separator"/>
                  <div className="section-2">
                    <div className="overlap-2">
                      <p className="text-wrapper-2">3- Solicitud creada en la fecha:</p>
                      <input
                      className="div-2"
                      type="text"
                      name="creacion"
                      value={solicitudData.creacion}
                      onChange={handleChange}
                      readOnly 
                      />
                    </div>
                    <div className="overlap-3">
                      <div className="text-wrapper-2">4- Aviso:</div>
                      <input 
                      className="div-2"
                      name="aviso"
                      value={solicitudData.aviso}
                      onChange={handleChange}
                      />
                    </div>
                    <div className="overlap-4">
                      <div className="text-wrapper-2">5- Observación:</div>
                      <input
                      className="div-2"
                      name="observacion"
                      value={solicitudData.observacion}
                      onChange={handleChange}
                      />
                    </div>

                    {isAdmin && (

                      <div>
                        <div className="overlap-5">
                          <div className="text-wrapper-2">5- Estado Solicitud:</div>
                          <input className="div-2"
                          name='id_solicitud_estado'
                          value={estadoAccion || solicitudData.id_solicitud_estado.estado}
                          readOnly
                          />
                        </div>
                        <CheckCircleIcon className="aprobar-icon" 
                        onClick={() => handleEstadoChange(estadoAprobadoId)} />
                        <div className="aprobar-text">Aprobar</div>
                        <CancelIcon className="rechazar-icon"
                        onClick={() => handleEstadoChange(estadoRechazadoId)}
                        />
                        <div className="rechazar-text">Rechazar</div>
                        <div className="overlap-6">
                          <div className="text-wrapper-2">5- Observación Estado:</div>
                          <textarea className="div-2"
                          name="observacion_estado"
                          value={solicitudData.observacion_estado}
                          onChange={handleChange}
                          />
                        </div>
                      </div>
)}
                    <button 
                    className="cancelar-button"
                    type="button"
                    onClick={onCancel}
                    >
                      Cancelar
                    </button>
                    <button
                    className="actualizar-button" 
                    type='submit'
                    >
                      Actualizar
                      </button>
                  </div>
                </div>
              </div>
            </div>



      </form>
    </div>
  );
};

export default EditSolicitudServiciosButton;
