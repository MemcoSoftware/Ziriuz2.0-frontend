import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllSedes } from '../services/sedesService'; // Asegúrate de importar la función adecuada
import { AxiosResponse } from 'axios';
import DashboardMenuLateral from '../components/dashboard/DashboardMenulateral';
import './styles/SedesPages.css';
import DefaultSedeImg from './img/defaultSedeImg.png';
import SedeCard from '../components/sedes/SedeCard'; // Asegúrate de importar el componente adecuado
import SearchSedes from '../components/searchTools/SearchSedes'; // Si necesitas una barra de búsqueda para las sedes

export const SedesPages = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const navigate = useNavigate();

  const [sedes, setSedes] = useState({ list: [], totalPages: 1, currentPage: 1 });
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      return navigate('/login');
    } else {
      getAllSedes(loggedIn, 9, 1) // Asegúrate de utilizar la función correcta y los parámetros necesarios
        .then((response: AxiosResponse) => {
          if (
            response.status === 200 &&
            response.data.sedes &&
            response.data.totalPages &&
            response.data.currentPage
          ) {
            let { sedes, totalPages, currentPage } = response.data;
            setSedes({ list: sedes, totalPages, currentPage });
          } else {
            throw new Error(`Error obtaining Sedes ${response.data}`);
          }
        })
        .catch((error) => console.error(`[GET ALL SEDES ERROR] ${error}`));
    }
  }, [loggedIn]);

  const navigateToSedeDetail = (id: string) => {
    navigate(`/sedes/${id}`);
  };

  return (
    <div className='SedesPages-container'>
      <DashboardMenuLateral />
      <SearchSedes
        showSearchResults={showSearchResults}
        setShowSearchResults={setShowSearchResults}
      />
      <div className='SedesPages-Container-Card'>
        {showSearchResults ? (
          <p></p>
        ) : (
          sedes.list.map((sede: any) => (
            <SedeCard key={sede._id} sede={sede} onClick={() => navigateToSedeDetail(sede._id)} />
          ))
        )}
      </div>
    </div>
  );
};
