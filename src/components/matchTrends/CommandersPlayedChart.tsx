import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from 'chart.js';
import React from "react";
import { Text } from "@chakra-ui/react";

import { Match } from "../../types/domain/Match";
import { Line } from "react-chartjs-2";

ChartJS.register(
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Filler,
    Tooltip,
    Legend
);

export const CommandersPlayedChart = React.memo(function MatchHistory({ matches }: { matches: Match[] }) {
    let commandersDictionary: { [id: string]: string } = {};

    const commandersCountData = matches.map((match: Match, index: number) => {
        for (const player of match.players) {
            commandersDictionary[player.commander] = player.commander;
        }
        return { x: match.id, y: Object.values(commandersDictionary).length };
    });

    const commandersCountDataObj = {
        datasets: [
            {
                label: 'Match lengths',
                data: commandersCountData,
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
            <Text>Commanders Played</Text>
            <Line
                data={commandersCountDataObj}
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
                                title: (item) => { return `Match Id: ${matches[item[0].dataIndex].id}` },
                                label: (item) => { return `Commanders played: ${item.formattedValue}` },
                            },
                            displayColors: false
                        }
                    },
                }}
            />
        </>)
});