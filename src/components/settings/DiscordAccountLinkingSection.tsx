import React from "react";
import { FiRepeat } from "react-icons/fi";
import { useSelector } from "react-redux";

import { Avatar, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { CheckIcon, WarningTwoIcon } from "@chakra-ui/icons";

import { useUserInfo } from "../../logic/hooks/userHooks";
import { ProfileSelectors } from "../../redux/profiles/profilesSelectors";
import { AppState } from "../../redux/rootReducer";
import { ProfileService } from "../../services/ProfileService";

export const DiscordAccountLinkingSection = React.memo(function DiscordAccountLinkingSection() {
    const getPlayerName = ProfileService.useGetPlayerName();

    const { userId, userPic, username } = useUserInfo();
    const profile = useSelector((state: AppState) => ProfileSelectors.getProfile(state, userId ?? ""));

    const toskiPlayer = getPlayerName(profile ? profile.id : "");

    return (
        <Flex
            direction={"column"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            alignItems={"center"}
            marginBottom={"64px"}
        >
            <Heading size={"md"} padding={0} marginBottom={"8px"} alignSelf={"flex-start"}>
                Linked Discord Account
            </Heading>
            <Divider marginBottom={"16px"} />
            <Flex direction={"row"} justifyContent={"center"} alignItems={"center"} marginBottom={"16px"}>
                <Flex direction={"row"} justifyContent={"flex-start"} alignItems={"center"} marginRight={"16px"}>
                    <Avatar
                        size={"md"}
                        src={
                            userPic !== undefined
                                ? userPic
                                : "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                        }
                        marginRight={"16px"}
                    />
                    <Flex direction={"column"}>
                        <Text size={"sm"} padding={0}>
                            {username}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                            Discord
                        </Text>
                    </Flex>
                </Flex>
                <FiRepeat size={32} />
                <Flex direction={"row"} justifyContent={"flex-start"} alignItems={"center"} marginLeft={"16px"}>
                    <Flex direction={"column"}>
                        <Text size={"sm"} padding={0}>
                            {toskiPlayer ?? "???"}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                            Project Toski Player
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex fontSize="xs" color="gray.600" alignSelf={"stretch"} justifyContent={"center"} alignItems={"center"}>
                {toskiPlayer === undefined ? (
                    <>
                        <WarningTwoIcon color={"red"} marginRight={"8px"} />
                        <Text color={"red"}>Failed to link Discord Profile to Toski Player</Text>
                    </>
                ) : (
                    <>
                        <CheckIcon color={"green"} marginRight={"8px"} />
                        <Text color={"green"}>Discord Profile successfully linked to Toski Player</Text>
                    </>
                )}
            </Flex>
        </Flex>
    );
});
