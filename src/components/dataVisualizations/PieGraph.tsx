import { Flex, Text } from "@chakra-ui/react";
import { Chart as ChartJS, registerables, TooltipItem } from "chart.js";
import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(...registerables);

export const PieGraph = React.memo(function PieGraph({
    dataLabel,
    data,
    tooltipTitleCallback,
    tooltipLabelCallback,
    backgroundColors,
    showLegend,
    maxDimension
}: {
    dataLabel: string;
    data: { name: string; value: number }[] | { name: string; value: string }[];
    tooltipTitleCallback?: (tooltipItems: TooltipItem<"pie">[]) => string;
    tooltipLabelCallback?: (tooltipItems: TooltipItem<"pie">) => string;
    /**
     * Optional prop to override colors of the pie graph
     */
    backgroundColors?: string[];
    showLegend?: boolean;
    maxDimension?: number;
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

    const legend1 = data.slice(0, 11).map((item) => {
        return <Text>{`${item.name}: ${item.value}`}</Text>;
    });
    const legend2 = data.slice(11, 22).map((item) => {
        return <Text>{`${item.name}: ${item.value}`}</Text>;
    });
    const legend3 = data.slice(22, 33).map((item) => {
        return <Text>{`${item.name}: ${item.value}`}</Text>;
    });

    return (
        <Flex flexDirection={"row"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"center"}>
            <Pie
                style={{
                    maxHeight: maxDimension,
                    maxWidth: maxDimension
                }}
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
            {showLegend ? (
                <Flex flexDirection={"row"} maxWidth={"375px"} marginLeft={"32px"} marginTop={"8px"}>
                    <Flex flexDirection={"column"} marginRight={"12px"}>
                        {legend1}
                    </Flex>
                    <Flex flexDirection={"column"} marginRight={"12px"}>
                        {legend2}
                    </Flex>
                    <Flex flexDirection={"column"} marginRight={"12px"}>
                        {legend3}
                    </Flex>
                </Flex>
            ) : null}
        </Flex>
    );
});
