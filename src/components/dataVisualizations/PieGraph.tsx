import { Chart as ChartJS, registerables, TooltipItem } from "chart.js";
import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(...registerables);

export const PieGraph = React.memo(function PieGraph({
    dataLabel,
    data,
    tooltipTitleCallback,
    tooltipLabelCallback,
    backgroundColors
}: {
    dataLabel: string;
    data: { name: string; value: number }[] | { name: string; value: string }[];
    tooltipTitleCallback?: (tooltipItems: TooltipItem<"pie">[]) => string;
    tooltipLabelCallback?: (tooltipItems: TooltipItem<"pie">) => string;
    /**
     * Optional prop to override colors of the pie graph
     */
    backgroundColors?: string[];
}) {
    const pieGraphData = useMemo(() => {
        return {
            labels: data.map((value) => value.name),
            datasets: [
                {
                    label: dataLabel,
                    data: data.map((item) => item.value),
                    fill: true,
                    backgroundColor: backgroundColors
                }
            ]
        };
    }, [backgroundColors, data, dataLabel]);

    return (
        <Pie
            data={pieGraphData}
            options={{
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: tooltipTitleCallback ? (item) => tooltipTitleCallback(item) : undefined,
                            label: tooltipLabelCallback ? (item) => tooltipLabelCallback(item) : undefined
                        },
                        displayColors: true
                    }
                }
            }}
        />
    );
});
