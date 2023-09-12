import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Flex, Heading, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text, color } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { getCommandersByPlayerName, getMatchesByPlayerName } from "../../redux/statsSelectors";
import { AppState } from "../../redux/rootReducer";
import { matchHistoryColumns } from "../matchHistory/matchHistoryColumnHelper";
import { SortableTable } from "../dataVisualizations/SortableTable";
import { Loading } from "../Loading";
import { commanderOverviewColumns } from "../commanderOverview/commanderOverviewColumnHelper";
import { Commander } from "../../types/domain/Commander";
import { MatchPlacementBarChart } from "./MatchPlacementBarChart";
import { PLAYER_MINIMUM_GAMES_REQUIRED } from "../contants";

export async function loader(data: { params: any }) {
    return data.params.playerId;
}

export const PlayerDetails = React.memo(function PlayerDetails() {
    const navigate = useNavigate();

    // Player variables
    const playerId = useLoaderData() as string;
    const title = playerId;
    const matches = useSelector((state: AppState) => getMatchesByPlayerName(state, playerId ? playerId : ""));

    const playedCommanders: Commander[] = useSelector((state: AppState) =>
        getCommandersByPlayerName(state, playerId ? playerId : ""),
    );
    playedCommanders.sort((a: Commander, b: Commander) => b.matches.length - a.matches.length);

    if (matches.length === 0) {
        return <Loading text="Loading..." />;
    }

    // Calculate metrics (number of games, win rate)
    const numberOfMatches = matches.length;
    let numberOfWins = 0; // initialized at zero but incremented below
    for (let i = 0; i < numberOfMatches; i++) {
        if (matches[i].winner === playerId) {
            numberOfWins++;
        }
    }

    const playerWinRate = numberOfMatches > 0 ? Math.round((numberOfWins * 100) / numberOfMatches) : 0;

    return (
        <Flex direction="column" justify="center" align="center">
            <Heading>{title}</Heading>

            <Flex direction="row">
                <Flex direction="column" padding="16px">
                    <Image src="https://static.thenounproject.com/png/5425-200.png" />
                </Flex>
                <Flex direction="column" padding="16px">
                    <Text>{`Total Number of Games: ${numberOfMatches}`}</Text>
                    <Text>{`Winrate: ${playerWinRate}%`}</Text>
                    <Text>
                        Favorite commander:{" "}
                        <Link
                            to={`/commanderOverview/${playedCommanders[0].id}`}
                            style={{ color: "blue", textDecoration: "underline" }}
                        >
                            {playedCommanders[0].name}
                        </Link>
                    </Text>
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
