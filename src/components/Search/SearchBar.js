import React, { useState } from 'react';

// Components
import SearchSuggestionList from './SearchSuggestionList';

// Styles
import '../../styles/SearchBar.css';
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

// Icons
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// Authentication
import { Auth } from "aws-amplify";

// Cookies
import Cookies from 'universal-cookie';

// Libraries
import { useAppContext } from "../../lib/contextLib";

// UUID Utility.
const getUuid = require('uuid-by-string');

function SearchBar(props) {  
  let navigate = useNavigate();

  // State for the SearchBar.
  const { filteredSuggestions, setFilteredSuggestions, activeSuggestion, setActiveSuggestion } = useAppContext();
  const [userInput, setUserInput] = useState("");

  React.useEffect(() => {
    const url = window.location.href;
    var position = url.search("searchText");
    if (position !== -1) {
      var searchText = url.substring(position + 11);
      if (searchText !== 'undefined' && typeof searchText !== undefined && searchText !== "" && searchText !== userInput && userInput === '') {
        setUserInput(searchText);
        // props.getResults(searchText);        
      }
    }
    if (userInput.length === 0) {
      document.getElementById('clearBtn').style.display = 'none';
    }
    if (userInput.length > 0) {
      document.getElementById('clearBtn').style.display = 'block';
    }
  }, [userInput, props]);

  function clearInput() {
    console.log('in clear input');
    setFilteredSuggestions([]);
    setActiveSuggestion(-1);    
    setUserInput("");
    document.getElementById('searchSuggestionContainerId').style.display = 'none';
    navigate("/search");
  } 

  async function getCompletionsFromInput(userInput) {
    const cookies = new Cookies();
    const loginType = cookies.get('loginType');
    if (loginType === 'cognito') {
      getCompletionsCognitoUser(userInput);
    } else {
      getCompletionsGoogleSSO(userInput);
    }
  }

  async function onChange(e) {
    const userInput = e.currentTarget.value;
    if ((typeof userInput === undefined) || (userInput === null)) {
      clearInput();
      return;
    }
    getCompletionsFromInput(userInput);
  }

  async function getCompletionsCognitoUser(userInput) {
    const query = process.env.REACT_APP_API_URL + '/autoComplete?searchText=' + userInput;
    const res = await Auth.currentSession();
    let accessToken = res.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const requestHeaders = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    };
    getCompletions(userInput, query, requestHeaders);
  }

  async function getCompletionsGoogleSSO(userInput) {
    const userAuth = await Auth.currentAuthenticatedUser();
    const requestHeaders = { 'method': 'GET' };
    const userId = getUuid(userAuth.email);
    const query = process.env.REACT_APP_API_URL + '/google/autoComplete?searchText=' + userInput + "&userId="+ userId;
    getCompletions(userInput, query, requestHeaders);
  }

  function getCompletions(userInput, query, requestHeaders) {    
    fetch(query, requestHeaders)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data.completions !== undefined) {          
          setFilteredSuggestions(data.completions);
        } else {
          setFilteredSuggestions([]);
        }
      })
      .catch(console.log)
    setFilteredSuggestions([]);
    setActiveSuggestion(-1);    
    setUserInput(userInput);
  }

  function onKeyDown(e) {
    // User pressed the enter key.
    if (e.keyCode === 13) {
      const userInput = document.getElementById('searchBox').value;
      setActiveSuggestion(-1);      
      setFilteredSuggestions([]);      
      setUserInput(userInput);
      navigate("/search?searchText=" + userInput);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) { return; }
      setUserInput(filteredSuggestions[activeSuggestion - 1].display_text);
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if ((activeSuggestion + 1) === filteredSuggestions.length) {
        return;
      }
      setUserInput(filteredSuggestions[activeSuggestion + 1].display_text);
      setActiveSuggestion(activeSuggestion + 1);
    }
  }  

  async function handleClick(e) {
    const userInput = document.getElementById('searchBox').value;
    getCompletionsFromInput(userInput);
  }

  function onClick(e) {    
    setActiveSuggestion(-1);
    setFilteredSuggestions([]);
    const userInput = e.currentTarget.innerText;
    setUserInput(userInput);
    navigate("/search?searchText=" + userInput);
  }

  return (
    <div>
    <div className="search">
      <div className="search-input-box-container">
        <div className="searchIcon"> <SearchIcon /> </div>
        <Input
        type="text"
        placeholder='Search problem or user'
        value={userInput}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClick={handleClick}
        id="searchBox"
        autoComplete="off"
        />         
        <div className="searchButtonContainer">
          <div className="searchButton">
            <ClearIcon id="clearBtn" className='clearBtn' onClick={clearInput}/>
          </div>        
        </div>
      </div>
      </div>
        <SearchSuggestionList
        setUserInput={setUserInput}
        activeSuggestion={activeSuggestion}
        onClick={onClick}
        filteredData={filteredSuggestions} />       
      </div>
      
  );
}

export default SearchBar;