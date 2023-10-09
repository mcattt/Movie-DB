import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../features/search/searchSlice';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search); // Get the search query from Redux

  // Update the local searchText when the Redux search query changes
  if (searchQuery !== searchText) {
    setSearchText(searchQuery);
  }

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchText(query);
    // Account for empty spaces being the only key that a user enters
    dispatch(setSearchQuery(query));
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
