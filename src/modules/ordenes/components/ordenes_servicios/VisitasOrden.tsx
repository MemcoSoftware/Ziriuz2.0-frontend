import React from 'react';
import './styles/VisitaOrden.css';

// Importamos todos los íconos necesarios
import HelpIcon from '@mui/icons-material/Help';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PersonIcon from '@mui/icons-material/Person';


interface VisitasOrdenProps {
  visitas: any[];
}

const VisitasOrden: React.FC<VisitasOrdenProps> = ({ visitas }) => {

  // Función para seleccionar el ícono basado en el estado de la visita
  const EstadoIcono = ( estado : string) => {
    switch (estado) {
      case 'Pendiente':
        return <HelpIcon className="estado-pendiente" />;
      case 'Abierta':
        return <LockOpenIcon className="estado-abierto" />;
      case 'Cerrada':
        return <DoNotDisturbOnOutlinedIcon className="estado-cerrado" />;
      case 'Rechazada':
        return <DoNotDisturbAltOutlinedIcon className="estado-rechazado" />;
      default:
        return <HelpIcon className="estado-desconocido" />;
    }
  };

  return (
    <div>
      <div className="visitas">
        <div className="div">
          <header className="header">
            <div className="overlap-group">
              <div className="visita-title">VISITAS</div>
            </div>
          </header>
          <div className="all-visitas">
            <div className="overlap">
              <div className="navbar">
                <div className="pendiente-t">PENDIENTES</div>
                <div className="estados" />
                <div className="abierta-t">ABIERTAS</div>
                <div className="estados-separator" />
                <div className="cerrada-title">CERRADAS</div>
                <div className="img" />
                <div className="rechazada-t">RECHAZADAS</div>
              </div>
              <div className="visitas-list">
                <ul>
                  {visitas.map((visita, index) => (
                    <li className="visita-card" key={index}>
                      <div className="overlap-group-2">
                        <div className="oid-card">ID: {visita._id}</div>
                        <div className="separator"/>
                        <div className="separator-card"/>

                        {/* Renderizamos el ícono basado en el estado de la visita */}
                        {EstadoIcono(visita.id_visita_estado.estado)}

                        <CalendarMonthOutlinedIcon className="inicio-icon"/>
                        <div className="inicio-date">{visita.fecha_inicio}</div>
                        <EngineeringIcon className="tecnico-icon"/>
                        <div className="tecnico-name">{visita.id_responsable.username}</div>
                        <CalendarTodayOutlinedIcon className="created-icon"/>
                        <AddOutlinedIcon className="created-icon-add"/>
                        <div className="created-date">{visita.fecha_creacion}</div>
                        <PersonIcon className="user-icon"/>
                        <div className="user-creator">{visita.id_cerrador.username}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitasOrden;
