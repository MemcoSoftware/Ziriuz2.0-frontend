// import React, { useState, useEffect } from 'react';
// import { useSessionStorage } from '../hooks/useSessionStorage';
// import { getRepuestoEquipoById } from '../services/repuestosEquiposService'; // Ajusta el servicio según tus necesidades
// import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
// import { useNavigate, useParams } from 'react-router-dom';
// import EditRepuestoEquipoButton from '../components/repuestosEquipos/EditRepuestoEquipoButton'; // Ajusta el componente según tus necesidades
// import DeleteRepuestoEquipoButton from '../components/repuestosEquipos/DeleteRepuestoEquipoButton'; // Ajusta el componente según tus necesidades
// import { getClientById } from '../../users/services/clientsService';
// import { RepuestoEquipo } from '../utils/types/RepuestoEquipo.type';
// import { Client } from '../../users/utils/types/Client.type';

// // Estilos e iconos importados
// import './styles/RepuestoEquipoDetailPage.css'; // Ajusta la ruta según tus necesidades
// import FaxOutlinedIcon from '@mui/icons-material/FaxOutlined';
// import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
// import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
// import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
// import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
// import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';

// const RepuestoEquipoDetailPage: React.FC = () => {
//   const loggedIn = useSessionStorage('sessionJWTToken');
//   const { id } = useParams();
//   const [repuestoEquipo, setRepuestoEquipo] = useState<RepuestoEquipo | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [client, setClient] = useState<Client | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loggedIn) {
//       // Manejar la redirección si el usuario no está autenticado
//       return;
//     }

//     if (!id) {
//       // Maneja el caso en el que id es undefined (parámetro no encontrado en la URL)
//       console.error('ID del repuesto_equipo no encontrado en la URL');
//       return;
//     }

//     const fetchRepuestoEquipo = async () => {
//       try {
//         const token = loggedIn;
//         // Cambiado el servicio para obtener detalles de repuesto_equipo
//         const result = await getRepuestoEquipoById(token, id);

//         setRepuestoEquipo(result);
//         setLoading(false);

//         // Obtener los detalles del cliente utilizando la función getClientById
//         if (result && result.id_sede && result.id_sede.id_client) {
//           const clientResponse = await getClientById(token, result.id_sede.id_client);
//           const clientData = clientResponse.data; // Extraer el cuerpo de la respuesta
//           setClient(clientData);
//         }
//       } catch (error) {
//         console.error('Error al obtener detalles del repuesto_equipo:', error);
//       }
//     };

//     fetchRepuestoEquipo();
//   }, [loggedIn, id]);

//   const handleEditSuccess = () => {
//     console.log('Repuesto_equipo editado con éxito');
//     setIsEditing(false);
//   };

//   return (
//     <div>
//       <DashboardMenuLateral />

//       {isEditing ? (
//         <EditRepuestoEquipoButton
//           repuestoEquipoId={id || ''}
//           onEditSuccess={handleEditSuccess}
//           onCancel={() => setIsEditing(false)}
//           initialData={repuestoEquipo}
//         />
//       ) : (
//         <div className="RepuestoEquipoDetailPage-box">
//           <div className="RepuestoEquipoDetailPage-complete-details">
//             {/* Estructura del detalle del repuesto_equipo */}
//             {/* Ajusta las clases y estilos según tus necesidades */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RepuestoEquipoDetailPage;
