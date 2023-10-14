import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../features/search/searchSlice';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  // Get the search query from Redux
  const searchQuery = useSelector((state) => state.search); 
  const [isFocused, setIsFocused] = useState(false);

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
    <div className='relative'>
      <input
        className='
        text-base
        rounded-3xl 
        w-[250px] 
        h-[40px] 
        text-dark-purple 
        pl-4 
        pr-[40px]
        placeholder-dark-purple 
        placeholder:italic
        placeholder-opacity-50 
        breakpoint-xsmall:w-[350px] 
        breakpoint-xsmall:pl-8  
        breakpoint-small:w-[350px]
        breakpoint-med:block 
        breakpoint-med:rounded-3xl 
        breakpoint-med:w-[450px] 
        breakpoint-med:h-[45px] 
        breakpoint-med:text-xl 
        breakpoint-med:placeholder:text-xl 
        breakpoint-med:pr-[45px]
        breakpoint-large:block
        breakpoint-large:pl-12
        breakpoint-large:pr-[62px] 
        breakpoint-large:rounded-[40px] 
        breakpoint-large:w-[700px] 
        breakpoint-large:h-[60px] 
        breakpoint-large:text-xl 
        breakpoint-large:placeholder:text-xl'
        type="text"
        placeholder="Search for movies..."
        value={searchText}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)} 
      />
      <div className={`absolute right-0 z-20 top-[30%] bottom-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isFocused ? 'fill-bright-orange' : 'fill-dark-purple'} transition-all duration-500`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='breakpoint-med:w-[28px] breakpoint-med:h-[28px] breakpoint-large:w-[36px] breakpoint-large:h-[36px]'>
        <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"/></svg>
      </div>
    </div>
  );
};

export default SearchBar;
