import { Chart as ChartJS, registerables, TooltipItem } from "chart.js";
import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { MTG_COLORS } from "../constants";

ChartJS.register(...registerables);

export const PieGraph = React.memo(function PieGraph({
    dataLabel,
    data,
    tooltipTitleCallback,
    tooltipLabelCallback,
    backgroundColors
}: {
    dataLabel: string;
    data: number[] | string[];
    tooltipTitleCallback?: (tooltipItems: TooltipItem<"pie">[]) => string;
    tooltipLabelCallback?: (tooltipItems: TooltipItem<"pie">) => string;
    /**
     * Optional prop to override colors of the pie graph
     */
    backgroundColors?: string[];
}) {
    const pieGraphData = useMemo(() => {
        return {
            labels: MTG_COLORS.map((color) => color.name),
            datasets: [
                {
                    label: dataLabel,
                    data: data,
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
