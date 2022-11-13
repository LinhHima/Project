import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { Box, Button } from "@mui/material";

const PieChart = ({ dataType }) => {
    const [tab, setTab] = useState(0);

    const data = useSelector((state) => {
        if (dataType == 0) return state.statisticsSlice.profitPaidGame;
        else return state.statisticsSlice.tickNumPaidGame;
    });
    const [dataShow, setDataShow] = useState(data?.day);

    useEffect(() => {
        switch (tab) {
            case 0: {
                setDataShow([
                    {
                        name: dataType == 0 ? "Profit" : "Number of ticket",
                        colorByPoint: true,
                        data: data?.day,
                    },
                ]);
                break;
            }
            case 1: {
                setDataShow([
                    {
                        name: dataType == 0 ? "Profit" : "Number of ticket",
                        colorByPoint: true,
                        data: data?.week,
                    },
                ]);
                break;
            }
            case 2: {
                setDataShow([
                    {
                        name: dataType == 0 ? "Profit" : "Number of ticket",
                        colorByPoint: true,
                        data: data?.month,
                    },
                ]);
                break;
            }
        }
    }, [tab]);

    var pieColors = (function () {
        var colors = [],
            base = "#099D7E";
        for (var i = 0; i < 10; i += 1) {
            colors.push(
                Highcharts.color(base)
                    .brighten((i - 2) / 7)
                    .get()
            );
        }
        return colors;
    })();

    const options = {
        credits: {
            enabled: false,
        },
        loading: {
            labelStyle: {
                fontStyle: "italic",
            },
            style: {
                backgroundColor: "gray",
            },
        },
        chart: {
            borderRadius: "5px",
            backgroundColor: "#F4EEEE",
            type: "pie",
            reflow: true,
            events: {
                load() {
                    this.showLoading();
                    setTimeout(this.hideLoading.bind(this), 1000);
                },
            },
        },
        title: {
            text: "",
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                colors: pieColors,
                dataLabels: {
                    enabled: true,
                    crookDistance: "100%",
                    color: "black",
                    connectorShape: "crookedLine",
                    connectorColor: "black",
                    stroke: "black",
                    format: "<div style='font-weight: bold;'>{point.name}<br>{point.percentage:.1f} %<div>",
                },
                showInLegend: true,
            },
        },
        legend: {
            itemStyle: {
                color: "black",
                fontWeight: "bold",
            },
        },
        series: dataShow,
    };

    return (
        <Box style={{ backgroundColor: "#F4EEEE", borderRadius: "10px" }}>
            <Box
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    position: "relative",
                    right: 20,
                    top: 20,
                    zIndex: 10,
                }}
            >
                <Button
                    variant="contained"
                    style={tab == 0 ? { backgroundColor: "#099D7E " } : { backgroundColor: "#403D4E" }}
                    onClick={() => setTab(0)}
                >
                    1D
                </Button>
                <Button
                    variant="contained"
                    style={tab == 1 ? { backgroundColor: "#099D7E " } : { backgroundColor: "#403D4E" }}
                    onClick={() => setTab(1)}
                >
                    1W
                </Button>
                <Button
                    variant="contained"
                    style={tab == 2 ? { backgroundColor: "#099D7E " } : { backgroundColor: "#403D4E" }}
                    onClick={() => setTab(2)}
                >
                    1M
                </Button>
            </Box>
            <Box>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Box>
        </Box>
    );
};

export default PieChart;
