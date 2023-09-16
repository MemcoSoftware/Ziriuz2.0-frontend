// SearchResults.tsx
import React from 'react';
import UserCard from '../users/UserCard'; // Asegúrate de importar el componente UserCard correctamente

interface SearchResultsProps {
  users: any[]; // Asume que users es un array de usuarios
}

const SearchResults: React.FC<SearchResultsProps> = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user._id} user={user} onClick={() => {/* Define aquí la acción al hacer clic */}} />
      ))}
    </div>
  );
};

export default SearchResults;
