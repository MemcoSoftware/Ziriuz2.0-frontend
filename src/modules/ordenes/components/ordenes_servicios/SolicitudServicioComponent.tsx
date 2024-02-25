import React from 'react';
import { SolicitudServicio } from '../../../solicitudes/utils/types/SolicitudServicio.type';

interface SolicitudServicioComponentProps {
  solicitudServicio: SolicitudServicio;
}

const SolicitudServicioComponent: React.FC<SolicitudServicioComponentProps> = ({ solicitudServicio }) => {
  return (
    <div>
      <p>ID Solicitud Servicio: {solicitudServicio._id || 'N/A'}</p>
      <p>ID Creador: {solicitudServicio.id_creador._id || 'N/A'}</p>
      <p>ID Servicio: {solicitudServicio.id_servicio._id || 'N/A'}</p>
      <p>ID Equipo: {solicitudServicio.id_equipo._id || 'N/A'}</p>
      {/* Agrega más detalles de la solicitud de servicio aquí si es necesario */}
      <div className="solicitudes">
            <div className="div">
              <header className="header">
                <div className="overlap-group">
                  <p className="solicitud-id">SOLICITUD DE SERVICIO - {solicitudServicio._id || 'N/A'}</p>
                </div>
              </header>
              <div className="geninfo-section">
                <div className="overlap">
                  <div className="geninfo-title">GENERAL</div>
                  <img className="service-icon" alt="Service icon" src="service-icon.png" />
                  <div className="service-value">{solicitudServicio.id_servicio.servicio || 'N/A'}</div>
                  <img className="created-icon" alt="Created icon" src="created-icon.png" />
                  <div className="created-value">{solicitudServicio.creacion || 'N/A'}</div>
                  <img className="geninfo-separator" alt="Geninfo separator" src="geninfo-separator.svg" />
                  <img className="aviso-icon" alt="Aviso icon" src="aviso-icon.png" />
                  <div className="aviso-value">{solicitudServicio.aviso || 'N/A'}</div>
                  <img className="observacion-icon" alt="Observacion icon" src="observacion-icon.png" />
                  <div className="observacion-value">{solicitudServicio.observacion || 'N/A'}</div>
                </div>
              </div>
              <div className="estado-section">
                <div className="overlap-2">
                  <img className="estado-icon" alt="Estado icon" src="estado-icon.png" />
                  <div className="estado-value">{solicitudServicio.id_solicitud_estado.estado || 'N/A'}</div>
                  <img className="estado-separator" alt="Estado separator" src="estado-separator.svg" />
                  <div className="text-wrapper">{solicitudServicio.observacion_estado || 'N/A'}</div>
                </div>
              </div>
              <div className="creator-section">
                <div className="overlap-3">
                  <div className="overlap-4">
                    <div className="creador-title">CREADOR SOLICITUD</div>
                    <div className="creador-oid">ID: {solicitudServicio.id_creador._id || 'N/A'}</div>
                    <img className="eye" alt="Eye" src="eye.png" />
                  </div>
                  <div className="overlap-5">
                    <img className="username-icon" alt="Username icon" src="username-icon.png" />
                    <div className="creador-username">{solicitudServicio.id_creador.username || 'N/A'}</div>
                    <img className="telephone-icon" alt="Telephone icon" src="telephone-icon.png" />
                    <div className="creador-telephone">{solicitudServicio.id_creador.telefono || 'N/A'}</div>
                    <div className="overlap-6">
                      <img className="cc-icon" alt="Cc icon" src="cc-icon.png" />
                      <div className="creador-cc">{solicitudServicio.id_creador.cedula || 'N/A'}</div>
                      <img className="email-icon" alt="Email icon" src="email-icon.png" />
                      <div className="overlap-7">
                        <div className="creador-email">{solicitudServicio.id_creador.email || 'N/A'}</div>
                        <div className="separator-info">
                          <div className="overlap-group-2">
                            <img className="line" alt="Line" src="line-4.svg" />
                            <img className="img" alt="Line" src="line-5.svg" />
                            <div className="ellipse" />
                          </div>
                        </div>
                      </div>
                      <img className="separator" alt="Separator" src="separator-1.svg" />
                    </div>
                  </div>
                  <div className="overlap-8">
                    <div className="actualizador-title">ACTUALIZADOR ESTADO</div>
                    <div className="actualizador-oid">ID: {solicitudServicio.id_cambiador._id || 'N/A'}</div>
                    <img className="eye" alt="Eye" src="image.png" />
                  </div>
                  <img className="user" alt="User" src="user-icon2.png" />
                  <div className="actualizador">{solicitudServicio.id_cambiador.username || 'N/A'}</div>
                  <img className="cc" alt="Cc" src="cc-icon2.png" />
                  <div className="actualizador-cc">{solicitudServicio.id_cambiador.cedula || 'N/A'}</div>
                  <img className="telephone" alt="Telephone" src="telephone-icon2.png" />
                  <div className="actualizador-2">{solicitudServicio.id_cambiador.telefono || 'N/A'}</div>
                  <img className="email" alt="Email" src="email-icon2.png" />
                  <div className="actualizador-email">{solicitudServicio.id_cambiador.email || 'N/A'}</div>
                  <img className="separator-2" alt="Separator" src="separator-3.svg" />
                </div>
              </div>
              <div className="equipo-section">
                <div className="overlap-9">
                  <div className="client-info">
                    <div className="overlap-group-3">
                      <div className="client-title">CLIENTE</div>
                      <img className="eye-2" alt="Eye" src="eye-2.png" />
                    </div>
                    <div className="client-oid">ID: {solicitudServicio.id_equipo.id_sede.id_client._id || 'N/A'}</div>
                    <img className="clientname-icon" alt="Clientname icon" src="clientname-icon.png" />
                    <div className="clientname-value">{solicitudServicio.id_equipo.id_sede.id_client.client_name || 'N/A'}</div>
                    <img className="nit-icon" alt="Nit icon" src="nit-icon.png" />
                    <div className="nit-value">{solicitudServicio.id_equipo.id_sede.id_client.client_nit || 'N/A'}</div>
                    <img className="clientphone-icon" alt="Clientphone icon" src="clientphone-icon.png" />
                    <div className="clientphone-value">{solicitudServicio.id_equipo.id_sede.id_client.client_telefono || 'N/A'}</div>
                    <img className="clientinfo-separator" alt="Clientinfo separator" src="clientinfo-separator.svg" />
                    <img className="clientemail-icon" alt="Clientemail icon" src="clientemail-icon.png" />
                    <div className="clientemail-value">{solicitudServicio.id_equipo.id_sede.id_client.client_email || 'N/A'}</div>
                  </div>
                  <div className="separator-info-2">
                    <img className="line-2" alt="Line" src="image.svg" />
                    <img className="line-3" alt="Line" src="line-5-2.svg" />
                    <div className="ellipse-2" />
                  </div>
                </div>
                <div className="equipo-info">
                  <div className="overlap-10">
                    <div className="equipo-title">EQUIPO</div>
                    <div className="equipo-oid">ID: {solicitudServicio.id_equipo._id || 'N/A'}</div>
                    <img className="eye-3" alt="Eye" src="eye-3.png" />
                  </div>
                  <img className="class-icon" alt="Class icon" src="class-icon.png" />
                  <div className="class-value">{solicitudServicio.id_equipo.modelo_equipos.id_clase.clase || 'N/A'}</div>
                  <img className="marca-icon" alt="Marca icon" src="marca-icon.png" />
                  <div className="marca-value">{solicitudServicio.id_equipo.modelo_equipos.id_marca.marca || 'N/A'}</div>
                  <img className="model-icon" alt="Model icon" src="model-icon.png" />
                  <div className="model-value">{solicitudServicio.id_equipo.modelo_equipos.modelo || 'N/A'}</div>
                  <img className="equipoinfo-separator" alt="Equipoinfo separator" src="equipoinfo-separator.svg" />
                  <img className="serial-icon" alt="Serial icon" src="serial-icon.png" />
                  <div className="serial-value">{solicitudServicio.id_equipo.serie || 'N/A'}</div>
                  <div className="client-wrapper">
                    <img className="client" alt="Client" src="client.png" />
                  </div>
                  <div className="overlap-11">
                    <div className="text-wrapper-2">{solicitudServicio.id_equipo.id_area.area || 'N/A'}</div>
                  </div>
                  <img className="ubicacion-icon" alt="Ubicacion icon" src="ubicacion-icon.png" />
                  <div className="ubicacion-value">{solicitudServicio.id_equipo.ubicacion || 'N/A'}</div>
                </div>
                <div className="overlap-wrapper">
                  <div className="overlap-group-2">
                    <img className="line-4" alt="Line" src="line-4-2.svg" />
                    <img className="line-5" alt="Line" src="line-5-3.svg" />
                    <div className="ellipse-2" />
                  </div>
                </div>
                <div className="sede-info">
                  <div className="overlap-12">
                    <div className="sede-title">SEDE</div>
                    <img className="eye-2" alt="Eye" src="eye-4.png" />
                  </div>
                  <div className="sede-oid">ID: {solicitudServicio.id_equipo.id_sede._id || 'N/A'}</div>
                  <img className="sede-icon" alt="Sede icon" src="sede-icon.png" />
                  <div className="sede-nombre">{solicitudServicio.id_equipo.id_sede.sede_nombre || 'N/A'}</div>
                  <img className="location-icon" alt="Location icon" src="location-icon.png" />
                  <div className="sede-address">{solicitudServicio.id_equipo.id_sede.sede_address || 'N/A'}</div>
                  <img className="sedeinfo-separator" alt="Sedeinfo separator" src="sedeinfo-separator.svg" />
                  <img className="sedetelephone-icon" alt="Sedetelephone icon" src="sedetelephone-icon.png" />
                  <div className="sede-telefono">{solicitudServicio.id_equipo.id_sede.sede_telefono || 'N/A'}</div>
                  <img className="sedeemail-icon" alt="Sedeemail icon" src="sedeemail-icon.png" />
                  <div className="sede-email">{solicitudServicio.id_equipo.id_sede.sede_email || 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>


    </div>
  );
};

export default SolicitudServicioComponent;
