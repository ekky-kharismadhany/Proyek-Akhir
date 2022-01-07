import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";
import { getActivityCount, getColumn } from "../../services/getActivityCount";
import parser from "../../services/parser";
import OutlinedCard from "../Card";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MuiAppBar from '@mui/material/AppBar';

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));



function DashboardScreen() {

    const [metric, setMetric] = useState('');
    const [stats, setStats] = useState('');
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    function getData() {
        fetch('http://localhost:5000/classification')
            .then(response => response.json())
            .then(data => {
                setMetric(data.metric);
                setStats(data.result);
            });
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }


    useEffect(() => {
        getData();
    }, []);


    if (stats === undefined) {
        stats = "";
    }
    let parsed = parser(stats);
    let netActivity = getActivityCount(stats, true);
    let attackActivity = getActivityCount(stats, false);
    const columns = getColumn();


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position='fixed' open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap componen="div">
                        Overview
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Overview', 'Upload CSV File', 'Log out'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <OutlinedCard title="Jumlah Aktivitas Jaringan" count={netActivity}></OutlinedCard>
                    </Grid>
                    <Grid item xs={6}>
                        <OutlinedCard title="Jumlah Serangan" count={attackActivity}></OutlinedCard>
                    </Grid>
                </Grid>
                <Grid>
                    <div style={{ height: 400 }}>
                        <DataGrid
                            rows={parsed}
                            columns={columns}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>
                </Grid>
            </Main>
        </Box>
    )
}

export default DashboardScreen;