import { Chart as ChartJS, registerables, TooltipItem } from "chart.js";
import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { primaryColor } from "../../themes/acorn";

ChartJS.register(...registerables);

export const BarGraph = React.memo(function LineGraph({
    dataLabel,
    data,
    tooltipTitleCallback,
    tooltipLabelCallback,
    minX,
    maxX,
    minY,
    maxY,
    xAxisTicksCallback,
}: {
    dataLabel: string;
    data: { x: number | string; y: number | string }[];
    tooltipTitleCallback?: (tooltipItems: TooltipItem<"bar">[]) => string;
    tooltipLabelCallback?: (tooltipItems: TooltipItem<"bar">) => string;
    minX?: number;
    maxX?: number;
    minY?: number;
    maxY?: number;
    xAxisTicksCallback?: (val: any, index: any) => string;
}) {
    const barGraphData = useMemo(() => {
        return {
            datasets: [
                {
                    label: dataLabel,
                    data: data,
                    fill: true,
                    backgroundColor: primaryColor[200],
                    borderColor: primaryColor[300],
                    pointBackgroundColor: primaryColor[400],
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: primaryColor[200],
                },
            ],
        };
    }, [data, dataLabel]);

    return (
        <>
            <Bar
                data={barGraphData}
                style={{ maxHeight: 300, flexGrow: 1, maxWidth: 1024 }}
                options={{
                    scales: {
                        x: {
                            type: "linear",
                            min: minX ? minX : undefined,
                            max: maxX ? maxX : undefined,
                            ticks: {
                                precision: 0,
                                callback: xAxisTicksCallback ? xAxisTicksCallback : undefined,
                            },
                        },
                        y: {
                            suggestedMin: minY ? minY : 0,
                            suggestedMax: maxY ? maxY : 100,
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                title: tooltipTitleCallback ? (item) => tooltipTitleCallback(item) : undefined,
                                label: tooltipLabelCallback ? (item) => tooltipLabelCallback(item) : undefined,
                            },
                            displayColors: false,
                        },
                    },
                }}
            />
        </>
    );
});
