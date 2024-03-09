import React, { useState, useEffect } from 'react';
import { getVisitaById } from '../../../visitas/services/visitasService';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import './styles/VisitaByIdPendiente.css';
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
                  <img className="ejecutar-icon" alt="Ejecutar icon" src="ejecutar-icon.png" />
                  <div className="overlap">
                    <div className="ejecucion-div">
                      <div className="overlap-2">
                        <div className="rectangle" />
                        <div className="text-wrapper-2">INFO EJECUCIÓN</div>
                        <img className="ejecucion-icon" alt="Ejecucion icon" src="ejecucion-icon.png" />
                        <div className="ejecucion-data">{visita && visita.fecha_inicio || 'N/A'}</div>
                        <img className="time-icon" alt="Time icon" src="time-icon.png" />
                        <div className="time-data">{visita && visita.duracion || 'N/A'}</div>
                        <div className="separator">
                          <div className="overlap-group-2">
                            <div className="ellipse" />
                            <img className="line" alt="Line" src="line-8.svg" />
                          </div>
                          <div className="overlap-3">
                            <img className="img" alt="Line" src="line-6.svg" />
                            <img className="line-2" alt="Line" src="line-7.svg" />
                          </div>
                        </div>
                        <div className="tecnico-title">TÉCNICO ENCARGADO</div>
                        <div className="tecnico-oid">ID: {visita && visita.id_responsable._id || 'N/A'}</div>
                        <img className="tecnico-icon" alt="Tecnico icon" src="tecnico-icon.png" />
                        <div className="tecnico-name">{visita && visita.id_responsable.username || 'N/A'}</div>
                        <img className="cedula-icon" alt="Cedula icon" src="cedula-icon.png" />
                        <div className="cedula-name">{visita && visita.id_responsable.cedula || 'N/A'}</div>
                        <img className="email-icon" alt="Email icon" src="email-icon.png" />
                        <div className="email-data">{visita && visita.id_responsable.email || 'N/A'}</div>
                        <img className="telephone-icon" alt="Telephone icon" src="telephone-icon.png" />
                        <div className="telephone-data">{visita && visita.id_responsable.telefono || 'N/A'}</div>
                        <div className="separator-2">
                          <div className="overlap-group-2">
                            <div className="ellipse" />
                            <img className="line" alt="Line" src="line-8-2.svg" />
                          </div>
                          <div className="overlap-3">
                            <img className="img" alt="Line" src="image.svg" />
                            <img className="line-2" alt="Line" src="line-7-2.svg" />
                          </div>
                        </div>
                        <div className="protocolos-title">ACTIVIDADES PROGRAMADAS</div>
                        <div className="actividades-list">
                          <div className="rectangle-2" />
                        </div>
                      </div>
                    </div>
                    <div className="change-estado">
                      <div className="overlap-4">
                        <div className="text-wrapper-3">ESTADO</div>
                        <img className="img-2" alt="Pending icon" src="pending-icon.png" />
                        <img className="separator-estado" alt="Separator estado" src="separator-estado.svg" />
                        <img className="decline-icon" alt="Decline icon" src="decline-icon.png" />
                        <div className="decline-t">Rechazar</div>
                        <img className="aprove-icon" alt="Aprove icon" src="aprove-icon.png" />
                        <div className="aprove-t">Aprobar</div>
                      </div>
                    </div>
                    <div className="creation-div">
                      <div className="overlap-5">
                        <div className="creation-t">INFO CREACIÓN</div>
                        <img className="created-icon" alt="Created icon" src="created-icon.png" />
                        <div className="created-date">{visita && visita.fecha_creacion || 'N/A'}</div>
                        <div className="sede-ejecutar">EJECUTAR EN SEDE:</div>
                        <img className="ejecutar-input" alt="Ejecutar input" src="ejecutar-input.png" />
                        <div className="separator-3">
                          <div className="overlap-group-3">
                            <div className="elipse" />
                            <img className="line-3" alt="Line" src="line-11.svg" />
                          </div>
                          <img className="line-4" alt="Line" src="line-10.svg" />
                        </div>
                        <div className="creator-title">CREADOR</div>
                        <img className="tecnico-i" alt="Tecnico i" src="tecnico-i.png" />
                        <div className="tecnico-n">{visita && visita.id_creador.username || 'N/A'}</div>
                        <img className="cedula-i" alt="Cedula i" src="cedula-i.png" />
                        <div className="cedula-n">{visita && visita.id_creador.cedula || 'N/A'}</div>
                        <img className="email-i" alt="Email i" src="email-i.png" />
                        <div className="email-n">{visita && visita.id_creador.email || 'N/A'}</div>
                        <img className="telephone-i" alt="Telephone i" src="telephone-i.png" />
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
