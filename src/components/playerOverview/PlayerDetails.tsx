import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Divider, Flex, Heading, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
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
import { Match } from "../../types/domain/Match";
import { commanderList } from "../../services/commanderList";

export async function loader(data: { params: any }) {
    return data.params.playerId;
}

export const PlayerDetails = React.memo(function PlayerDetails() {
    const navigate = useNavigate();

    // Player variables
    const playerId = useLoaderData() as string;
    const title = playerId;

    const matches = useSelector((state: AppState) => getMatchesByPlayerName(state, playerId ? playerId : ""));
    matches.sort((a: Match, b: Match) => Number(b.id) - Number(a.id));

    // Get array of commanders played and sort by game count
    const playedCommanders: Commander[] = useSelector((state: AppState) =>
        getCommandersByPlayerName(state, playerId ? playerId : ""),
    );
    playedCommanders.sort((a: Commander, b: Commander) => b.matches.length - a.matches.length);

    // Get image for most played commander
    const favCommanderImage = commanderList[playedCommanders[0].name].image.replace("normal", "art_crop");

    // Set hover effect to false
    const [hovered, setHovered] = useState(false);

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
                <Flex>
                    <Link
                        to={`/commanderOverview/${playedCommanders[0].id}`}
                        style={{ color: "blue", textDecoration: "underline" }}
                    >
                        <div
                            style={{
                                position: "relative",
                                cursor: "pointer",
                                width: "auto",
                                height: "auto",
                                borderRadius: "8px",
                                overflow: "hidden",
                            }}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            <Image
                                alt="Favorite Commander"
                                src={favCommanderImage}
                                width={40}
                                borderRadius={8}
                                style={{
                                    filter: hovered ? "brightness(50%)" : "none",
                                    transition: "filter 0.3s",
                                }}
                            />
                            <div
                                style={{
                                    // The following properties help with responsively layering the text and darkening effect
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",

                                    // The following control text and opacity
                                    opacity: hovered ? 1 : 0,
                                    transition: "opacity 0.3s",
                                    color: "white",
                                    textAlign: "center",
                                    fontSize: "12px",
                                    width: "100%",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                Favorite Commander: {playedCommanders[0].name}
                            </div>
                        </div>
                    </Link>
                </Flex>

                <Flex direction="column" padding="16px">
                    <Text>{`Total Number of Games: ${numberOfMatches}`}</Text>
                    <Text>{`Winrate: ${playerWinRate}%`}</Text>
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
