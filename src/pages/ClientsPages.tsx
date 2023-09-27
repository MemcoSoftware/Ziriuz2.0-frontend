import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllClients } from '../services/clientsService';
import { AxiosResponse } from 'axios';
import ClientCard from '../components/clients/ClientCard';
import './styles/ClientsPages.css'
import DashboardMenuLateral from '../components/dashboard/DashboardMenulateral';

export const ClientsPages = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [clients, setClients] = useState({ list: [] });
  const navigate = useNavigate(); // Obtiene la función de navegación

  useEffect(() => {
    if (!loggedIn) {
      // Redirigir al inicio de sesión si no hay un usuario autenticado
      window.location.href = '/login';
    } else {
      getAllClients(loggedIn, 9, 1)
        .then((response: AxiosResponse) => {
          if (response.status === 200 && response.data.clients) {
            setClients({ list: response.data.clients });
          } else {
            throw new Error(`Error obtaining Clients: ${response.data}`);
          }
        })
        .catch((error) => console.error(`[GET ALL CLIENTS ERROR] ${error}`));
    }
  }, [loggedIn]);

  const navigateToClientDetail = (id: string) => {
    navigate(`/clientes/${id}`); 
  };

  return (
    <div className='ClientsPages-container'>
        <DashboardMenuLateral />
      
      <div className='ClientsPages-Container-Card'>
        {clients.list.map((client: any) => (
          <ClientCard
            key={client._id}
            client={client}
            onClick={() => navigateToClientDetail(client._id)} 
          />
        ))}
      </div>
    </div>
  );
}
