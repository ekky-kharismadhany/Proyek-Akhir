import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadIcon from '@mui/icons-material/Upload';
import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import {Link } from 'react-router-dom';


function DrawerMenu() {
    return (
        <List>
            <ListItem button component={Link} to="/dashboard" key="Overview">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Overview" />
            </ListItem>
            <ListItem button component={Link} to="/upload" key="Upload CSV File">
                <ListItemIcon>
                    <UploadIcon />
                </ListItemIcon>
                <ListItemText primary="Upload CSV File" />
            </ListItem>
            <ListItem button component={Link} to="/" key="Logout">
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </List>
    )
}

export default DrawerMenu;