import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Flex, Heading, Text } from "@chakra-ui/react";

import { getFavoriteCommanderForPlayer, getPlayer } from "../../../redux/stats/statsSelectors";
import { AppState } from "../../../redux/rootReducer";
import { MTG_COLORS } from "../../constants";
import { ImageWithHover } from "../../common/ImageWithHover";
import { PieGraph } from "../../dataVisualizations/PieGraph";
import { getAverageWinTurn, getWinRatePercentage } from "../../../logic/utils";
import { commanderList } from "../../../services/commanderList";
import { primaryColor } from "../../../themes/acorn";

export const PlayerDetailsInfoCard = React.memo(function PlayerDetailsInfoCard({ playerId }: { playerId: string }) {
    const player = useSelector((state: AppState) => getPlayer(state, playerId));
    const favoriteCommander = useSelector((state: AppState) => getFavoriteCommanderForPlayer(state, playerId));

    // Get image for most played commander
    const favCommanderImage = favoriteCommander
        ? commanderList[favoriteCommander.name].image.replace("normal", "art_crop")
        : "";

    if (player === undefined) {
        return null;
    }

    const colorsPlayedArray: number[] = [];
    for (const colorObj of MTG_COLORS) {
        colorsPlayedArray.push(player.colorProfile[colorObj.id]);
    }

    return (
        <Flex direction="row" justifyContent="center" alignItems={"center"} flexWrap={"wrap"} marginBottom={"16px"}>
            {favoriteCommander ? (
                <Link
                    to={`/commanderOverview/${favoriteCommander.id}`}
                    style={{ color: "blue", textDecoration: "underline" }}
                >
                    <ImageWithHover
                        label={`Favorite Commander: ${favoriteCommander.name}`}
                        width={300}
                        image={favCommanderImage}
                    />
                </Link>
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
                >{`Games played: ${player.matches.length}`}</Text>
                <Text
                    paddingLeft={"16px"}
                    paddingRight={"16px"}
                    paddingTop={"8px"}
                    paddingBottom={"8px"}
                    borderLeftWidth={1}
                    borderRightWidth={1}
                    borderBottomWidth={1}
                >{`Winrate: ${getWinRatePercentage(player.wins, player.matches.length)}%`}</Text>
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
