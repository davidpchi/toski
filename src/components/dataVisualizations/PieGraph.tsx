import {
    Chart as ChartJS,
    registerables,
    TooltipItem
} from 'chart.js';
import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(
    ...registerables
);

export const PieGraph = React.memo(function PieGraph({
    dataLabel,
    data,
    tooltipTitleCallback,
    tooltipLabelCallback,
    backgroundColors
}: {
    dataLabel: string,
    data: number[] | string[],
    tooltipTitleCallback?: (tooltipItems: TooltipItem<"pie">[]) => string,
    tooltipLabelCallback?: (tooltipItems: TooltipItem<"pie">) => string
    /**
     * Optional prop to override colors of the pie graph
     */
    backgroundColors?: string[]
}) {
    const pieGraphData = useMemo(() => {
        return {
            datasets: [
                {
                    label: dataLabel,
                    data: data,
                    fill: true,
                    backgroundColor: backgroundColors
                },
            ],
        }
    }, [data, dataLabel]);

    return (
        <>
            <Pie
                data={pieGraphData}
                style={{ maxHeight: 300, flexGrow: 1, maxWidth: 1024 }}
                options={{
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                title: tooltipTitleCallback ? (item) => tooltipTitleCallback(item) : undefined,
                                label: tooltipLabelCallback ? (item) => tooltipLabelCallback(item) : undefined,
                            },
                            displayColors: true
                        }
                    },
                }}
            />
        </>
    );
})