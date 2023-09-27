import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../features/search/searchSlice';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchText(query);
    // Account for empty spaces being the only key that a user enters
    if (query.trim() !== '') {
      dispatch(setSearchQuery(query));
    }
  };

  return (
    <div>
      <input
        className='rounded-3xl w-[760px] h-[75px]'
        type="text"
        placeholder="Search for movies..."
        value={searchText}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
