import React, { useState, useEffect } from 'react';
import { getOrdenById } from '../services/ordenesService';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import { useNavigate, useParams } from 'react-router-dom';
import { Orden } from '../utils/types/Orden.type';
import './styles/OrdenDetailPage.css';
import { useSessionStorage } from '../../users/hooks/useSessionStorage';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SolicitudServicioComponent from '../components/ordenes_servicios/SolicitudServicioComponent';

const OrdenDetailPage: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const { id } = useParams();
  const [orden, setOrden] = useState<Orden | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    if (!id) {
      console.error('ID de la orden no encontrado en la URL');
      return;
    }

    const fetchOrden = async () => {
      try {
        const token = loggedIn;
        const result = await getOrdenById(token, id);
    
        setOrden(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles de la orden:', error);
      }
    };
    
    fetchOrden();
  }, [loggedIn, id]);

  const handleEditSuccess = () => {
    console.log('Orden editada con éxito');
    setIsEditing(false);
  };

  return (
    <div>
      <DashboardMenuLateral />

      {isEditing ? (
        // <EditOrdenButton
        //   ordenId={id || ''}
        //   onEditSuccess={handleEditSuccess}
        //   onCancel={() => setIsEditing(false)}
        //   initialData={orden}
        // />
        <></>
      ) : (
        <div className="OrdenDetailPage">
                <div className="OrdenDetailPage-box">
                      <div className="OrdenDetailPage-orden-servicio">
                        <div className="OrdenDetailPage-body">
                          <div className="OrdenDetailPage-overlap">
                            <div className="OrdenDetailPage-container" />
                            <header className="OrdenDetailPage-header">
                              <div className="OrdenDetailPage-overlap-group">
                                <p className="OrdenDetailPage-orden-id">ORDEN DE SERVICIO - {orden ? orden._id : 'N/A'}</p>
                                <CheckCircleIcon className="OrdenDetailPage-check-icon"/>
                                <CalendarMonthIcon className="OrdenDetailPage-date-icon"/>
                                <div className="OrdenDetailPage-date-created">{orden ? orden.creacion : 'N/A'}</div>
                              </div>
                            </header>
                            <ArrowForwardIosOutlinedIcon className="OrdenDetailPage-right-arrow" />
                            <ArrowBackIosNewOutlinedIcon className="OrdenDetailPage-left-arrow"/>


                            {orden && orden.id_solicitud_servicio && (
                            <SolicitudServicioComponent solicitudServicio={orden.id_solicitud_servicio} />
                            )}

                            
                          </div>
                        </div>
                      </div>

                    </div>

        </div>
      )}

    </div>
  );
};

export default OrdenDetailPage;
