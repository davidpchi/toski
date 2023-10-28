import React from "react";
import { useSelector } from "react-redux";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { StatsSelectors } from "../../../redux/stats/statsSelectors";
import { AppState } from "../../../redux/rootReducer";
import { MTG_COLORS } from "../../constants";
import { ImageWithHover } from "../../common/ImageWithHover";
import { PieGraph } from "../../dataVisualizations/PieGraph";
import { getAverageWinTurn, getWinRatePercentage } from "../../../logic/utils";
import { commanderList } from "../../../services/commanderList";
import { primaryColor } from "../../../themes/acorn";
import { ProfileSelectors } from "../../../redux/profiles/profilesSelectors";
import { ProfileService } from "../../../services/ProfileService";

export const PlayerDetailsInfoCard = React.memo(function PlayerDetailsInfoCard({ playerId }: { playerId: string }) {
    const player = useSelector((state: AppState) => StatsSelectors.getPlayer(state, playerId));
    const favoriteCommander = useSelector((state: AppState) =>
        StatsSelectors.getFavoriteCommanderForPlayer(state, playerId)
    );

    const getProfileId = ProfileService.useGetProfileId();
    const potentialProfileId = player ? getProfileId(player.name) : undefined;
    const profileId = potentialProfileId ?? "";
    const profile = useSelector((state: AppState) => ProfileSelectors.getProfile(state, profileId));

    if (player === undefined) {
        return null;
    }

    const favoriteCommanderId = profile && profile.favoriteCommanderId ? profile.favoriteCommanderId : "";
    const themeCommander = Object.values(commanderList).find((value) => value.id === favoriteCommanderId);
    const themeCommanderImage = themeCommander?.image.replace("normal", "art_crop");
    const themeCommanderName = themeCommander?.name;

    // if the user has selected a favorite commander, use that, otherwise, default to their most played commander
    const favCommanderImage = favoriteCommander
        ? themeCommanderImage ?? commanderList[favoriteCommander.name].image.replace("normal", "art_crop")
        : "";
    const favCommanderName = themeCommanderName ?? favoriteCommander?.name;

    const colorsPlayedArray: number[] = [];
    for (const colorObj of MTG_COLORS) {
        colorsPlayedArray.push(player.colorProfile[colorObj.id]);
    }

    return (
        <Flex direction="row" justifyContent="center" alignItems={"center"} flexWrap={"wrap"} marginBottom={"16px"}>
            {favoriteCommander ? (
                <ImageWithHover
                    label={`Favorite Commander: ${favCommanderName}`}
                    width={300}
                    image={favCommanderImage}
                />
            ) : null}
            <Flex
                direction="column"
                paddingTop={"16px"}
                paddingRight={"16px"}
                paddingLeft={{ base: "16px", md: 0 }}
                paddingBottom={"16px"}
                marginLeft={{ base: 0, md: "-8px" }}
                zIndex={-1}
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
                    {player.name}
                </Heading>
                <Text
                    paddingLeft={"16px"}
                    paddingRight={"16px"}
                    paddingTop={"8px"}
                    paddingBottom={"8px"}
                    borderLeftWidth={1}
                    borderRightWidth={1}
                    borderBottomWidth={1}
                >{`Games played: ${player.validMatchesCount}`}</Text>
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
                        player.validMatchesCount > 0
                            ? `${getWinRatePercentage(player.wins, player.validMatchesCount)}% (${player.wins} win${
                                  player.wins > 1 ? "s" : ""
                              })`
                            : "N/A" // Displays N/A if the player has no valid matches
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
                >{`Avg. win turn: ${getAverageWinTurn(player)}`}</Text>
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
    );
});
