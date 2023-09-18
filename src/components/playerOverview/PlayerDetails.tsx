import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Divider, Flex, Heading, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import {
    getCommanders,
    getCommandersByPlayerName,
    getMatchesByPlayerName,
    getPlayer,
} from "../../redux/statsSelectors";
import { AppState } from "../../redux/rootReducer";
import { matchHistoryColumns } from "../matchHistory/matchHistoryColumnHelper";
import { SortableTable } from "../dataVisualizations/SortableTable";
import { Loading } from "../Loading";
import { commanderOverviewColumns } from "../commanderOverview/commanderOverviewColumnHelper";
import { Commander } from "../../types/domain/Commander";
import { MatchPlacementBarChart } from "./MatchPlacementBarChart";
import { MTG_COLORS, PLAYER_MINIMUM_GAMES_REQUIRED } from "../constants";
import { Match } from "../../types/domain/Match";
import { commanderList } from "../../services/commanderList";
import { ImageWithHover } from "../common/ImageWithHover";
import { PieGraph } from "../dataVisualizations/PieGraph";

export async function loader(data: { params: any }) {
    return data.params.playerId;
}

export const PlayerDetails = React.memo(function PlayerDetails() {
    const navigate = useNavigate();

    // Player variables
    const playerId = useLoaderData() as string;
    const player = useSelector((state: AppState) => getPlayer(state, playerId));

    const commanders = useSelector((state: AppState) => getCommanders(state));

    const matches = useSelector((state: AppState) => getMatchesByPlayerName(state, playerId ? playerId : ""));
    matches.sort((a: Match, b: Match) => Number(b.id) - Number(a.id));

    // Get array of commanders played and sort by game count
    const playedCommanders: Commander[] = useSelector((state: AppState) =>
        getCommandersByPlayerName(state, playerId ? playerId : ""),
    );
    playedCommanders.sort((a: Commander, b: Commander) => b.matches.length - a.matches.length);

    if (matches.length === 0 || commanders === undefined || player === undefined) {
        return <Loading text="Loading..." />;
    }

    const title = player.name;

    // Get image for most played commander
    const favCommanderImage = commanderList[playedCommanders[0].name].image.replace("normal", "art_crop");

    // Calculate metrics (number of games, win rate)
    const numberOfMatches = matches.length;
    let numberOfWins = 0; // initialized at zero but incremented below
    for (let i = 0; i < numberOfMatches; i++) {
        if (matches[i].winner === playerId) {
            numberOfWins++;
        }
    }

    const colorsPlayedArray: number[] = [];
    for (const colorObj of MTG_COLORS) {
        colorsPlayedArray.push(player.colorProfile[colorObj.id]);
    }

    const playerWinRate = numberOfMatches > 0 ? Math.round((numberOfWins * 100) / numberOfMatches) : 0;

    return (
        <Flex direction="column" justify="center" align="center">
            <Heading>{title}</Heading>

            <Flex direction="row" justify="space-evenly" align="center" gap="20px" flexWrap={"wrap"} marginBottom={"16px"}>
                <Link
                    to={`/commanderOverview/${playedCommanders[0].id}`}
                    style={{ color: "blue", textDecoration: "underline" }}
                >
                    <ImageWithHover
                        label={`Favorite Commander: ${playedCommanders[0].name}`}
                        width={200}
                        image={favCommanderImage}
                    />
                </Link>

                <Flex direction="column" padding="16px" minWidth={"200px"} justifyContent={"center"} alignItems={"center"}>
                    <Text>{`Games played: ${numberOfMatches}`}</Text>
                    <Text>{`Winrate: ${playerWinRate}%`}</Text>
                </Flex>

                <Flex maxWidth={175} maxHeight={175}>
                    <div style={{ flex: 1, display: "flex", width: "100%", height: "100%" }}>
                        <PieGraph
                            dataLabel={"Commanders played"}
                            data={colorsPlayedArray}
                            backgroundColors={MTG_COLORS.map((color) => color.rgb)}
                        />
                    </div>
                </Flex>
            </Flex>

            <Tabs isFitted={true} width={"100%"} paddingRight={"10%"} paddingLeft={"10%"}>
                <TabList>
                    <Tab>
                        <Text>Match History</Text>
                    </Tab>
                    <Tab>
                        <Text>Commander History</Text>
                    </Tab>
                    <Tab>
                        <Text>Player Trends</Text>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <SortableTable
                            columns={matchHistoryColumns}
                            data={matches}
                            getRowProps={(row: any) => {
                                return {
                                    onClick: () => {
                                        navigate(`/matchHistory/${row.original.id}`);
                                        window.scrollTo(0, 0);
                                    },
                                };
                            }}
                        />
                    </TabPanel>
                    <TabPanel>
                        <SortableTable
                            columns={commanderOverviewColumns}
                            data={playedCommanders}
                            getRowProps={(row: any) => {
                                return {
                                    onClick: () => {
                                        navigate(`/commanderOverview/${row.original.id}`);
                                        window.scrollTo(0, 0);
                                    },
                                };
                            }}
                        />
                    </TabPanel>
                    <TabPanel>
                        {matches.length >= PLAYER_MINIMUM_GAMES_REQUIRED ? (
                            <MatchPlacementBarChart matches={matches} playerId={playerId} />
                        ) : (
                            <Flex
                                flexDirection={"column"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                padding="8px"
                            >
                                <Text>Not enough matches</Text>
                            </Flex>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
});
