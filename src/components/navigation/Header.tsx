import React, { useCallback, useEffect, useMemo } from "react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
    Flex,
    useColorModeValue,
    IconButton,
    HStack,
    Menu,
    MenuButton,
    Avatar,
    VStack,
    Box,
    MenuList,
    MenuItem,
    MenuDivider,
    FlexProps,
    Text
} from "@chakra-ui/react";

import { AuthAction } from "../../redux/auth/authActions";
import { routes } from "../../navigation/routes";
import { FF_IS_LOGIN_ENABLED } from "../../services/featureFlagService";
import { LoginModal } from "../auth/LoginModal";
import { SettingsMenuItem } from "../settings/SettingsModal";
import { ProfileService } from "../../services/ProfileService";
import { getDiscordLoginEndpoint } from "../../services/DiscordService";
import { useUserInfo } from "../../logic/hooks/userHooks";

const placeholderImage = "https://static.thenounproject.com/png/5425-200.png";

interface HeaderProps extends FlexProps {
    onProfileIconClick: () => void;
}

export const useHeaderTitle = () => {
    const location = useLocation();

    return useMemo(() => {
        let title = "";

        const path = location.pathname;

        // check each of the potential "areas" of the app that may need more specific titles
        if (path.includes("commanderOverview")) {
            title = "Commander Overview";
        } else if (path.includes("matchHistory")) {
            title = "Match History";
        } else if (path.includes("playerOverview")) {
            title = "Player Overview";
        } else if (path.includes("articles")) {
            title = "Updates";
        } else {
            const route = routes[path];

            // if the route doesn't exist, just return the default;
            if (route !== undefined) {
                title = route.name;
            }
        }

        return title;
    }, [location]);
};

// the md layout is used for normal
// the base layout is used for mobile view
export const Header = ({ onProfileIconClick, ...rest }: HeaderProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getPlayerName = ProfileService.useGetPlayerName();

    const headerTitle = useHeaderTitle();
    const location = useLocation();
    const isHome = location.pathname === "/";

    const finalRef = React.useRef(null);

    const { userId, userPic, username } = useUserInfo();

    /**
     * When the app starts, we check to see if there's an existing access token already saved via local storage.
     * If there is, use that instead of showing the user as not signed in.
     */
    useEffect(() => {
        const tokenTypeVal = localStorage.getItem("tokenType");
        const accessTokenVal = localStorage.getItem("accessToken");
        // this is the date stored in EPOCH seconds
        const expirationDateVal = localStorage.getItem("expirationDate");

        if (tokenTypeVal !== null && accessTokenVal !== null && expirationDateVal !== null) {
            const expirationDate = new Date(Number(expirationDateVal));

            // if the expiration date hasn't happened yet (within a day), load the auth
            const currentTime = new Date();
            if (currentTime.getTime() <= expirationDate.getTime() - 24 * 60 * 60 * 1000) {
                dispatch(
                    AuthAction.LoadAuthComplete({
                        tokenType: tokenTypeVal,
                        accessToken: accessTokenVal,
                        expirationDate: expirationDate
                    })
                );
            }
        }
    }, [dispatch]);

    const signIn = useCallback(() => {
        window.location.href = getDiscordLoginEndpoint();
    }, []);

    const signOut = useCallback(() => {
        localStorage.clear();
        dispatch(AuthAction.LogOut());
        navigate("/");
        window.scrollTo(0, 0);
    }, [dispatch, navigate]);

    const navigateToProfile = useCallback(() => {
        // find the player name based on their discord id
        const playerName = getPlayerName(userId ?? "");
        if (playerName) {
            navigate(`/playerOverview/${playerName}`);
            window.scrollTo(0, 0);
        }
    }, [getPlayerName, navigate, userId]);

    return (
        <Flex
            transition="0.5s ease"
            marginLeft={{ base: 0, md: "64px" }}
            px={{ base: 4, md: 4 }}
            height={FF_IS_LOGIN_ENABLED ? undefined : { base: 20, md: isHome ? 0 : 20 }}
            align="center"
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justify={{ base: "space-between", md: "flex-start" }}
            boxShadow={"0px 12px 18px -12px rgba(0,0,0,0.3)"}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onProfileIconClick}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />
            <Flex
                alignItems={"flex-start"}
                display={{ base: "fixed", md: isHome ? "none" : "fixed" }}
                marginLeft={"8px"}
            >
                <Text fontSize="20" fontWeight="bold" textTransform="uppercase" color="gray.600">
                    {headerTitle}
                </Text>
            </Flex>
            <HStack spacing={{ base: "0", md: "6" }} flex={1} justifyContent={"flex-end"}>
                {FF_IS_LOGIN_ENABLED ? (
                    <>
                        {/* <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} /> */}
                        <Flex alignItems={"center"}>
                            <Menu>
                                <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
                                    <HStack>
                                        <Avatar size={"sm"} src={userPic !== undefined ? userPic : placeholderImage} />
                                        <VStack
                                            display={{ base: "none", md: "flex" }}
                                            alignItems="flex-start"
                                            spacing="1px"
                                            ml="2"
                                        >
                                            {username !== undefined ? (
                                                <>
                                                    <Text fontSize="sm">{username}</Text>
                                                    <Text fontSize="xs" color="gray.600">
                                                        Welcome!
                                                    </Text>
                                                </>
                                            ) : (
                                                <>
                                                    <Text fontSize="sm">No User Signed In</Text>
                                                    <Text fontSize="xs" color="gray.600">
                                                        Sign In
                                                    </Text>
                                                </>
                                            )}
                                        </VStack>
                                        <Box display={{ base: "none", md: "flex" }}>
                                            <FiChevronDown />
                                        </Box>
                                    </HStack>
                                </MenuButton>
                                <MenuList
                                // bg={useColorModeValue("white", "gray.900")}
                                // borderColor={useColorModeValue("gray.200", "gray.700")}
                                >
                                    {username === undefined ? <MenuItem onClick={signIn}>Sign In</MenuItem> : null}
                                    {username !== undefined ? (
                                        <>
                                            <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
                                            <SettingsMenuItem finalRef={finalRef} />
                                            <MenuDivider />
                                            <MenuItem onClick={signOut}>Sign out</MenuItem>
                                        </>
                                    ) : null}
                                </MenuList>
                            </Menu>
                        </Flex>
                    </>
                ) : null}
            </HStack>
            <LoginModal onSignOut={signOut} finalRef={finalRef} />
        </Flex>
    );
};
