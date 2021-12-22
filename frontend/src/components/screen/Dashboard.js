import { Grid } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "../AppBar";
import OutlinedCard from "../Card";
import NetworkChart from "../Chart";

function DashboardScreen() {
    return (
        <div>
            <ResponsiveAppBar />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <OutlinedCard title="Jumlah Aktivitas Jaringan"></OutlinedCard>
                </Grid>
                <Grid item xs={6}>
                    <OutlinedCard title="Jumlah Serangan"></OutlinedCard>
                </Grid>
            </Grid>
            <Grid>
                {/* <NetworkChart></NetworkChart> */}
            </Grid>
        </div>
    )
}

export default DashboardScreen;