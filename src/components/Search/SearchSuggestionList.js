import React from 'react';

// Components
import SearchSuggestionItem from './SearchSuggestionItem';

// Styles
import '../../styles/SearchSuggestionList.css';

function SearchSuggestionList(props) {
  const filteredData = props.filteredData;
  return (
    <>
      <div className="search-suggestion-list-container" id='searchSuggestionContainerId'>
      {filteredData !== undefined && filteredData.length !== 0 && (        
          <ul className='dataResult'>
          {filteredData.slice(0, 5).map((suggestion, index) => {
            let className = "dataItem";
            if (index === props.activeSuggestion) {
              className = "dataItem suggestion-active";
            }
            return (
              <SearchSuggestionItem key={suggestion.display_text} className={className} onClick={props.onClick} value={suggestion} index={index}/>
              );
          })}
          </ul>

      )}
       </div>
   </>
  );
}

export default SearchSuggestionList;
