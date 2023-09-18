import React from 'react';

interface SearchResultsProps {
  users: any[]; // Asume que users es un array de usuarios
}

const SearchUsersResults: React.FC<SearchResultsProps> = ({ users }) => {
  return (
    <div>
      <h2>Resultados de la búsqueda:</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUsersResults;
