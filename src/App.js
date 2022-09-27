import React, { useState, useEffect } from 'react';
import AppRoutes from './AppRoutes';
import NavTopBar from "./components/layouts/navigation/navbar/top-bar/NavTopBarContainer";
import LeftPanelDrawer from './components/layouts/navigation/sidebar/LeftPanelDrawer';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// Styling
import './App.css';
import { useSessionDispatchContext, useSessionStateContext } from './lib/session-context/session-context';
import { handleTriggerIndexBuild } from './lib/api/triggers';
import { handleDeleteAllData } from './lib/api/deletes';

function App() {
  const { onLoad } = useSessionDispatchContext();
  const { loading } = useSessionStateContext();

  useEffect(() => {
    onLoad()
  }, []);
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
  const drawerClick  = () => { setOpenDrawer(!openDrawer) }
  const handleDrawerOpen = () => { setOpenDrawer(!openDrawer) }
  const handleDrawerClose = () => { setOpenDrawer(false) }

  // width - to resize app-content accordingly
  let leftPanelWidth = openDrawer? leftPanelDefaultWidth : 0;

  return (
    // Outer most component
    <div className="App" onClick={handleClick}>
      {
        loading?
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        :
        <>
          <NavTopBar
            handleDeleteAllData={handleDeleteAllData}
            handleTriggerIndexBuild={handleTriggerIndexBuild}
            // Drawer functionality
            open={openDrawer}
            drawerClick={drawerClick}
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
        </>
      }
    </div>
  );
}

export default App;
