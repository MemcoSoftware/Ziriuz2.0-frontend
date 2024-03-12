import React, { useState, useEffect } from 'react';
import { getVisitaById } from '../../../visitas/services/visitasService';
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

interface VisitaByIdPendienteProps {
  idVisita: string;
}

const VisitaByIdPendiente: React.FC<VisitaByIdPendienteProps> = ({ idVisita }) => {
  const [visita, setVisita] = useState<any>(null);
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
                  <ArrowBackIcon className="ejecutar-icon"/>
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
                        <HelpIcon className="img-2"/>
                        <div className="separator-estado"/>
                        <DoNotDisturbAltIcon className="decline-icon"/>
                        <div className="decline-t">Rechazar</div>
                        <LockOpenIcon className="aprove-icon"/>
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
                    {/* <div className="estado-section">
                      <div className="overlap-4">
                        <div className="text-wrapper-3">ESTADO</div>
                        <img className="img-2" alt="Estado ic" src="estado-ic.png" />
                        <div className="estado-text">Aprobando visita</div>
                        <img className="separator-4" alt="Separator" src="separator-20.svg" />
                        <div className="observacion-title">OBSERVACIÓN ESTADO</div>
                        <div className="observacion-text">aprobada</div>
                        <img className="back-icon" alt="Back icon" src="back-icon.png" />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

        </div>
      )}
    </div>
  );
};

export default VisitaByIdPendiente;
