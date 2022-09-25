import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';

// Styling.
import './Search.css';
import "antd/dist/antd.min.css";

// Components.
import SearchResultList from '../../components/search-bar/SearchResultList';

// // Constants
// import * as Constants from '../constants/GlobalConstants';

// Authentication
import { Auth } from "aws-amplify";

// Design Components
import { message, Pagination } from 'antd';

// Cookies
import Cookies from 'universal-cookie';

// UUID Utility.
const getUuid = require('uuid-by-string');

function Search() {
  const [searchResultList, setSearchResultList] = useState([]);
  const [show, setShow] = useState(false);
  const [showResults, setShowResults] = useState(false);  
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterState, setFilterState] = useState('All');
  const [pageNumber, setPageNumber] = useState(1);
  const [prevFilterState, setPrevFilterState] = useState('All');
  const [timeFilter, setTimeFilter] = useState('Any time');
  const [totalResults, setTotalResults] = useState(50);
  const searchText = searchParams.get("searchText");
  
  React.useEffect(() => {
    displayPaginationBar(false);
    displayFilterPanelBar(false);
    displayTimeFilterPanel(false);
  }, []);

  function displayPaginationBar(flag) {
    if (document.getElementById('paginationDivParentId') === null) return;
    if (flag === true) {
      document.getElementById('paginationDivParentId').style.display= 'block';
      document.getElementById('paginationDivParentId').style.display = 'flex';
      document.getElementById('paginationDivParentId').style.justifyContent = 'center';
      document.getElementById('paginationDivParentId').style.marginTop = '2.5em';
    } else {
      document.getElementById('paginationDivParentId').style.display = 'none';
    }
  }

  function displayFilterPanelBar(flag) {
    if (document.getElementById('filter-card-panel-id') === null) return;
    if (flag === true) {
      document.getElementById('filter-card-panel-id').style.display= 'flex';
      document.getElementById('filter-card-panel-id').style.justifyContent= 'space-around';
      document.getElementById('filter-card-panel-id').style.marginTop= '20px';      
    } else {
      document.getElementById('filter-card-panel-id').style.display = 'none';
    }
  }

  function getEventLabel(label) {
    if (label === '1') return 'Any time';
    if (label === '2') return 'Past hour';
    if (label === '3') return 'Past 24 hours';
    if (label === '4') return 'Past week';
    if (label === '5') return 'Past month';
    if (label === '6') return 'Past year';
    return '';
  }
  
  function displayTimeFilterPanel(flag) {
    if (document.getElementById('time-filter-dropdown-panel-id') === null) return;
    if (flag === true) {
      document.getElementById('time-filter-dropdown-panel-id').style.display= 'flex';
      document.getElementById('time-filter-dropdown-panel-id').style.marginLeft= '1em';
      document.getElementById('time-filter-dropdown-panel-id').style.marginTop= '1em';      
    } else {
      document.getElementById('time-filter-dropdown-panel-id').style.display = 'none';
    }
  }

  function getResultsWithQuery(query, requestHeaders) {
    fetch(query, requestHeaders)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        if (typeof(data.docs) !== 'undefined') {
          setSearchResultList(data.docs);
          setTotalResults(data.totalResults);          
          document.getElementById('searchSuggestionContainerId').style.display = 'none';
        }
        setShowResults(true);
        displayPaginationBar(true);
        displayFilterPanelBar(true);
        displayTimeFilterPanel(true);
      })
      .catch(console.log)
  }

  async function getResultsCognitoUser(userInput) {    
    const res = await Auth.currentSession();
    let accessToken = res.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const userId = accessToken.payload.sub;
    const query = process.env.REACT_APP_API_URL + '/search?searchText=' + searchText +"&userId=" + userId;                  
    const requestHeaders = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    };
    getResultsWithQuery(query, requestHeaders);
  }

  async function getResultsGoogleSSO(userInput) {
    const userAuth = await Auth.currentAuthenticatedUser();
    const requestHeaders = { 'method': 'GET' };
    const userId = getUuid(userAuth.email);
    console.log(searchText);
    const query = process.env.REACT_APP_API_URL + '/google/search?searchText=' + searchText + "&userId="+ userId;                  
    getResultsWithQuery(query, requestHeaders);
  } 

  async function getResults(userInput) {    
    const cookies = new Cookies();
    const loginType = cookies.get('loginType');
    if (loginType === 'cognito') {
      getResultsCognitoUser(userInput);
    } else {
      getResultsGoogleSSO(userInput);
    }
  }

  function onClickSearchButton() {
    const userInput = searchText;
    if (userInput !== '') {
      getResults(userInput);
    }
  }


function handlePaginationChange(pageNumber) {
  setPageNumber(pageNumber);
}


function getFilterUnderlineId(filterStateInput) {
  if (filterStateInput === 'All') return 'allUnderline';
  if (filterStateInput === 'Emails') return 'emailsUnderline';
  if (filterStateInput === 'Calendar') return 'calendarUnderline';
  if (filterStateInput === 'Docs') return 'docsUnderline';
  if (filterStateInput === 'Chats') return 'chatsUnderline';
  if (filterStateInput === 'Commits') return 'commitsUnderline';
  return '';
}


useEffect(() => {
  onClickSearchButton();
}, [pageNumber])

useEffect(() => {
  onClickSearchButton();
  if (document.getElementById(getFilterUnderlineId(prevFilterState)) !== null) {
    document.getElementById(getFilterUnderlineId(prevFilterState)).style.display = 'none';
  }
  if (document.getElementById(getFilterUnderlineId(filterState)) !== null) {
    document.getElementById(getFilterUnderlineId(filterState)).style.display = 'block';
  }
}, [filterState])

useEffect(() => {
  onClickSearchButton();
}, [timeFilter])

  return (
    <div className="search-page-container">
      <div className="search-parent">
        <SearchResultList searchResultList={searchResultList} />
          {
            searchResultList.length === 0 && showResults && (
              <div className="emptySearchResultContainer">
                <p>It looks like there aren't many great matches for your search. Try using another query.</p>
              </div>
            )
          }
          <div className="paginationDivParent" id ="paginationDivParentId">
            <Pagination className="paginationDiv" onChange = {handlePaginationChange} defaultCurrent={1} total={totalResults} />
          </div>
          {/* <div className="flex-container">
            <button type="button" onClick={onClickSearchButton} className="btn btn-light search-btn margin-left-1-rem">Search</button>
          <button type="button" onClick={showModal} className="btn btn-light search-btn margin-left-1-rem">Add An Application</button>
        </div> */}
      </div>
    </div>
  );
}

export default Search;
