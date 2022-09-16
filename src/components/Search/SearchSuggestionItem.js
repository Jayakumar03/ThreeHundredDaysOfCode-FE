import React from 'react';

// Styles
import '../../styles/SearchSuggestionItem.css';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';

function SearchSuggestionItem(props) {
  const isHistory = props.value.query_completion_type === 'HISTORY';
  return (
    <li
      key={props.value.display_text}
      className={props.className}
      onClick={props.onClick}>
        <div className="searchIcon">{isHistory ?  <HistoryIcon /> : <SearchIcon /> }</div>      
      <a> <p> {props.value.display_text} </p> </a>
   </li>
  );
}

export default SearchSuggestionItem;
