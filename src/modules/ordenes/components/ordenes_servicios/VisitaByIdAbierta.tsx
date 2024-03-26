import React, { useState, useEffect } from 'react';
import { getVisitaById } from '../../../visitas/services/visitasService';
import { useSessionStorage } from '../../hooks/useSessionStorage';

import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import './styles/VisitaByIdAbierta.css'
import TecnicoEnSede from '../../../visitas/components/visitas/TecnicoEnSede';
import ActividadesVisitas from './ActividadesVisitas';
import ActividadesEjecutar from '../../../visitas/components/visitas/ActividadesEjecutar';
interface VisitaByIdAbiertaProps {
  idVisita: string;
}

const VisitaByIdAbierta: React.FC<VisitaByIdAbiertaProps> = ({ idVisita }) => {
  const [visita, setVisita] = useState<any>(null);
  const token = useSessionStorage('sessionJWTToken');

  // TECNICO EN SEDE STATES
  const [mostrarTecnicoEnSede, setMostrarTecnicoEnSede] = useState(false);

  const [nuevaActividad, setNuevaActividad] = useState<any>(null);

  const [mostrarActividadesEjecutar, setMostrarActividadesEjecutar] = useState(false);

  
    const agregarNuevaActividad = (actividad: any) => {
        setNuevaActividad(actividad);
        // Aquí podrías actualizar la visita con la nueva actividad o lo que necesites hacer.
    };

  useEffect(() => {
    if (token && idVisita) {
      getVisitaById(token, idVisita)
        .then(data => {
          setVisita(data);
          setMostrarActividadesEjecutar(false);
        })
        .catch(error => console.error('Error al obtener la visita por ID:', error));
    }
  }, [token, idVisita]); // Dependencia añadida para detectar cambios en idVisita

  const handlePlayClick = () => {
    setMostrarActividadesEjecutar(true);
  };

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
           <div className="visita-abierta">
                <div className="div">
                  <header className="header">
                    <div className="overlap-group">
                      <div className="visita-title">VISITA SELECCIONADA - {visita && visita._id || 'N/A'}</div>
                    </div>
                  </header>
                  <PlayCircleFilledIcon className="execute-icon" onClick={handlePlayClick}/>
                  <div className="overlap">
                    <div className="ejecucion-div">
                      <div className="overlap-2">
                        <div className="container" />
                        <div className="info-execution">
                          <div className="info-title">INFO EJECUCIÓN</div>
                          <CalendarMonthIcon className="date-icon" />
                          <div className="date-t">{visita && visita.fecha_inicio || 'N/A'}</div>
                          <AccessTimeFilledIcon className="time-icon"/>
                          <div className="time-title">{visita && visita.duracion || 'N/A'}</div>
                        </div>
                        <div className="separator">
                          <div className="overlap-3">
                            <div className="ellipse" />
                            <div className="line"/>
                          </div>
                          <div className="overlap-group-2">
                            <div className="line-2"/>
                          </div>
                        </div>
                        <div className="tecnico-section">
                          <div className="tecnico-title">TÉCNICO ENCARGADO</div>
                          <div className="tecnico-oid">ID: {visita && visita.id_responsable._id || 'N/A'}</div>
                          <EngineeringIcon className="tecnico-icon"/>
                          <div className="tecnico-name">{visita && visita.id_responsable.username || 'N/A'}</div>
                          <ContactEmergencyIcon className="id-icon"/>
                          <div className="cedula-value">{visita && visita.id_responsable.cedula || 'N/A'}</div>
                          <EmailIcon className="email-icon"/>
                          <div className="email-value">{visita && visita.id_responsable.email || 'N/A'}</div>
                          <LocalPhoneIcon className="telephone-icon"/>
                          <div className="telephone-value">{visita && visita.id_responsable.telefono || 'N/A'}</div>
                        </div>
                        <div className="separator-2">
                          <div className="overlap-3">
                            <div className="ellipse" />
                            <div className="line"/>
                          </div>
                          <img className="line-3"/>
                        </div>
                          <div className="protocolos-title">ACTIVIDADES PROGRAMADAS</div>
                        <div className="actividades-list">
                          <ul className="actividades-ul">
                            {visita && visita.ids_protocolos && visita.ids_protocolos.map((protocolo: any) => (

                              <li className="rectangle" key={protocolo._id}>
                                {protocolo.title}
                              </li> 
                             ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="estado-div">
                      <div className="overlap-4">
                        <div className="overlap-5">
                          <div className="overlap-group-3">
                            <div className="estado-title">ESTADO</div>
                            <LockOpenIcon className="estado-icon"/>
                          </div>
                          <div className="line-4"/>
                          <div className="observacion-t">OBSERVACIÓN</div>
                          <div className="observacion-value">{visita && visita.observacion_aprobacion || 'N/A'}</div>
                        </div>
                        <div className="aproved-t">APROBADA POR:</div>
                        <div className="aprobador-value">{visita.id_aprobador && visita.id_aprobador.username || 'N/A'}</div>
                      </div>
                    </div>
                    <div className="creation-div">
                      <div className="overlap-6">
                        <div className="creation-info">INFO CREACIÓN</div>
                        <CalendarTodayIcon className="created-icon"/>
                        <div className="created-date">{visita && visita.fecha_creacion || 'N/A'}</div>


                        <div className="insede-t">EJECUTAR EN SEDE:</div>
                        <div className={`VisitaByIdAbierta-switch ${visita.ejecutar_sede ? 'VisitaByIdAbierta-on' : 'VisitaByIdAbierta-off'}`}>
                          <input
                          className="VisitaByIdAbierta-ejecutar-input"
                          type="checkbox"
                          checked={visita.ejecutar_sede}
                          readOnly
                          />
                          <span className='VisitaByIdAbierta-slider VisitaByIdAbierta-round'></span>
                        </div>


                        <div className="separator-3">
                          <div className="overlap-group-4">
                            <div className="ellipse-2" />
                            <div className="line-5"/>
                            <div className="line-6"/>
                          </div>
                        </div>
                        <div className="creator-title">CREADOR</div>
                        <PersonIcon className="user-i"/>
                        <div className="user-t">{visita && visita.id_creador.username || 'N/A'}</div>
                        <EmailIcon className="id-i"/>
                        <div className="text-wrapper">{visita && visita.id_creador.cedula || 'N/A'}</div>
                        <LocalPhoneIcon className="email"/>
                        <div className="email-t">{visita && visita.id_creador.email || 'N/A'}</div>
                        <LocalPhoneIcon className="telephone-i"/>
                        <div className="telephone-t">{visita && visita.id_creador.telefono || 'N/A'}</div>
                      </div>
                    </div>

                    {/* RENDERIZADO ACTIVIDADES EJECUTADAS EN VISITA ABIERTA */}
                    {visita.actividades && visita.actividades.length > 0 && !mostrarActividadesEjecutar && (
                      <ActividadesVisitas idVisita={idVisita} />
                    )}

                    {/* RENDERIZADO ACTIVIDADES A EJECUTAR */}
                    {mostrarActividadesEjecutar && (
                      <ActividadesEjecutar idVisita={idVisita} />
                    )}
                  </div>
                </div>
              </div>
        </div>
      )}

       
       
    </div>
  );
};

export default VisitaByIdAbierta;
