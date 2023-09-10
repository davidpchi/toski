import { Button, Flex, Image, } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { commanderList } from "../../services/commanderList";
import { MatchDisplayPlayer } from "./types/MatchDisplayPlayer";

export const MatchPlayerImage = React.memo(function MatchPlayerImage(
    { player }: { player: MatchDisplayPlayer }
) {
    const navigate = useNavigate();

    const soloCommanderNav = useCallback(() => {
        if (player.commanders[0].id !== undefined) {
            navigate('/commanderOverview/' + player.commanders[0].id);
        }
    }, [navigate, player.commanders]);

    // TODO: need to add support for the commander picker modal when there are multiple commanders to select from
    const commadner2Nav = useCallback(() => {
        if (player.commanders[1] !== undefined) {
            if (player.commanders[1].id !== undefined) {
                navigate('/commanderOverview/' + player.commanders[1].id);
            }
        }
    }, [navigate, player.commanders]);

    if (player.commanders.length === 1) {
        return (
            <Button
                variant='ghost'
                alignSelf={'stretch'}
                onClick={commadner2Nav}
                flex={1}
                padding={1}
                height={"300px"}
                size='md'
            >
                {
                    commanderList[player.commanders[0].name] ?
                        <Image src={commanderList[player.commanders[0].name].image} /> :
                        <Flex width={200} alignContent='center'>
                            <p
                                style={{
                                    fontStyle: 'italic',
                                    fontWeight: 'bold',
                                    wordBreak: "break-word",
                                    whiteSpace: "normal"
                                }}
                            >
                                {player.commanders[0].name}
                            </p>
                        </Flex>
                }
            </Button>
        );
    } else {
        return (
            <Button
                variant='ghost'
                alignSelf={'stretch'}
                onClick={soloCommanderNav}
                flex={1}
                padding={1}
                height={"300px"}
            >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, }}>
                    <div style={{ position: "absolute", top: 5, left: 30, right: 5 }}>
                        {
                            commanderList[player.commanders[1].name] ?
                                <Image src={commanderList[player.commanders[1].name].image} height={"260px"} /> :
                                <Flex width={200} alignContent='center'>
                                    <p
                                        style={{
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                            wordBreak: "break-word",
                                            whiteSpace: "normal"
                                        }}
                                    >
                                        {player.commanders[1].name}
                                    </p>
                                </Flex>
                        }
                    </div>
                    <div style={{ position: "absolute", bottom: 5, right: 30, left: 5 }}>
                        {
                            commanderList[player.commanders[0].name] ?
                                <Image src={commanderList[player.commanders[0].name].image} height={"260px"} /> :
                                <Flex width={200} alignContent='center'>
                                    <p
                                        style={{
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                            wordBreak: "break-word",
                                            whiteSpace: "normal"
                                        }}
                                    >
                                        {player.commanders[0].name}
                                    </p>
                                </Flex>
                        }
                    </div>
                </div>

            </Button>
        );
    }
});