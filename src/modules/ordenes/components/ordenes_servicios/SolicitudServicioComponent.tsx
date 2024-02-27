import React from 'react';
import { SolicitudServicio } from '../../../solicitudes/utils/types/SolicitudServicio.type';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DescriptionIcon from '@mui/icons-material/Description';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import EmailIcon from '@mui/icons-material/Email';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ClassIcon from '@mui/icons-material/Class';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined';
import QrCodeIcon from '@mui/icons-material/QrCode';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useNavigate } from 'react-router-dom';

interface SolicitudServicioComponentProps {
  solicitudServicio: SolicitudServicio;
}

const SolicitudServicioComponent: React.FC<SolicitudServicioComponentProps> = ({ solicitudServicio }) => {
  const navigate = useNavigate();

  const renderEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return <HelpOutlinedIcon className="SolicitudServicioComponent-estado-pendiente" />;
      case 'Aprobada':
        return <CheckCircleIcon className="SolicitudServicioComponent-estado-aprobada" />;
      case 'Rechazada':
        return <CancelIcon className="SolicitudServicioComponent-estado-rechazada" />;
      default:
        return null; // o puedes poner un icono por defecto
    }
  };

  const handleClickIdCreador = () => {
    if (solicitudServicio !== null && solicitudServicio.id_creador) {
      navigate(`/users/${solicitudServicio.id_creador._id}`);
    }
  };
  
  const handleClickIdCambiador = () => {
    if (solicitudServicio !== null && solicitudServicio.id_cambiador) {
      navigate(`/users/${solicitudServicio.id_cambiador._id}`);
    }
  };
  
  const handleClickIdCliente = () => {
    if (solicitudServicio !== null && solicitudServicio.id_equipo.id_sede.id_client._id) {
      navigate(`/clientes/${solicitudServicio.id_equipo.id_sede.id_client._id}`);
    }
  };

  const handleClickIdEquipo = () => {
    if (solicitudServicio !== null && solicitudServicio.id_equipo._id) {
      navigate(`/equipos/${solicitudServicio.id_equipo._id}`);
    }
  };

  const handleClickIdSede = () => {
    if (solicitudServicio !== null && solicitudServicio.id_equipo.id_sede._id) {
      navigate(`/sedes/${solicitudServicio.id_equipo.id_sede._id}`);
    }
  };
  const handleClickIdSolicitud = () => {
    if (solicitudServicio !== null && solicitudServicio._id) {
      navigate(`/solicitudes-servicios/${solicitudServicio._id}`);
    }
  };
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
                  <p className="solicitud-id" onClick={handleClickIdSolicitud}>SOLICITUD DE SERVICIO - {solicitudServicio._id || 'N/A'}</p>
                </div>
              </header>
              <div className="geninfo-section">
                <div className="overlap">
                  <div className="geninfo-title">GENERAL</div>
                  <HomeRepairServiceIcon className="service-icon"/>
                  <div className="service-value">{solicitudServicio.id_servicio.servicio || 'N/A'}</div>
                  <CalendarMonthIcon className="created-icon"/>
                  <div className="created-value">{solicitudServicio.creacion || 'N/A'}</div>
                  <div className="geninfo-separator"/>
                  <AnnouncementIcon className="aviso-icon"/>
                  <div className="aviso-value">{solicitudServicio.aviso || 'N/A'}</div>
                  <DescriptionIcon className="observacion-icon"/>
                  <div className="observacion-value">{solicitudServicio.observacion || 'N/A'}</div>
                </div>
              </div>
              <div className="estado-section">
                <div className="overlap-2">
                {renderEstadoIcon(solicitudServicio.id_solicitud_estado.estado)}

                  <div className="estado-value">{solicitudServicio.id_solicitud_estado.estado || 'N/A'}</div>
                  <div className="estado-separator"/>
                  <div className="text-wrapper">{solicitudServicio.observacion_estado || 'N/A'}</div>
                </div>
              </div>
              <div className="creator-section">
                <div className="overlap-3">
                  <div className="overlap-4">
                    <div className="creador-title">CREADOR SOLICITUD</div>
                    <div className="creador-oid">ID: {solicitudServicio.id_creador._id || 'N/A'}</div>
                    <RemoveRedEyeIcon className="eye" onClick={handleClickIdCreador}/>
                  </div>
                  <div className="overlap-5">
                    <PersonIcon className="username-icon"/>
                    <div className="creador-username">{solicitudServicio.id_creador.username || 'N/A'}</div>
                    <CallIcon className="telephone-icon"/>
                    <div className="creador-telephone">{solicitudServicio.id_creador.telefono || 'N/A'}</div>
                    <div className="overlap-6">
                      <ContactEmergencyIcon className="cc-icon"/>
                      <div className="creador-cc">{solicitudServicio.id_creador.cedula || 'N/A'}</div>
                      <EmailIcon className="email-icon"/>
                      <div className="overlap-7">
                        <div className="creador-email">{solicitudServicio.id_creador.email || 'N/A'}</div>
                        <div className="separator-info">
                          <div className="overlap-group-2">
                            <div className="line"/>
                            <div className="img"/>
                            <div className="ellipse" />
                          </div>
                        </div>
                      </div>
                      <div className="separator"/>
                    </div>
                  </div>
                  <div className="overlap-8">
                    <div className="actualizador-title">ACTUALIZADOR ESTADO</div>
                    <div className="actualizador-oid">ID: {solicitudServicio.id_cambiador._id || 'N/A'}</div>
                    <RemoveRedEyeIcon className="eye" onClick={handleClickIdCambiador}/>
                  </div>
                  <PersonIcon className="user"/>
                  <div className="actualizador">{solicitudServicio.id_cambiador.username || 'N/A'}</div>
                  <ContactEmergencyIcon className="cc"/>
                  <div className="actualizador-cc">{solicitudServicio.id_cambiador.cedula || 'N/A'}</div>
                  <CallIcon className="telephone"/>
                  <div className="actualizador-2">{solicitudServicio.id_cambiador.telefono || 'N/A'}</div>
                  <EmailIcon className="email"/>
                  <div className="actualizador-email">{solicitudServicio.id_cambiador.email || 'N/A'}</div>
                  <div className="separator-2"/>
                </div>
              </div>
              <div className="equipo-section">
                <div className="overlap-9">
                  <div className="client-info">
                    <div className="overlap-group-3">
                      <div className="client-title">CLIENTE</div>
                      <RemoveRedEyeIcon className="eye-2" onClick={handleClickIdCliente}/>
                    </div>
                    <div className="client-oid">ID: {solicitudServicio.id_equipo.id_sede.id_client._id || 'N/A'}</div>
                    <AccountBalanceIcon className="clientname-icon"/>
                    <div className="clientname-value">{solicitudServicio.id_equipo.id_sede.id_client.client_name || 'N/A'}</div>
                    <ReceiptLongIcon className="nit-icon"/>
                    <div className="nit-value">{solicitudServicio.id_equipo.id_sede.id_client.client_nit || 'N/A'}</div>
                    <CallIcon className="clientphone-icon"/>
                    <div className="clientphone-value">{solicitudServicio.id_equipo.id_sede.id_client.client_telefono || 'N/A'}</div>
                    <div className="clientinfo-separator"/>
                    <EmailIcon className="clientemail-icon"/>
                    <div className="clientemail-value">{solicitudServicio.id_equipo.id_sede.id_client.client_email || 'N/A'}</div>
                  </div>
                  <div className="separator-info-2">
                    <div className="line-2" />
                    <div className="line-3"/>
                    <div className="ellipse-2" />
                  </div>
                </div>
                <div className="equipo-info">
                  <div className="overlap-10">
                    <div className="equipo-title">EQUIPO</div>
                    <div className="equipo-oid">ID: {solicitudServicio.id_equipo._id || 'N/A'}</div>
                    <RemoveRedEyeIcon className="eye-3" onClick={handleClickIdEquipo} />
                  </div>
                  <ClassIcon className="class-icon"/>
                  <div className="class-value">{solicitudServicio.id_equipo.modelo_equipos.id_clase.clase || 'N/A'}</div>
                  <LocalOfferOutlinedIcon className="marca-icon"/>
                  <div className="marca-value">{solicitudServicio.id_equipo.modelo_equipos.id_marca.marca || 'N/A'}</div>
                  <DevicesOtherOutlinedIcon className="model-icon"/>
                  <div className="model-value">{solicitudServicio.id_equipo.modelo_equipos.modelo || 'N/A'}</div>
                  <div className="equipoinfo-separator"/>
                  <QrCodeIcon className="serial-icon"/>
                  <div className="serial-value">{solicitudServicio.id_equipo.serie || 'N/A'}</div>
                  <div className="client-wrapper">
                    <SpaceDashboardIcon className="client"/>
                  </div>
                  <div className="overlap-11">
                    <div className="text-wrapper-2">{solicitudServicio.id_equipo.id_area.area || 'N/A'}</div>
                  </div>
                  <LocationOnIcon className="ubicacion-icon"/>
                  <div className="ubicacion-value">{solicitudServicio.id_equipo.ubicacion || 'N/A'}</div>
                </div>
                <div className="overlap-wrapper">
                  <div className="overlap-group-2">
                    <div className="line-4" />
                    <div className="line-5" />
                    <div className="ellipse-2" />
                  </div>
                </div>
                <div className="sede-info">
                  <div className="overlap-12">
                    <div className="sede-title">SEDE</div>
                    <RemoveRedEyeIcon className="eye-2" onClick={handleClickIdSede}/>
                  </div>
                  <div className="sede-oid">ID: {solicitudServicio.id_equipo.id_sede._id || 'N/A'}</div>
                  <ApartmentIcon className="sede-icon"/>
                  <div className="sede-nombre">{solicitudServicio.id_equipo.id_sede.sede_nombre || 'N/A'}</div>
                  <LocationOnIcon className="location-icon"/>
                  <div className="sede-address">{solicitudServicio.id_equipo.id_sede.sede_address || 'N/A'}</div>
                  <div className="sedeinfo-separator"/>
                  <CallIcon className="sedetelephone-icon"/>
                  <div className="sede-telefono">{solicitudServicio.id_equipo.id_sede.sede_telefono || 'N/A'}</div>
                  <EmailIcon className="sedeemail-icon"/>
                  <div className="sede-email">{solicitudServicio.id_equipo.id_sede.sede_email || 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>


    </div>
  );
};

export default SolicitudServicioComponent;
