import React from 'react';
import '../../styles/SearchResultList.css';
import SearchResultRender from './SearchResultRender';

const SearchResultList = ({ searchResultList }) => {
  return (
    <div>
      {searchResultList.map((result) => (
        <SearchResultRender result = {result} />
      ))}
    </div>
  )
};

export default SearchResultList;