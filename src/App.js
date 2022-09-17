import React, { useState, useEffect } from 'react';
import AppRoutes from './AppRoutes';
import { AppContext } from "./lib/contextLib";

import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { onError } from './lib/errorLib';
import Cookies from 'universal-cookie';

import NavTopBar from "./components/Navbar/NavTopBarContainer";
import LeftPanelDrawer from "./components/LeftPanelDrawer";

// Google Analytics.
import ReactGA from 'react-ga';

// Styling
import './App.css';
import { useSessionDispatchContext, useSessionStateContext } from './lib/session-context/session-context';
import { handleTriggerIndexBuild } from './lib/api/triggers';
import { handleDeleteAllData } from './lib/api/deletes';

function App() {
  let navigate = useNavigate();
  const { onLoad } = useSessionDispatchContext();

  // console.log("GET CONTEXT", onLoad())
  // if (process.env.REACT_APP_GA_CODE) {
    // ReactGA.initialize(process.env.REACT_APP_GA_CODE);
  // }

  function handleClick() {
    // setFilteredSuggestions([]);
    var elementExists = document.getElementById('searchInputContainer');
    if (elementExists) {
      document.getElementById('searchInputContainer').style.borderRadius = '0px';
      document.getElementById('searchSuggestionContainerId').style.display = 'none';
    }
  }

  // Handle LeftPanelDrawer properties
  const leftPanelDefaultWidth = 220; // px
  // closed if not authenticated
  const [openDrawer, setOpenDrawer] = useState(false)
  const handleDrawerOpen = () => { setOpenDrawer(true) }
  const handleDrawerClose = () => { console.log("closing the drawer"); setOpenDrawer(false) }

  useEffect(() => {
    onLoad()
  }, []);

  // width - to resize app-content accordingly
  let leftPanelWidth = openDrawer? leftPanelDefaultWidth : 0;

  return (
    // Outer most component
    <div className="App" onClick={handleClick}>
        {/* The top navigation bar component */}
          <NavTopBar
            handleDeleteAllData={handleDeleteAllData}
            handleTriggerIndexBuild={handleTriggerIndexBuild}
            // Drawer functionality
            open={openDrawer}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
          />
          {/* The LeftPanel component - used for navigation */}
          <LeftPanelDrawer
            leftPanelWidth={leftPanelWidth}
            open={openDrawer}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
          />
          {/* This is the actual app content */}
          <AppRoutes
            isLeftPanelOpen={openDrawer}
            leftPanelWidth={leftPanelWidth}
          />
    </div>
  );
}

export default App;
