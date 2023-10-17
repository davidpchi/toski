import {
    useDisclosure,
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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Heading,
    Checkbox,
    ModalFooter,
    Button,
    FlexProps,
    Text
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthAction } from "../../redux/auth/authActions";
import { getTokenType, getAccessToken, getIsFirstLogin } from "../../redux/auth/authSelectors";
import { UserSelectors } from "../../redux/user/userSelectors";
import { DiscordService } from "../../services/DiscordService";
import { routes } from "../../navigation/routes";
import { FF_IS_LOGIN_ENABLED } from "../../services/featureFlagService";

interface HeaderProps extends FlexProps {
    onProfileIconClick: () => void;
}

const useHeaderTitle = () => {
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
            title = "Articles";
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

    const headerTitle = useHeaderTitle();
    const location = useLocation();
    const isHome = location.pathname === "/";

    const finalRef = React.useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const username = useSelector(UserSelectors.getUsername);
    const userAvatar = useSelector(UserSelectors.getAvatar);
    const userId = useSelector(UserSelectors.getId);

    const tokenType = useSelector(getTokenType);
    const accessToken = useSelector(getAccessToken);
    const isFirstLogin = useSelector(getIsFirstLogin);

    const [isRememberMe, setIsRememberMe] = useState<boolean>(true);

    const userPic = username ? `https://cdn.discordapp.com/avatars/${userId}/${userAvatar}.png` : undefined;

    // initiates the hydration of the discord info for the current user
    DiscordService.useCurrentUserInfo();

    /**
     * When the app starts, we check to see if there's an existing access token already saved via local storage.
     * If there is, use that instead of showing the user as not signed in.
     * TODO: here, we need to validate if the token has expired
     */
    useEffect(() => {
        const tokenTypeVal = localStorage.getItem("tokenType");
        const accessTokenVal = localStorage.getItem("accessToken");
        if (tokenTypeVal !== null && accessTokenVal !== null) {
            dispatch(AuthAction.LoadAuthComplete({ tokenType: tokenTypeVal, accessToken: accessTokenVal }));
        }
    }, [dispatch]);

    /**
     * This effects handles if we should be showing the modal after the user logs in.
     * The primary reason for this is to allow the user to decline the "remember me", which opts them out of local storage.
     */
    useEffect(() => {
        if (username !== undefined && isFirstLogin) {
            onOpen();
            window.scroll(0, 0);
        }
    }, [dispatch, isFirstLogin, onOpen, username]);

    /**
     * When the user closes the modal, if they have selected "remember me", we save the access token to local storage
     */
    const handleLoginModalClose = () => {
        if (isRememberMe) {
            if (tokenType) {
                localStorage.setItem("tokenType", tokenType);
            }
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            }
        } else {
            localStorage.clear();
        }

        dispatch(AuthAction.FirstLoginComplete());
        onClose();
    };

    const signIn = () => {
        window.location.href = `https://discord.com/oauth2/authorize?response_type=token&client_id=${"1163345338376138773"}&state=15773059ghq9183habn&scope=identify`;
    };

    const signOut = () => {
        localStorage.clear();
        dispatch(AuthAction.LogOut());
        navigate("/");
        window.scrollTo(0, 0);
    };

    return (
        <Flex
            transition="0.5s ease"
            ml={{ base: 0, md: 60 }}
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
                                        <Avatar
                                            size={"sm"}
                                            src={
                                                userPic !== undefined
                                                    ? userPic
                                                    : "https://static.thenounproject.com/png/2062361-200.png"
                                            }
                                        />
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
                                            <MenuItem>Profile</MenuItem>
                                            <MenuItem>Settings</MenuItem>
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
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={handleLoginModalClose}>
                <ModalOverlay />
                <ModalContent maxW={"500px"}>
                    <ModalHeader>Is this you?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction={"column"} justifyContent={"center"} flexWrap={"wrap"} alignItems={"center"}>
                            <Heading>{username}</Heading>
                            <Avatar
                                size={"2xl"}
                                src={
                                    userPic !== undefined
                                        ? userPic
                                        : "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                }
                            />
                            <Checkbox
                                marginTop={"16px"}
                                isChecked={isRememberMe}
                                onChange={() => {
                                    setIsRememberMe(!isRememberMe);
                                }}
                            >
                                Remember me
                            </Checkbox>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={handleLoginModalClose}>
                            Let's Jam!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};
