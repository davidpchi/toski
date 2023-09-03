import {
    Chart as ChartJS,
    registerables
} from 'chart.js';
import React from "react";
import { Text } from "@chakra-ui/react";

import { Match } from "../../types/domain/Match";
import { Line } from "react-chartjs-2";

ChartJS.register(
    ...registerables
);

export const MatchLengthLineChart = React.memo(function MatchHistory({ matches }: { matches: Match[] }) {
    const matchesWithLengths = matches.filter((match: Match) => match.numberOfTurns);

    const matchesWithLengthsData = matchesWithLengths.map((match: Match) => {
        return { x: match.id, y: Number(match.numberOfTurns) };
    });

    const matchesWithLengthsDataObj = {
        datasets: [
            {
                label: 'Match lengths',
                data: matchesWithLengthsData,
                fill: true,
                backgroundColor: 'rgba(99, 132, 255, 0.5)',
                borderColor: 'rgb(99, 132, 255, 0.5)',
                pointBackgroundColor: 'rgb(99, 132, 255)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(99, 132, 225)',
            },
        ],
    };

    return (
        <>
            <Text>Match Lengths Over Time</Text>
            <Line
                data={matchesWithLengthsDataObj}
                style={{ maxHeight: 300, flexGrow: 1, maxWidth: 1024 }}
                options={{
                    scales: {
                        x: {
                            type: 'linear',
                        },
                        y: {
                            suggestedMin: 0,
                            suggestedMax: 25,
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                title: (item) => { return `Match Id: ${matchesWithLengths[item[0].dataIndex].id}` },
                                label: (item) => { return `Number of Turns: ${item.formattedValue}` },
                            },
                            displayColors: false
                        }
                    },
                }}
            />
        </>
    )
});