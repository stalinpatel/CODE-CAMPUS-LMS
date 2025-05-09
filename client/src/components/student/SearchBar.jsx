import React, { useEffect, useState } from 'react';
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input)
  }

  return (
    <div className=' w-full flex items-center justify-center'>
      <form onSubmit={onSearchHandler} className='flex items-center justify-center  bg-white border border-gray-500/20 max-w-3xl mx-auto w-full h-10 sm:h-12 md:h-14   rounded'>
        <img src={assets.searchIcon} alt="search_icon" className='md:w-auto w-10 px-1.5 sm:px-3' />
        <input
          onChange={e => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder='Search for courses'
          className='w-full h-full outline-none text-gray-500/80'
        />
        <button type='submit' className=' bg-blue-600 rounded text-white  px-3 sm:px-5  md:px-10   md:py-3 py-2 mx-1'>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;

