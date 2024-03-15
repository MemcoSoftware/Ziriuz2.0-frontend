import React, { useState, useEffect } from 'react';
import { getVisitaById, updateVisita } from '../../../visitas/services/visitasService';
import { useSessionStorage } from '../../hooks/useSessionStorage';

// STYLES
import './styles/VisitaByIdPendiente.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HelpIcon from '@mui/icons-material/Help';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface VisitaByIdPendienteProps {
  idVisita: string;
  onClose: () => void;
}

const VisitaByIdPendiente: React.FC<VisitaByIdPendienteProps> = ({ idVisita, onClose  }) => {
  const [visita, setVisita] = useState<any>(null);
  const [approvalStatus, setApprovalStatus] = useState<boolean | null>(null);
  const [showEstadoSection, setShowEstadoSection] = useState<boolean>(true); 
  const [observacionAprobacion, setObservacionAprobacion] = useState<string>('');
  const token = useSessionStorage('sessionJWTToken');

  useEffect(() => {
    if (token && idVisita) {
      getVisitaById(token, idVisita)
        .then(data => {
          setVisita(data);
        })
        .catch(error => console.error('Error al obtener la visita por ID:', error));
    }
  }, [token, idVisita]);

// Función para manejar la aprobación de la visita
const handleApproval = (isApproved: boolean) => {
  // Actualizar el estado de aprobación
  setApprovalStatus(isApproved);
  // Volver a mostrar la sección de estado
  setShowEstadoSection(true);
  // Aquí puedes agregar lógica adicional para enviar el estado de aprobación al backend si es necesario
};

const handleUpdateEstado = () => {
  if (token && idVisita && approvalStatus !== null) {
    const estadoId = approvalStatus ? '65c560b5cb319b5fbc4220d3' : '65c560c8cb319b5fbc4220d9';
    const dataToUpdate = {
      id_visita_estado: estadoId,
      observacion_aprobacion: observacionAprobacion // Agregamos la observación de aprobación
    };
    updateVisita(token, idVisita, dataToUpdate)
      .then(() => {
        const message = approvalStatus ? 'Visita APROBADA exitosamente' : 'Visita RECHAZADA exitosamente';
        window.alert(message);
        window.location.reload();
      })
      .catch(error => console.error('Error al actualizar la visita:', error));
  }
};
const handleBackIconClickEstado = () => {
  // Ocultar la sección de estado
  setShowEstadoSection(false);
};

const handleBackIconCloseComponent = () => {
  // Ocultar la sección de estado
  setShowEstadoSection(false);
  onClose();
};


  return (
    <div>
      {/* Renderiza los detalles de la visita aquí */}
      {visita && (
        <div>
          {/* <p>ID Visita: {visita._id}</p>
          <p>Estado: {visita.id_visita_estado.estado}</p> */}
           <div className="visita-pendiente">
                <div className="div">
                  <header className="header">
                    <div className="overlap-group">
                      <div className="text-wrapper">VISITA SELECCIONADA - {visita && visita._id || 'N/A'}</div>
                    </div>
                  </header>
                  <ArrowBackIcon className="ejecutar-icon" onClick={handleBackIconCloseComponent}/>
                  <div className="overlap">
                    <div className="ejecucion-div">
                      <div className="overlap-2">
                        <div className="rectangle" />
                        <div className="text-wrapper-2">INFO EJECUCIÓN</div>
                        <CalendarMonthIcon className="ejecucion-icon"/>
                        <div className="ejecucion-data">{visita && visita.fecha_inicio || 'N/A'}</div>
                        <AccessTimeFilledIcon className="time-icon"/>
                        <div className="time-data">{visita && visita.duracion || 'N/A'}</div>
                        <div className="separator">
                          <div className="overlap-group-2">
                            <div className="ellipse" />
                            <div className="line"/>
                            <div className="line2"/>
                          </div>
                          <div className="overlap-3">
                            <div className="img"/>
                            <div className="line-2"/>
                          </div>
                        </div>
                        <div className="tecnico-title">TÉCNICO ENCARGADO</div>
                        <div className="tecnico-oid">ID: {visita && visita.id_responsable._id || 'N/A'}</div>
                        <EngineeringIcon className="tecnico-icon"/>
                        <div className="tecnico-name">{visita && visita.id_responsable.username || 'N/A'}</div>
                        <ContactEmergencyIcon className="cedula-icon"/>
                        <div className="cedula-name">{visita && visita.id_responsable.cedula || 'N/A'}</div>
                        <EmailIcon className="email-icon"/>
                        <div className="email-data">{visita && visita.id_responsable.email || 'N/A'}</div>
                        <LocalPhoneIcon className="telephone-icon"/>
                        <div className="telephone-data">{visita && visita.id_responsable.telefono || 'N/A'}</div>
                        <div className="separator-2">
                          <div className="overlap-group-2">
                            <div className="ellipse" />
                            <div className="line"/>
                          </div>
                          <div className="overlap-3">
                            <div className="img"/>
                            {/* <div className="line-2" /> */}
                          </div>
                        </div>
                        <div className="protocolos-title">ACTIVIDADES PROGRAMADAS</div>
                        <div className="actividades-list">
                          <ul>
                            {visita && visita.ids_protocolos && visita.ids_protocolos.map((protocolo: any) => (
                              <li key={protocolo._id} className="rectangle-2">
                                {protocolo.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="change-estado">
                      <div className="overlap-4">
                        <div className="text-wrapper-3">ESTADO</div>
                        <HelpIcon className="img-2-pending"/>
                        <div className="separator-estado"/>
                        <DoNotDisturbAltIcon className="decline-icon" onClick={() => handleApproval(false)}/>
                        <div className="decline-t">Rechazar</div>
                        <LockOpenIcon className="aprove-icon" onClick={() => handleApproval(true)}/>
                        <div className="aprove-t">Aprobar</div>
                      </div>
                    </div>
                    <div className="creation-div">
                      <div className="overlap-5">
                        <div className="creation-t">INFO CREACIÓN</div>
                        <CalendarTodayIcon className="created-icon"/>
                        <div className="created-date">{visita && visita.fecha_creacion || 'N/A'}</div>
                        <div className="sede-ejecutar">EJECUTAR EN SEDE:</div>

                        <div className={`ejecutar-switch ${visita.ejecutar_sede ? 'on' : 'off'}`}>
                          <input
                            className='ejecutar-input'
                            type="checkbox"
                            checked={visita.ejecutar_sede}
                            readOnly
                          />
                          <span className="slider round"></span>
                        </div>


                        <div className="separator-3">
                          <div className="overlap-group-3">
                            <div className="elipse" />
                            <div className="line-3"/>
                          </div>
                          <img className="line-4" />
                        </div>
                        <div className="creator-title">CREADOR</div>
                        <PersonIcon className="tecnico-i"/>
                        <div className="tecnico-n">{visita && visita.id_creador.username || 'N/A'}</div>
                        <ContactEmergencyIcon className="cedula-i"/>
                        <div className="cedula-n">{visita && visita.id_creador.cedula || 'N/A'}</div>
                        <EmailIcon className="email-i"/>
                        <div className="email-n">{visita && visita.id_creador.email || 'N/A'}</div>
                        <LocalPhoneIcon className="telephone-i"/>
                        <div className="telephone-n">{visita && visita.id_creador.telefono || 'N/A'}</div>
                      </div>
                    </div>
                     {/* Renderizado condicional del estado */}
                    {showEstadoSection && approvalStatus !== null && (
                      <div className="estado-section">
                        <div className="overlap-4">
                          <div className="text-wrapper-3">ESTADO</div>
                          {approvalStatus ? <CheckCircleIcon className="img-2-aprooved" /> : <DoNotDisturbAltIcon className="img-2-rejected" />}
                          <div className="estado-text">{approvalStatus ? 'Aprobando visita' : 'Rechazando visita'}</div>
                          <div className="separator-4"/>
                          <div className="observacion-title">OBSERVACIÓN ESTADO</div>
                          <input
                            type="text"
                            value={observacionAprobacion}
                            onChange={(e) => setObservacionAprobacion(e.target.value)}
                            placeholder="Ingrese observación"
                            className="observacion-text"
                          />
                          <button className='update-estado-button' onClick={handleUpdateEstado}>Actualizar</button>
                          <ArrowBackIcon className="back-icon" onClick={handleBackIconClickEstado}/>
                        </div>
                      </div>
                     )}
                  </div>
                </div>
              </div>

        </div>
      )}
    </div>
  );
};

export default VisitaByIdPendiente;
