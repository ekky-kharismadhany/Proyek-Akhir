import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Navigate } from 'react-router-dom';


export default function ButtonAppBar() {

    function logout() {
        <Navigate to="/"></Navigate>
    }

    const dashboard = (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <Button color="inherit" onClick={() => alert('hello')}>
                        <Navigate to="/">
                            Log out
                        </Navigate>
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            {dashboard}
        </Box>
    );
}
