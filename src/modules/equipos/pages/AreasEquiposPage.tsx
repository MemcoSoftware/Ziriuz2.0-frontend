import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllAreasEquipos } from '../services/areasEquiposService';
import { AreaEquipo } from '../utils/types/AreaEquipo.type';
import AreaEquipoCard from '../components/areasEquipos/AreaEquipoCard';
import { useNavigate } from 'react-router-dom';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import SearchAreasEquipos from '../components/searchEquiposTools/SearchAreasEquipos';

const AreasEquiposPage = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [areasEquipos, setAreasEquipos] = useState<Array<AreaEquipo>>([]);
  const [showSearchResults, setShowSearchResults] = useState(false); // Nuevo estado
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      getAllAreasEquipos(loggedIn)
        .then((data: AreaEquipo[]) => {
          setAreasEquipos(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [loggedIn]);

  const handleViewDetails = (id: string) => {
    navigate(`/equipos/areas/${id}`);
  };

  return (
    <div>
      <DashboardMenuLateral />
      <h1>Áreas de Equipos</h1>
      {loggedIn ? (
        <div>
          <SearchAreasEquipos // Renderiza el componente SearchAreasEquipos
            showSearchResults={showSearchResults} // Inicialmente, no muestra los resultados de la búsqueda
            setShowSearchResults={setShowSearchResults} // Esta función no se utiliza inicialmente
          />
          {showSearchResults ? (
            <p></p>
          ) : (
            <ul>
              {areasEquipos.map((areaEquipo) => (
                <li key={areaEquipo._id}>
                  <AreaEquipoCard
                    areaEquipo={areaEquipo}
                    onViewDetails={() => handleViewDetails(areaEquipo._id)}
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

export default AreasEquiposPage;