import { TooltipItem } from "chart.js";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
    Flex,
    Heading,
    Image,
    Input,
    Link,
    Select,
    Switch,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Tooltip
} from "@chakra-ui/react";

import { AppState } from "../../redux/rootReducer";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { Loading } from "../Loading";
import { commanderList } from "../../services/commanderList";
import { SortableTable } from "../dataVisualizations/SortableTable";
import { matchHistoryColumns } from "../dataVisualizations/columnHelpers/matchHistoryColumnHelper";
import { Match } from "../../types/domain/Match";
import { MatchPlayer } from "../../types/domain/MatchPlayer";
import { LineGraph } from "../dataVisualizations/LineGraph";
import { Player } from "../../types/domain/Player";
import { COMMANDER_MINIMUM_GAMES_REQUIRED, NUMBER_OF_PLAYERS_FOR_VALID_MATCH } from "../constants";
import { DatePicker } from "../common/DatePicker";
import { MatchPlacementBarChart } from "./MatchPlacementBarChart";
import { primaryColor } from "../../themes/acorn";
import { topPlayersColumns } from "../dataVisualizations/columnHelpers/topPlayersColumnHelper";
import { filterMatchesByPlayerCount } from "../../logic/dictionaryUtils";
import { getAverageWinTurnForCommander, getWinRatePercentage } from "../../logic/utils";
import { CommanderMatchupsTable } from "./CommanderMatchupsTable";
import { PlayerMatchupsTable } from "./PlayerMatchupsTable";

export async function loader(data: { params: any }) {
    return data.params.commanderId;
}

export const CommanderDetails = React.memo(function CommanderDetails() {
    const navigate = useNavigate();
    const commanderId = useLoaderData() as string;
    const commander = useSelector((state: AppState) => StatsSelectors.getCommander(state, commanderId));

    const [showCommanderMatchups, setShowCommanderMatchups] = useState<boolean>(false);
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabDropDownChange = (event: any) => {
        setTabIndex(parseInt(event.target.value, 10));
    };

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    };

    const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
    const onDatePickerChange = useCallback(
        (date: Date | undefined) => {
            setDateFilter(date);
        },
        [setDateFilter]
    );

    const [searchInput, setSearchInput] = useState("");
    const onSearchChange = useCallback(
        (event: any) => {
            setSearchInput(event.target.value);
        },
        [setSearchInput]
    );

    // Get all matches to display in Match History of the Commander Overview
    const matches = useSelector((state: AppState) =>
        StatsSelectors.getMatchesByCommanderName(state, commander ? commander.name : "", dateFilter)
    );

    // Get matches filtered by player count to use in statistical calculations
    // These matches are considered "valid" because they all have the same number of players
    const validMatches = filterMatchesByPlayerCount(
        useSelector((state: AppState) =>
            StatsSelectors.getMatchesByCommanderName(state, commander ? commander.name : "", dateFilter)
        ),
        NUMBER_OF_PLAYERS_FOR_VALID_MATCH
    );
    const commanderPlayers: Player[] = useSelector((state: AppState) =>
        StatsSelectors.getPlayersByCommanderName(state, commander ? commander.name : "", dateFilter)
    );
    commanderPlayers.sort((a: Player, b: Player) => b.validMatchesCount - a.validMatchesCount);

    if (commander === undefined) {
        return <Loading text="" />;
    }

    let matchesArray: Match[] = matches.sort((a, b) => Number(b.id) - Number(a.id));
    if (searchInput.length > 0 && matches) {
        matchesArray = matches.filter((match: Match) => {
            for (let player of match.players) {
                if (player.name.toLowerCase().includes(searchInput.toLowerCase())) {
                    return true;
                }
                for (let comm of player.commanders) {
                    if (comm.toLowerCase().includes(searchInput.toLowerCase())) {
                        return true;
                    }
                }
            }
            return false;
        });
    }

    let numberOfWins = 0;

    const winratePerMatch = validMatches.map((match: Match, index: number) => {
        const winningPlayer = match.players.find((player: MatchPlayer) => player.rank === "1");

        let currentWinRate = 0;

        // this should always be true
        if (winningPlayer !== undefined) {
            for (const winningCommander of winningPlayer.commanders) {
                const isWinner = winningCommander === commander.name;

                if (isWinner) {
                    numberOfWins += 1;
                }

                currentWinRate = numberOfWins / (index + 1);
            }
        }

        return { x: index + 1, y: Math.round(currentWinRate * 100) };
    });

    const tooltipTitleCallback = (item: TooltipItem<"line">[]) => {
        return `Match ID: ${validMatches[item[0].dataIndex].id}`;
    };
    const tooltipLabelCallback = (item: TooltipItem<"line">) => {
        return `Winrate: ${item.formattedValue}%`;
    };

    return (
        <Flex direction="column" justify="center" align="center">
            <Flex
                direction="row"
                maxWidth={"1024px"}
                alignSelf={"center"}
                justifyContent={"center"}
                alignItems={"center"}
                align="start"
                flexWrap="wrap"
                marginBottom="32px"
            >
                {commanderList[commander.name] ? (
                    <Image
                        width={300}
                        src={commanderList[commander.name].image}
                        boxShadow={"0px 12px 18px 2px rgba(0,0,0,0.3)"}
                        borderRadius={"4%"}
                        zIndex={1}
                    />
                ) : null}
                <Flex
                    direction="column"
                    paddingTop={"16px"}
                    paddingRight={"16px"}
                    paddingLeft={{ base: "16px", md: 0 }}
                    paddingBottom={"16px"}
                    marginLeft={{ base: 0, md: "-8px" }}
                >
                    <Heading
                        size={"sm"}
                        textTransform={"uppercase"}
                        paddingRight={"16px"}
                        paddingLeft={"16px"}
                        paddingTop={"8px"}
                        paddingBottom={"8px"}
                        borderWidth={1}
                        borderTopRadius={"8px"}
                        backgroundColor={primaryColor["500"]}
                        color={"white"}
                    >
                        {commander.name}
                    </Heading>
                    <Text
                        paddingLeft={"16px"}
                        paddingRight={"16px"}
                        paddingTop={"8px"}
                        paddingBottom={"8px"}
                        borderLeftWidth={1}
                        borderRightWidth={1}
                        borderBottomWidth={1}
                    >{`Total Games: ${commander.validMatchesCount}`}</Text>
                    <Text
                        paddingLeft={"16px"}
                        paddingRight={"16px"}
                        paddingTop={"8px"}
                        paddingBottom={"8px"}
                        borderLeftWidth={1}
                        borderRightWidth={1}
                        borderBottomWidth={1}
                    >
                        {`Winrate: ${
                            commander.validMatchesCount > 0
                                ? `${getWinRatePercentage(commander.wins, commander.validMatchesCount)}% (${
                                      commander.wins
                                  } win${commander.wins > 1 ? "s" : ""})`
                                : "N/A" // Displays N/A if the commander has no valid matches
                        }`}
                    </Text>
                    <Text
                        paddingLeft={"16px"}
                        paddingRight={"16px"}
                        paddingTop={"8px"}
                        paddingBottom={"8px"}
                        borderLeftWidth={1}
                        borderRightWidth={1}
                        borderBottomWidth={1}
                    >{`Avg. win turn: ${getAverageWinTurnForCommander(commander, matches)}`}</Text>
                    <Text
                        paddingLeft={"16px"}
                        paddingRight={"16px"}
                        paddingTop={"8px"}
                        paddingBottom={"8px"}
                        borderLeftWidth={1}
                        borderRightWidth={1}
                        borderBottomWidth={1}
                    >{`Qualified: ${
                        commander.validMatchesCount >= COMMANDER_MINIMUM_GAMES_REQUIRED ? "Yes" : "No"
                    }`}</Text>
                    {commanderList[commander.name] ? (
                        <Link
                            paddingLeft={"16px"}
                            paddingRight={"16px"}
                            paddingTop={"8px"}
                            paddingBottom={"8px"}
                            borderLeftWidth={1}
                            borderRightWidth={1}
                            borderBottomWidth={1}
                            href={commanderList[commander.name].scryfallUri}
                            isExternal
                        >
                            View on Scryfall <ExternalLinkIcon mx="2px" marginBottom={"5px"} />
                        </Link>
                    ) : null}
                </Flex>
            </Flex>
            <Flex direction={"column"}>
                <DatePicker onChange={onDatePickerChange} />
                <div style={{ padding: 20 }}>
                    <Input placeholder="Filter by..." onChange={onSearchChange} />
                </div>
            </Flex>
            <Select
                display={{ base: "inline", md: "none" }}
                width={200}
                onChange={handleTabDropDownChange}
                value={tabIndex}
            >
                <option value={0}>Match History</option>
                <option value={1}>Historical Winrate</option>
                <option value={2}>Top Players</option>
                <option value={3}>Matchups</option>
                <option value={4}>Match Trends</option>
            </Select>
            <Tabs isFitted={true} width={"100%"} flexWrap={"wrap"} index={tabIndex} onChange={handleTabsChange}>
                <TabList display={{ base: "none", md: "flex" }}>
                    <Tab>
                        <Text>Match History</Text>
                    </Tab>
                    <Tab>
                        <Text>Historical Winrate</Text>
                    </Tab>
                    <Tab>
                        <Text>Top Players</Text>
                    </Tab>
                    <Tab>
                        <Tooltip
                            label={
                                <p style={{ textAlign: "center" }}>
                                    Stats for when this commander played against another commander or player
                                </p>
                            }
                            hasArrow
                            arrowSize={15}
                        >
                            <Text>Matchups</Text>
                        </Tooltip>
                    </Tab>
                    <Tab>
                        <Text>Match Trends</Text>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {matchesArray.length > 0 ? (
                            <SortableTable
                                columns={matchHistoryColumns}
                                data={matchesArray}
                                getRowProps={(row: any) => {
                                    return {
                                        onClick: () => {
                                            navigate(`/matchHistory/${row.original.id}`);
                                            window.scrollTo(0, 0);
                                        }
                                    };
                                }}
                            />
                        ) : (
                            <div style={{ textAlign: "center" }}>No data</div>
                        )}
                    </TabPanel>
                    <TabPanel>
                        <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"} padding="8px">
                            {validMatches.length >= COMMANDER_MINIMUM_GAMES_REQUIRED ? (
                                <LineGraph
                                    dataLabel={"Winrate"}
                                    data={winratePerMatch}
                                    allowTogglableDataPoints={true}
                                    tooltipTitleCallback={tooltipTitleCallback}
                                    tooltipLabelCallback={tooltipLabelCallback}
                                    minX={1}
                                    maxX={winratePerMatch.length}
                                />
                            ) : (
                                <Text>Not enough matches</Text>
                            )}
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        {commanderPlayers.length ? (
                            <SortableTable
                                columns={topPlayersColumns}
                                data={commanderPlayers}
                                getRowProps={(row: any) => {
                                    return {
                                        onClick: () => {
                                            navigate(`/playerOverview/${row.original.name}`);
                                            window.scrollTo(0, 0);
                                        }
                                    };
                                }}
                            />
                        ) : (
                            <div style={{ textAlign: "center" }}>No data</div>
                        )}
                    </TabPanel>
                    <TabPanel>
                        <Flex
                            alignSelf={"stretch"}
                            justifyContent={"center"}
                            alignItems={"stretch"}
                            flexDirection={"row"}
                        >
                            <Heading size="sm" color={showCommanderMatchups ? undefined : primaryColor["500"]}>
                                Player Matchups
                            </Heading>
                            <Switch
                                size={"md"}
                                onChange={() => setShowCommanderMatchups(!showCommanderMatchups)}
                                paddingLeft={"8px"}
                                paddingRight={"8px"}
                                alignSelf={"center"}
                                colorScheme="primary"
                                sx={{
                                    "span.chakra-switch__track:not([data-checked])": {
                                        backgroundColor: primaryColor["500"]
                                    }
                                }}
                            />
                            <Heading size="sm" color={showCommanderMatchups ? primaryColor["500"] : undefined}>
                                Commander Matchups
                            </Heading>
                        </Flex>
                        {showCommanderMatchups ? (
                            <CommanderMatchupsTable commanderName={commander.name} dateFilter={dateFilter} />
                        ) : (
                            <PlayerMatchupsTable commanderName={commander.name} dateFilter={dateFilter} />
                        )}
                    </TabPanel>
                    <TabPanel>
                        {matchesArray.length > 0 ? (
                            <MatchPlacementBarChart matches={matchesArray} commanderName={commander.name} />
                        ) : (
                            <div style={{ textAlign: "center" }}>No data</div>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
});
