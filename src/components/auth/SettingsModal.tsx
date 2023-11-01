import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FiRepeat } from "react-icons/fi";
import { useSelector } from "react-redux";

import { CheckIcon, WarningTwoIcon } from "@chakra-ui/icons";
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
    Divider,
    Input
} from "@chakra-ui/react";

import { ProfileSelectors } from "../../redux/profiles/profilesSelectors";
import { AppState } from "../../redux/rootReducer";
import { commanderList } from "../../services/commanderList";
import { ProfileService } from "../../services/ProfileService";
import { useAuthInfo } from "../../logic/hooks/authHooks";
import { useUserInfo } from "../../logic/hooks/userHooks";
import { MoxfieldService } from "../../services/MoxfieldService";
import { MoxfieldProfile } from "../../types/domain/MoxfieldProfile";

const placeholderImage = "https://static.thenounproject.com/png/5425-200.png";
const defaultMoxfieldLogo = "https://pbs.twimg.com/profile_images/1674989472839094273/p7a37K9W_400x400.jpg";
const errorMoxfieldLogo = "https://upload.wikimedia.org/wikipedia/commons/4/4e/OOjs_UI_icon_error-destructive.svg";
const missingMoxfieldProfileImage = "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ico_user_profile_blank.png";

export const SettingsMenuItem = React.memo(function SettingsMenuItem({ finalRef }: { finalRef: any }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const updateProfile = ProfileService.useUpdateProfile();
    const getPlayerName = ProfileService.useGetPlayerName();
    const { accessToken, tokenType, expirationDate } = useAuthInfo();
    const { userId, userPic, username } = useUserInfo();
    const getMoxfieldProfile = MoxfieldService.useGetMoxfieldProfile();

    const accessTokenFromState = localStorage.getItem("tokenType");

    const profile = useSelector((state: AppState) => ProfileSelectors.getProfile(state, userId ?? ""));
    const toskiPlayer = getPlayerName(profile ? profile.id : "");

    const favoriteCommanderId = profile && profile.favoriteCommanderId ? profile.favoriteCommanderId : "no value";
    const [commanderSelectValue, setCommanderSelectValue] = useState<string>(() => favoriteCommanderId);
    const [isRememberMe, setIsRememberMe] = useState<boolean>(accessTokenFromState !== null);
    const [showMoxfieldLinker, setShowMoxfieldLinker] = useState<boolean>(false);
    const [moxfieldIdInputValue, setMoxfieldIdInputValue] = useState<string>("");
    const [moxfieldImageUrl, setMoxfieldImageUrl] = useState<string>(defaultMoxfieldLogo);
    const [moxfieldImageValidated, setMoxfieldImageValidated] = useState<boolean>(false);

    const profiles = useSelector(ProfileSelectors.getProfiles);

    useEffect(() => {
        // if profiles are hydrated AND we don't see our current user in the profiles list, kick off an "initialization" request to get this user into the db
        if (profiles !== undefined && userId !== undefined && profiles[userId] === undefined) {
            console.log("Initialized user in chatterfang:" + userId);
            updateProfile("");
        }
    }, [profiles, updateProfile, userId]);

    const commandersArray = useMemo(() => {
        return Object.keys(commanderList).map((commanderName) => {
            return { id: commanderList[commanderName].id, name: commanderName };
        });
    }, []);

    const commanderImage = useMemo(() => {
        return Object.values(commanderList)
            .find((commander) => commander.id === commanderSelectValue)
            ?.image.replace("normal", "art_crop");
    }, [commanderSelectValue]);

    const onCommanderSelectChange = useCallback(
        (event: any) => {
            const commander = event.target.value;
            setCommanderSelectValue(commander);
        },
        [setCommanderSelectValue]
    );

    // When the user closes the modal, if they have selected "remember me", we save the access token to local storage
    const toggleRememberMe = useCallback(() => {
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
            if (expirationDate) {
                localStorage.setItem("expirationDate", expirationDate.getTime().toString());
            }
        }

        setIsRememberMe(!isRememberMe);
    }, [accessToken, expirationDate, isRememberMe, tokenType]);

    const moxfieldLinkerToggle = useCallback(() => {
        setShowMoxfieldLinker(!showMoxfieldLinker);
    }, [showMoxfieldLinker]);

    const onMoxfieldInputBlur = useCallback(async () => {
        const moxfieldProfileObj: MoxfieldProfile | undefined = await getMoxfieldProfile(moxfieldIdInputValue);
        console.log(moxfieldProfileObj); // TODO: Remove before merge

        // Case: Moxfield ID does not validate (case-sensitive)
        if (moxfieldProfileObj === undefined || moxfieldProfileObj.userName !== moxfieldIdInputValue) {
            setMoxfieldImageUrl(errorMoxfieldLogo);
            setMoxfieldImageValidated(false);
            return;
        }

        // Case: Moxfield ID validates AND has a profile image
        if (moxfieldProfileObj.imageUrl) {
            setMoxfieldImageUrl(moxfieldProfileObj.imageUrl);
            setMoxfieldImageValidated(true);
        }

        // Case: Moxfield ID validates but does NOT have a profile image
        else {
            setMoxfieldImageUrl(missingMoxfieldProfileImage);
            setMoxfieldImageValidated(true);
        }
    }, [getMoxfieldProfile, moxfieldIdInputValue]);

    // TODO: we should figure out a way that hiding the modal forces an unmount of this entire component instead of just tying it to the menu item.
    const openModal = useCallback(() => {
        // because the modal always exists and we are just toggling the visibility of the modal,
        // the initial value the commanderSelectValue will always be "" because the profile hasn't hydrated yet.
        // hence, force a hydration of the commanderSelectValue every time the modal opens for the first time.
        setCommanderSelectValue(favoriteCommanderId);
        onOpen();
    }, [favoriteCommanderId, onOpen]);

    const closeModal = useCallback(() => {
        onClose();
        if (showMoxfieldLinker) {
            moxfieldLinkerToggle();
        }
    }, [moxfieldLinkerToggle, onClose, showMoxfieldLinker]);

    const onSave = useCallback(() => {
        console.log(moxfieldIdInputValue.length);
        onMoxfieldInputBlur();
        if (moxfieldIdInputValue.length > 1 && moxfieldImageValidated) {
            updateProfile(commanderSelectValue, moxfieldIdInputValue);
            console.log("onSave"); // TODO: Remove before merge
            console.log(moxfieldIdInputValue);
        } else updateProfile(commanderSelectValue);

        closeModal();
    }, [
        closeModal,
        commanderSelectValue,
        moxfieldIdInputValue,
        moxfieldImageValidated,
        onMoxfieldInputBlur,
        updateProfile
    ]);

    function updateMoxfieldIdInputValue(event: any) {
        setMoxfieldIdInputValue(event.target.value);
    }

    function renderMoxfieldValidation() {
        if (moxfieldImageUrl === errorMoxfieldLogo) {
            return (
                <>
                    <WarningTwoIcon color={"red"} marginRight={"8px"} />
                    <Text color={"red"}>
                        Failed to locate Moxfield profile. Note that Moxfield IDs are case sensitive
                    </Text>
                </>
            );
        } else if (moxfieldImageUrl !== defaultMoxfieldLogo) {
            return (
                <>
                    <CheckIcon color={"green"} marginRight={"8px"} />
                    <Text color={"green"}>Moxfield profile located</Text>
                </>
            );
        } else return null;
    }

    return (
        <>
            <MenuItem onClick={openModal}>Settings</MenuItem>
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
                            marginBottom={"20px"}
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
                                            return (
                                                <option value={option.id} key={option.id}>
                                                    {option.name}
                                                </option>
                                            );
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
                        <Flex marginBottom={"64px"} justifyContent={"Center"}>
                            {showMoxfieldLinker ? (
                                <>
                                    <Flex flexDirection={"column"} flex={1} marginRight={"8px"}>
                                        <Text>Moxfield ID: </Text>
                                        <Input
                                            value={moxfieldIdInputValue}
                                            onChange={updateMoxfieldIdInputValue}
                                            onBlur={onMoxfieldInputBlur}
                                            placeholder={"Your Moxfield Id"}
                                        />
                                        <Flex
                                            fontSize="xs"
                                            color="gray.600"
                                            alignSelf={"stretch"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                        >
                                            {renderMoxfieldValidation()}
                                        </Flex>
                                    </Flex>
                                    <Image
                                        src={moxfieldImageUrl}
                                        alt="Moxfield logo"
                                        height={"80px"}
                                        borderRadius={8}
                                        flex={0}
                                    />
                                </>
                            ) : (
                                <Button mr={3} onClick={moxfieldLinkerToggle}>
                                    Add or Change Linked Moxfield Account
                                </Button>
                            )}
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
                            <FiRepeat size={32} />

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
