import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Chart from "./BarChart";

export default function NetworkChart() {
    useEffect(() => {
        const fetchData = async () => {
            const respond = await fetch("https://api.coincap.io/v2/assets/?limit=5");
            const data = await respond.json();
            console.log(data)
            setChartData({
                labels: data.data.map((crypto) => crypto.name),
                datasets: [
                    {
                        label: "Price in USD",
                        data: data.data.map((crypto) => crypto.priceUsd),
                        backgroundColor: [
                            "#ffbb11",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0"
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