import { Grid } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";
import getActivityCount from "../../services/getActivityCount";
import parser from "../../services/parser";
import ResponsiveAppBar from "../AppBar";
import OutlinedCard from "../Card";

function DashboardScreen() {

    const [metric, setMetric] = useState('');
    const [stats, setStats] = useState('');

    function getData() {
        fetch('http://localhost:5000/classification')
            .then(response => response.json())
            .then(data => {
                setMetric(data.metric);
                setStats(data.result);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },   
        {
            field: 'Name',
            headerName: 'Activity Name',
            width: 150,
            editable: true,
        },
        {
            field: 'Count',
            headerName: 'Count',
            width: 150,
            editable: true,
        },
    ];

    if (stats === undefined) {
        stats = "";
    }
    let parsed = parser(stats);
    let netActivity = getActivityCount(stats, true);
    let attackActivity =  getActivityCount(stats, false);


    return (
        <div>
            <ResponsiveAppBar />
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
        </div>
    )
}

export default DashboardScreen;