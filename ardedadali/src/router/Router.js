import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "../components/screen/Login";
import React from 'react';
import DashboardScreen from "../components/screen/Dashboard";
export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginScreen />}></Route>
                <Route path="/dashboard" element={<DashboardScreen/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}