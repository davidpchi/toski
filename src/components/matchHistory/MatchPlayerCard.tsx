import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { primaryColor } from "../../themes/acorn";
import { MatchDisplayPlayer } from "./types/MatchDisplayPlayer";
import { MatchPlayerImage } from "./MatchPlayerImage";

export const MatchPlayerCard = React.memo(function MatchPlayerCard({
    player,
    textColor,
    backgroundColor,
    borderColor
}: {
    player: MatchDisplayPlayer;
    textColor?: string;
    backgroundColor?: string;
    borderColor?: string;
}) {
    const navigate = useNavigate();

    const playerNav = useCallback(() => {
        navigate("/playerOverview/" + player.name);
    }, [navigate, player.name]);

    return (
        <Flex
            // Player tile, which contains commander card button and player button
            flex={1}
            flexDirection={"column"}
            align={"center"}
            justifyContent={"center"}
            minWidth={player.isWinner ? 200 : 160}
            maxWidth={player.isWinner ? 300 : 250}
            borderWidth={5}
            borderColor={"transparent"}
            borderRadius={8}
        >
            <MatchPlayerImage player={player} />

            <Button
                variant="ghost"
                onClick={playerNav}
                alignSelf={"stretch"}
                backgroundColor={backgroundColor}
                borderColor={borderColor}
                size="md"
                flexDirection="row"
            >
                {player.isWinner ? <FiLoader height={32} /> : <Box height="32" />}
                <Text
                    style={{
                        fontStyle: "italic",
                        fontWeight: "bold",
                        color: textColor
                    }}
                    onClick={playerNav}
                    marginLeft={4}
                    marginRight={4}
                >
                    {`${player.name.toUpperCase()} - ${player.rank}`}
                </Text>
                {player.isWinner ? <FiLoader height={32} /> : <Box height="32" />}
            </Button>
        </Flex>
    );
});
