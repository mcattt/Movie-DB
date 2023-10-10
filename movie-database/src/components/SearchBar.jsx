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
        rounded-3xl 
        w-[350px] 
        h-[40px] 
        breakpoint-med:block 
        breakpoint-med:rounded-3xl 
        breakpoint-med:w-[450px] 
        breakpoint-med:h-[50px] 
        breakpoint-med:text-xl 
        breakpoint-med:placeholder:text-xl 
        breakpoint-large:block 
        breakpoint-large:rounded-[40px] 
        breakpoint-large:w-[760px] 
        breakpoint-large:h-[75px] 
        text-light-purple 
        breakpoint-large:text-2xl 
        pl-9 
        placeholder-light-purple 
        placeholder:italic 
        breakpoint-large:placeholder:text-2xl'
        type="text"
        placeholder="Search for movies..."
        value={searchText}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
