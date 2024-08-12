import React, { useCallback, useEffect } from "react";
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
import { ExternalProfile } from "../../../types/domain/ExternalProfile";
import { MoxfieldService } from "../../../services/MoxfieldService";
import { LinkedAccountIcon } from "./LinkedAccountIcon";
import { ArchidektService } from "../../../services/ArchidektService";

export const PlayerDetailsInfoCard = React.memo(function PlayerDetailsInfoCard({ playerId }: { playerId: string }) {
    const hydrateMoxfieldProfile = MoxfieldService.useHydrateMoxfieldProfile();
    const hydrateArchidektProfile = ArchidektService.useHydrateArchidektProfile();

    const player = useSelector((state: AppState) => StatsSelectors.getPlayer(state, playerId));
    const favoriteCommander = useSelector((state: AppState) =>
        StatsSelectors.getFavoriteCommanderForPlayer(state, playerId)
    );

    const toskiToDiscordMap = useSelector((state: AppState) => state.profiles.toskiToDiscordMap);

    const profileId = player && toskiToDiscordMap ? toskiToDiscordMap[player.name.toLowerCase()] : "";
    const profile = useSelector((state: AppState) => ProfileSelectors.getProfile(state, profileId));

    // TODO: let's move this to a selector
    const moxfieldProfile: ExternalProfile | undefined = useSelector((state: AppState) => {
        if (state.profiles.moxfieldProfiles !== undefined && profile?.moxfieldId !== undefined) {
            return state.profiles.moxfieldProfiles[profile.moxfieldId];
        }
        return undefined;
    });

    const archidektProfile: ExternalProfile | undefined = useSelector((state: AppState) => {
        if (state.profiles.archidektProfiles !== undefined && profile?.archidektId !== undefined) {
            return state.profiles.archidektProfiles[profile.archidektId];
        }
        return undefined;
    });

    const navigateToMoxfieldAccount = useCallback(() => {
        if (moxfieldProfile) {
            window.open(`https://www.moxfield.com/users/${moxfieldProfile.userName}`, "_blank");
        }
    }, [moxfieldProfile]);

    const navigateToArchidektAccount = useCallback(() => {
        if (archidektProfile) {
            window.open(`https://archidekt.com/u/${archidektProfile.userName}`, "_blank");
        }
    }, [archidektProfile]);

    useEffect(() => {
        // We always attempt to hydrate the latest moxfield and archidekt accounts if they don't exist for the first render
        if (profile?.moxfieldId !== undefined && moxfieldProfile === undefined) {
            hydrateMoxfieldProfile(profile.moxfieldId);
        }
        if (profile?.archidektId !== undefined && archidektProfile === undefined) {
            hydrateArchidektProfile(profile.archidektId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile?.moxfieldId, profile?.archidektId]);

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

    const colorsPlayedArray: { name: string; value: number }[] = [];
    for (const colorObj of MTG_COLORS) {
        colorsPlayedArray.push({
            name: colorObj.name,
            value: player.colorProfile.colors[colorObj.id]
        });
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
                <Flex flexDirection={"row"} justifyContent={"center"} zIndex={10} marginTop={"2px"}>
                    {moxfieldProfile !== undefined ? (
                        <LinkedAccountIcon
                            hoveredImageUri={moxfieldProfile.imageUrl ?? ""}
                            restImageUri={"https://avatars.githubusercontent.com/u/65498797?s=200&v=4"}
                            onClick={navigateToMoxfieldAccount}
                            onHoverTooltip={`Moxfield Account: ${moxfieldProfile.userName}`}
                        />
                    ) : null}
                    {archidektProfile !== undefined ? (
                        <LinkedAccountIcon
                            hoveredImageUri={archidektProfile.imageUrl ?? ""}
                            restImageUri={"https://archidekt.com/images/logo.svg"}
                            onClick={navigateToArchidektAccount}
                            onHoverTooltip={`Archidekt Account: ${archidektProfile.userName}`}
                        />
                    ) : null}
                </Flex>
            </Flex>
            <PieGraph
                maxDimension={175}
                dataLabel={"Commanders played"}
                data={colorsPlayedArray}
                backgroundColors={MTG_COLORS.map((color) => color.rgb)}
            />
        </Flex>
    );
});
