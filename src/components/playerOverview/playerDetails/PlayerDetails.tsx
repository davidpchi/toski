import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";

import {
    Flex,
    Heading,
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

import { StatsSelectors } from "../../../redux/stats/statsSelectors";
import { AppState } from "../../../redux/rootReducer";
import { matchHistoryColumns } from "../../dataVisualizations/columnHelpers/matchHistoryColumnHelper";
import { SortableTable } from "../../dataVisualizations/SortableTable";
import { Loading } from "../../Loading";
import { MatchPlacementBarChart } from "../MatchPlacementBarChart";
import { Match } from "../../../types/domain/Match";
import { PlayerDetailsInfoCard } from "./PlayerDetailsInfoCard";
import { CommanderHistoryTable } from "../CommanderHistoryTable";
import { InsufficientData } from "../InsufficientData";
import { CommanderMatchupsTable } from "../CommanderMatchupsTable";
import { PlayerMatchupsTable } from "../PlayerMatchupsTable";
import { primaryColor } from "../../../themes/acorn";
import { ProfileSelectors } from "../../../redux/profiles/profilesSelectors";
import { PlayerDecks } from "./PlayerDecks";

export async function loader(data: { params: any }) {
    return data.params.playerId;
}

export const PlayerDetails = React.memo(function PlayerDetails() {
    const navigate = useNavigate();
    // Player variables
    const playerId = useLoaderData() as string;

    const player = useSelector((state: AppState) => StatsSelectors.getPlayer(state, playerId));
    const toskiToDiscordMap = useSelector((state: AppState) => state.profiles.toskiToDiscordMap);
    const profileId = toskiToDiscordMap && player ? toskiToDiscordMap[player.name.toLowerCase()] : undefined;
    const profile = useSelector((state: AppState) => ProfileSelectors.getProfile(state, profileId ?? ""));
    const commanders = useSelector((state: AppState) => StatsSelectors.getCommanders(state));

    const [showCommanderMatchups, setShowCommanderMatchups] = useState<boolean>(false);
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabDropDownChange = (event: any) => {
        setTabIndex(parseInt(event.target.value, 10));
    };

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    };

    const [dateFilter] = useState<Date | undefined>(undefined);

    // needs to come after we initialize the date filter
    const matches = useSelector((state: AppState) =>
        StatsSelectors.getMatchesByPlayerName(state, playerId ? playerId : "")
    );
    matches.sort((a: Match, b: Match) => Number(b.id) - Number(a.id));

    if (commanders === undefined || player === undefined) {
        return <Loading text="Loading..." />;
    }

    return (
        <Flex direction="column" justify="center" align="center">
            <PlayerDetailsInfoCard playerId={playerId} />
            <Select
                marginTop={"16px"}
                display={{ base: "inline", md: "none" }}
                width={200}
                onChange={handleTabDropDownChange}
                value={tabIndex}
            >
                <option value={0}>Match History</option>
                <option value={1}>Commander History</option>
                <option value={2}>Matchups</option>
                <option value={3}>Match Trends</option>
                {profile && profile.decks.length > 0 ? <option value={4}>Decks</option> : null}
            </Select>
            <Tabs isFitted={true} width={"100%"} index={tabIndex} onChange={handleTabsChange}>
                <TabList display={{ base: "none", md: "flex" }}>
                    <Tab>
                        <Text>Match History</Text>
                    </Tab>
                    <Tab>
                        <Tooltip
                            label={
                                <p style={{ textAlign: "center" }}>Stats for when this player piloted a commander</p>
                            }
                            hasArrow
                            arrowSize={15}
                        >
                            <Text>Commander History</Text>
                        </Tooltip>
                    </Tab>
                    <Tab>
                        <Tooltip
                            label={
                                <p style={{ textAlign: "center" }}>
                                    Stats for when this player played against a commander or another player
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
                    {profile && profile.decks.length > 0 ? (
                        <Tab>
                            <Text>Decks</Text>
                        </Tab>
                    ) : null}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {matches.length > 0 ? (
                            <SortableTable
                                columns={matchHistoryColumns}
                                data={matches}
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
                            <InsufficientData description={"Not enough matches for date range selected"} />
                        )}
                    </TabPanel>
                    <TabPanel>
                        <CommanderHistoryTable playerId={playerId} />
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
                            <CommanderMatchupsTable playerId={playerId} dateFilter={dateFilter} />
                        ) : (
                            <PlayerMatchupsTable playerId={playerId} dateFilter={dateFilter} />
                        )}
                    </TabPanel>
                    <TabPanel>
                        <MatchPlacementBarChart matches={matches} playerId={playerId} />
                    </TabPanel>
                    <TabPanel>
                        <Flex
                            alignSelf={"stretch"}
                            justifyContent={"center"}
                            alignItems={"stretch"}
                            flexDirection={"row"}
                        >
                            <PlayerDecks profileId={profile ? profile.id : ""} />
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
});
