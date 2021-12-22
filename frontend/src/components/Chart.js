import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import attackTypes from "../models/attackType";
import Chart from "./BarChart";

async function fetchNetworkActivityData() {
    const response = await fetch('http://localhost:5000/classification');
    const netActivityData = await response.json();
    return netActivityData;
}

export default function NetworkChart() {
    useEffect(() => {
        const fetchData = async () => {
            setChartData({
                labels: [
                    attackTypes.benign,
                    attackTypes.FTP_Bruteforce,
                    attackTypes.SSH_BruteForce,
                    attackTypes.DDOS_Attack_HOIC,
                    attackTypes.Bot,
                    attackTypes.DoS_Attack_Golden_Eye,
                    attackTypes.DoS_Attack_Slowloris,
                    attackTypes.DDoS_Attack_LOIC_UDP,
                    attackTypes.BruteForce_Web,
                    attackTypes.BruteForce_XSS,
                    attackTypes.SQL_Injection
                ],
                datasets: [
                    {
                        label: "Attack Count",
                        data: fetchNetworkActivityData().then(activity => {activity}),
                        backgroundColor: [
                            "#73e4ef",
                            "#bfce87",
                            "#5cbd4e",
                            "#96c332",
                            "#166114",
                            "#9f1683",
                            "#9c934d",
                            "#831532",
                            "#f69ad5",
                            "#7c0366",
                            "#46df3b"
                        ]
                    }
                ]
            })
        }
        fetchData();
    }, []);

    const [chartData, setChartData] = useState({});

    return (
        <Box>
            <Chart chartData={chartData}></Chart>
        </Box>
    )
}