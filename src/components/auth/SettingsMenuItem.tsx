import React, { useEffect, useMemo, useState } from "react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Flex,
    Heading,
    Avatar,
    Checkbox,
    ModalFooter,
    Button,
    useDisclosure,
    MenuItem,
    Select,
    Image,
    Text,
    Divider
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { UserSelectors } from "../../redux/user/userSelectors";
import { AuthSelectors } from "../../redux/auth/authSelectors";
import { ProfileSelectors } from "../../redux/profiles/profilesSelectors";
import { AppState } from "../../redux/rootReducer";
import { commanderList } from "../../services/commanderList";
import { ProfileService } from "../../services/ProfileService";
import { FiLink } from "react-icons/fi";
import { CheckIcon, WarningTwoIcon } from "@chakra-ui/icons";

const placeholderImage = "https://static.thenounproject.com/png/5425-200.png";

export const SettingsMenuItem = React.memo(function SettingsMenuItem({ finalRef }: { finalRef: any }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const setFavoriteCommander = ProfileService.useSetFavoriteCommander();

    const tokenType = useSelector(AuthSelectors.getTokenType);
    const accessToken = useSelector(AuthSelectors.getAccessToken);

    const username = useSelector(UserSelectors.getUsername);
    const userAvatar = useSelector(UserSelectors.getAvatar);
    const userId = useSelector(UserSelectors.getId);
    const userPic = username ? `https://cdn.discordapp.com/avatars/${userId}/${userAvatar}.png` : undefined;

    const profiles = useSelector(ProfileSelectors.getProfiles);
    useEffect(() => {
        // if profiles are hydrated AND we don't see our current user in the profiles list, kick off an "initialization" request to get this user into the db
        if (profiles !== undefined && userId !== undefined && profiles[userId] === undefined) {
            console.log("Initialized user in chatterfang:" + userId);
            setFavoriteCommander("");
        }
    }, [profiles, setFavoriteCommander, userId]);

    const profile = useSelector((state: AppState) => ProfileSelectors.getProfile(state, userId ?? ""));

    const toskiPlayer = ProfileService.getPlayerName(profile ? profile.id : "");

    const commandersArray = useMemo(() => {
        return Object.keys(commanderList).map((commanderName) => {
            return { id: commanderList[commanderName].id, name: commanderName };
        });
    }, []);

    const accessTokenFromState = localStorage.getItem("tokenType");

    const [isRememberMe, setIsRememberMe] = useState<boolean>(accessTokenFromState !== null);
    const favoriteCommanderId = profile && profile.favoriteCommanderId ? profile.favoriteCommanderId : "";
    const [commanderSelectValue, setCommanderSelectValue] = useState<string>(favoriteCommanderId);

    const commanderImage = Object.values(commanderList)
        .find((commander) => commander.id === commanderSelectValue)
        ?.image.replace("normal", "art_crop");

    const onCommanderSelectChange = (event: any) => {
        const commander = event.target.value;
        setCommanderSelectValue(commander);
    };

    /**
     * When the user closes the modal, if they have selected "remember me", we save the access token to local storage
     */
    const toggleRememberMe = () => {
        if (isRememberMe) {
            // turn off remember me if it is on
            localStorage.clear();
        } else {
            if (tokenType) {
                localStorage.setItem("tokenType", tokenType);
            }
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            }
        }

        setIsRememberMe(!isRememberMe);
    };

    const closeModal = () => {
        onClose();
    };

    const onSave = () => {
        setFavoriteCommander(commanderSelectValue);
        closeModal();
    };

    return (
        <>
            <MenuItem onClick={() => onOpen()}>Settings</MenuItem>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent maxW={"500px"}>
                    <ModalHeader>Settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex
                            direction={"column"}
                            justifyContent={"center"}
                            flexWrap={"wrap"}
                            alignItems={"flex-start"}
                            marginBottom={"64px"}
                        >
                            <Heading size={"md"} padding={0} marginBottom={"8px"}>
                                My Profile
                            </Heading>
                            <Divider marginBottom={"16px"} />
                            <Flex flexDirection={"row"}>
                                <Flex flexDirection={"column"} marginRight={"8px"}>
                                    <Text>Favorite Commander: </Text>
                                    <Select
                                        size="lg"
                                        onChange={onCommanderSelectChange}
                                        value={commanderSelectValue}
                                        placeholder={"Use most played commander"}
                                    >
                                        {commandersArray.map((option) => {
                                            return <option value={option.id}>{option.name}</option>;
                                        })}
                                    </Select>
                                </Flex>

                                {commanderImage !== undefined ? (
                                    <Image src={commanderImage} height={20} borderRadius={8} />
                                ) : (
                                    <Image src={placeholderImage} height={"80px"} borderRadius={8} />
                                )}
                            </Flex>
                        </Flex>
                        <Heading size={"md"} padding={0} marginBottom={"8px"}>
                            Linked Discord Account
                        </Heading>
                        <Divider marginBottom={"16px"} />
                        <Flex direction={"row"} justifyContent={"center"} alignItems={"center"} marginBottom={"16px"}>
                            <Flex
                                direction={"row"}
                                justifyContent={"flex-start"}
                                alignItems={"center"}
                                marginRight={"16px"}
                            >
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
                            <FiLink size={32} />

                            <Flex
                                direction={"row"}
                                justifyContent={"flex-start"}
                                alignItems={"center"}
                                marginLeft={"16px"}
                            >
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
                        <Flex
                            fontSize="xs"
                            color="gray.600"
                            alignSelf={"stretch"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
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

                        <Checkbox
                            marginTop={"32px"}
                            isChecked={isRememberMe}
                            onChange={toggleRememberMe}
                            marginBottom={"64px"}
                        >
                            Keep me signed in
                        </Checkbox>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onSave}>
                            Save
                        </Button>
                        <Button mr={3} onClick={closeModal} variant={"outline"}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
});
