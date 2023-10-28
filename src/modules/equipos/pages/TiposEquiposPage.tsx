import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllTiposEquipos } from '../services/tiposEquipoService';
import { TipoEquipo } from '../utils/types/TipoEquipo.type';
import TipoEquipoCard from '../components/tiposEquipos/TipoEquipoCard';
import { useNavigate } from 'react-router-dom';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import SearchTiposEquipos from '../components/searchEquiposTools/SearchTiposEquipos'; // Importa SearchTiposEquipos

const TiposEquiposPage = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [tiposEquipos, setTiposEquipos] = useState<Array<TipoEquipo>>([]);
  const [showSearchResults, setShowSearchResults] = useState(false); // Nuevo estado
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      getAllTiposEquipos(loggedIn)
        .then((data: TipoEquipo[]) => {
          setTiposEquipos(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [loggedIn]);

  const handleViewDetails = (id: string) => {
    navigate(`/equipos/tipos/${id}`);
  };

  return (
    <div>
      <DashboardMenuLateral />
      <h1>Tipos de Equipos</h1>
      {loggedIn ? (
        <div>
          <SearchTiposEquipos // Renderiza el componente SearchTiposEquipos
            showSearchResults={showSearchResults} // Inicialmente, no muestra los resultados de la búsqueda
            setShowSearchResults={setShowSearchResults} // Esta función no se utiliza inicialmente
          />
          {showSearchResults ? (
            <p></p>
          ) : (
            <ul>
              {tiposEquipos.map((tipoEquipo) => (
                <li key={tipoEquipo._id}>
                  <TipoEquipoCard
                    tipoEquipo={tipoEquipo}
                    onViewDetails={() => handleViewDetails(tipoEquipo._id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>Please log in to view data.</p>
      )}
    </div>
  );
};

export default TiposEquiposPage;
