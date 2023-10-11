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
        className='
        text-base
        rounded-3xl 
        w-[250px] 
        h-[40px] 
        text-dark-purple 
        px-4 
        placeholder-dark-purple 
        placeholder:italic
        placeholder-opacity-50 
        breakpoint-xsmall:w-[350px] 
        breakpoint-xsmall:px-8  
        breakpoint-small:w-[350px]
        breakpoint-med:block 
        breakpoint-med:rounded-3xl 
        breakpoint-med:w-[450px] 
        breakpoint-med:h-[45px] 
        breakpoint-med:text-xl 
        breakpoint-med:placeholder:text-xl 
        breakpoint-large:block
        breakpoint-large:px-12 
        breakpoint-large:rounded-[40px] 
        breakpoint-large:w-[700px] 
        breakpoint-large:h-[60px] 
        breakpoint-large:text-xl 
        breakpoint-large:placeholder:text-xl'
        type="text"
        placeholder="Search for movies..."
        value={searchText}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
