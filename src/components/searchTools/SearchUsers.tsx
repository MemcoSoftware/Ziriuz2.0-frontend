import React, { useState } from 'react';

const SearchComponent = ({ onSearch }: any) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = async () => {
    onSearch(keyword); // Llama a la función de búsqueda en UsersPages
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
