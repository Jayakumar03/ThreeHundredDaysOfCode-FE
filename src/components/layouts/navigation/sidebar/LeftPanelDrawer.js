import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// material-ui imports
import { Typography, Drawer, List, ListItemIcon } from '@mui/material';
import { Box } from '@mui/system';
import { Feed, Home, NotificationImportant, Speed, Book, ListAlt, LiveHelp } from '@mui/icons-material';

// styles
import "./LeftPanelDrawer.css";

// utils
import { joinClasses } from '../../../../utils/ClassUtils';

import { useSessionStateContext } from '../../../../lib/session-context/session-context';

const LeftPanelDrawer = (props) => {
    let location = useLocation();
    const { isAuthenticated } = useSessionStateContext();

    let iconColor = "left-panel-icon";
    let hideButton = "left-panel-hide-button";
    // Defines the items present in the Left Panel Drawer
    const navItems = [
        {path: '/home', title: 'Home', icon: <Home className={iconColor} />},
        {path: '/submissions', title: 'Submissions', icon: <Book className={iconColor} />},
        {path: '/problemset/all', title: 'Problem Set', icon: <Book className={iconColor} />},
        {path: '/notifications', title: 'Notifications', icon: <NotificationImportant className={iconColor} />},
        {path: '/problemOfTheDay', title: 'Daily Challenge', icon: <ListAlt className={iconColor} />},
        {path: '/leaderBoard', title: 'Leaderboard', icon: <Speed className={iconColor} />},
        {path: '/feed', title:' Community', icon: <Feed className={iconColor} />},
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

    return (
        <Drawer
            PaperProps={paperProps}
            variant="persistent"
            anchor="left"
            open={props.open && isAuthenticated}
        >
            <Box className={upperBoxClass}>
                {/* List of items with proper links */}
                <List className={listClass}>
                    {
                        navItems.map((item, index) => {
                            let itemClass = commonItemClass;
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