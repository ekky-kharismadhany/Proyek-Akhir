import React from "react";
import ResponsiveAppBar from "../Dashboard";
import { Container } from "@mui/material";

function DashboardScreen() {
    return (
        <ResponsiveAppBar position='static'>
            <Container maxWidth="lg">
                <h1 style={{ backgroundColor: '#cfe8fc' }}>
                    Container Of maxWidth = lg
                </h1>
            </Container>
        </ResponsiveAppBar>
    )
}

export default DashboardScreen;