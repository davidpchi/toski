import { Checkbox, Flex } from '@chakra-ui/react';
import {
    Chart as ChartJS,
    registerables,
    TooltipItem
} from 'chart.js';
import React, { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { primaryColor, secondaryColor } from '../../themes/acorn';

ChartJS.register(
    ...registerables
);

export const LineGraph = React.memo(function LineGraph({
    dataLabel,
    data,
    enableTrendline = false,
    allowTogglableDataPoints = false,
    tooltipTitleCallback,
    tooltipLabelCallback,
    minX,
    maxX,
    minY,
    maxY
}: {
    dataLabel: string,
    data: { x: number | string, y: number | string }[],
    enableTrendline?: boolean,
    allowTogglableDataPoints?: boolean,
    tooltipTitleCallback?: (tooltipItems: TooltipItem<"line">[]) => string,
    tooltipLabelCallback?: (tooltipItems: TooltipItem<"line">) => string
    minX?: number,
    maxX?: number,
    minY?: number,
    maxY?: number
}) {
    const [showDataPoints, setShowDataPoints] = useState<boolean>(false);

    const toggleShowDataPoints = () => { setShowDataPoints(!showDataPoints) };

    const averageData = useMemo(() => {
        // group every 5 data points into 1 data point
        const result: { x: number | string, y: number | string }[] = [];
        if (data.length >= 5) {
            let runningTotal = Number(data[0].y);
            for (let i = 1; i < data.length; i++) {
                runningTotal += Number(data[i].y);
                if ((i + 1) % 5 === 0) {
                    result.push({ x: data[i].x, y: runningTotal / 5 });
                    if (data[i + 1] !== undefined) {
                        runningTotal = 0;
                    }
                }
            }
        }

        return result;
    }, [data])

    const lineGraphData = useMemo(() => {
        const result = {
            datasets: [
                {
                    label: dataLabel,
                    data: data,
                    fill: true,
                    backgroundColor: primaryColor[50],
                    borderColor: primaryColor[300],
                    pointBackgroundColor: primaryColor[400],
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: primaryColor[200],
                    pointRadius: showDataPoints ? undefined : 0,
                    lineTension: 0.4,
                    order: 2,
                },
            ],
        }

        if (enableTrendline) {
            result.datasets.push({
                label: dataLabel,
                data: averageData,
                fill: false,
                backgroundColor: secondaryColor[50],
                borderColor: secondaryColor[300],
                pointBackgroundColor: secondaryColor[400],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: secondaryColor[200],
                pointRadius: 0,
                lineTension: 0.4,
                order: 1,
            })
        }

        return result;
    }, [data, dataLabel, showDataPoints]);

    return (
        <>
            <Line
                data={lineGraphData}
                style={{ maxHeight: 300, flexGrow: 1, maxWidth: 1024 }}
                options={{
                    scales: {
                        x: {
                            type: 'linear',
                            min: minX ? minX : undefined,
                            max: maxX ? maxX : undefined,
                            ticks: {
                                precision: 0
                            }
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
                            displayColors: false
                        }
                    },
                }}
            />
            {
                allowTogglableDataPoints ?
                    <Checkbox isChecked={showDataPoints} onChange={toggleShowDataPoints} marginTop={"16px"}>
                        {'Show data points'}
                    </Checkbox> : null
            }
        </>
    );
})