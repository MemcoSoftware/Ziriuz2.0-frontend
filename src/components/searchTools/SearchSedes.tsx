import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { searchSedesByKeyword } from '../../services/sedesService'; // Asegúrate de importar la función adecuada
import { useSessionStorage } from '../../hooks/useSessionStorage';

interface SearchSedesProps {
  showSearchResults: boolean;
  setShowSearchResults: (value: boolean) => void;
}

const SearchSedes: React.FC<SearchSedesProps> = ({ showSearchResults, setShowSearchResults }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]); // Especifica el tipo de searchResults
  const loggedIn = useSessionStorage('sessionJWTToken');

  useEffect(() => {
    if (showSearchResults && searchKeyword) {
      // Realiza la búsqueda solo si showSearchResults es true y hay una palabra clave
      searchSedesByKeyword(loggedIn, searchKeyword) // Corrige el nombre de la función
        .then((response: AxiosResponse) => {
          if (response.status === 200 && response.data) {
            setSearchResults(response.data); // Actualiza los resultados de la búsqueda
          }
        })
        .catch((error: any) => console.error(`[SEARCH SEDES ERROR] ${error}`));
    } else {
      setSearchResults([]); // Borra los resultados si no se está realizando una búsqueda
    }
  }, [showSearchResults, searchKeyword, loggedIn]);

  return (
    <div>
      <h2>Buscar Sedes:</h2>
      <input
        type="text"
        placeholder="Palabra clave"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <button onClick={() => setShowSearchResults(true)}>Buscar</button>
      {showSearchResults && (
        <div>
          {searchResults.length === 0 ? (
            <p>No se encontraron resultados de búsqueda.</p>
          ) : (
            <ul>
              {searchResults.map((sede: { _id: string; sede_nombre: string }) => (
                <li key={sede._id}>{sede.sede_nombre}</li>
                // Puedes renderizar otros campos de la sede si son necesarios
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSedes;
