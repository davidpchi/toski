import { Checkbox, Flex } from '@chakra-ui/react';
import {
    Chart as ChartJS,
    registerables,
    TooltipItem
} from 'chart.js';
import React, { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { primaryColor } from '../../themes/acorn';

ChartJS.register(
    ...registerables
);

export const LineGraph = React.memo(function LineGraph({
    dataLabel,
    data,
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

    const lineGraphData = useMemo(() => {
        return {
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
                },
            ],
        }
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