import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchUsersByKeyword } from '../../services/usersService'; // Asegúrate de importar la función de búsqueda
import { useSessionStorage } from '../../hooks/useSessionStorage';

const SearchComponent = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const loggedIn = useSessionStorage('sessionJWTToken');

  const handleSearch = async () => {
    try {
      const response = await searchUsersByKeyword(loggedIn, keyword);

      if (response.status === 200 && response.data.users) {
        const searchResults = response.data.users;

        // Verifica si hay resultados antes de redirigir
        if (searchResults.length > 0) {
          // Redirige a la página de resultados de búsqueda
          navigate('/searchUsers');
        } else {
          // Muestra un mensaje o realiza alguna acción si no hay resultados
          console.log('No se encontraron resultados de búsqueda.');
        }
      } else {
        console.error('Search Error: Invalid response from server');
        throw new Error(`Error searching Users ${response.data}`);
      }
    } catch (error) {
      console.error('Search Error:', error);
    }
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Buscar usuarios...'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchComponent;
