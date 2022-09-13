import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// material-ui imports
import {Typography, Drawer, IconButton, List, ListItemIcon, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { 
    Feed, Home, NotificationImportant, Speed,
    ChevronLeftSharp, ChevronRightSharp,
    Book, ListAlt, LiveHelp
} from '@mui/icons-material';

// styles
import "../styles/LeftPanelDrawer.css";

// utils
import { checkAuth, joinClasses } from "../utils/ClassUtils";


const LeftPanelDrawer = (props) => {
    let location = useLocation();
    const isAuthenticated = checkAuth()

    let iconColor = "left-panel-icon";
    let hideButton = "left-panel-hide-button";
    // Defines the items present in the Left Panel Drawer
    const navItems = [
        {path: '/home', title: 'Home', icon: <Home className={iconColor} />},
        {path: '/problemset/all', title: 'Problem Set', icon: <Book className={iconColor} />},
        {path: '/notifications', title: 'Notifications', icon: <NotificationImportant className={iconColor} />},
        {path: '/problemOfTheDay', title: 'Daily Challenge', icon: <ListAlt className={iconColor} />},
        {path: '/leaderBoard', title: 'Leaderboard', icon: <Speed className={iconColor} />},
        {path: '/feed', title:' Feed', icon: <Feed className={iconColor} />},
        {path: '/faq', title: 'FAQ', icon: <LiveHelp className={iconColor} />}
    ]

    // classNames used by different components
    let drawerClass = 'left-panel-drawer';
    let upperBoxClass = drawerClass + '-upper-box';
    let boxClass = drawerClass + '-box';
    let listClass = drawerClass + '-list';
    let commonItemClass = listClass + '-item'
    let titleClass = commonItemClass + '-title';


    const paperProps = {
        className: drawerClass,
    }

    console.log("LPD -- ", isAuthenticated, props)

    const theme = useTheme()
    return (
        <Drawer
            PaperProps={paperProps}
            variant="persistent"
            anchor="left"
            open={props.open && isAuthenticated}
        >
            <Box className={upperBoxClass}>
                {/* Header to hide the Drawer/Panel */}
                <Box className={boxClass} >
                    <IconButton
                        className={hideButton}
                        color="inherit"
                        aria-label="close drawer"
                        edge="start"
                        onClick={props.handleDrawerClose}
                    >
                        {theme.direction === 'ltr' ? <ChevronLeftSharp className={iconColor} /> : <ChevronRightSharp />}
                    </IconButton>
                </Box>
                {/* List of items with proper links */}
                <List className={listClass}>
                    {
                        navItems.map((item, index) => {
                            let itemClass = commonItemClass
                            if (location.pathname === item.path) { 
                                itemClass = joinClasses([itemClass, itemClass + '-active'])
                            } else {
                                itemClass = joinClasses([itemClass])
                            }
                            return <NavLink
                                className={itemClass}
                                key={item.title}
                                to={item.path}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <Typography className={titleClass} variant='p'>
                                    {item.title}
                                </Typography>
                            </NavLink>
                        })
                    }
                </List>
            </Box>
        </Drawer>
    );
}

export default LeftPanelDrawer;