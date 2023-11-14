import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Flex,
    Heading,
    ModalFooter,
    Button,
    useDisclosure,
    MenuItem,
    Divider
} from "@chakra-ui/react";

import { ProfileSelectors } from "../../redux/profiles/profilesSelectors";
import { AppState } from "../../redux/rootReducer";
import { ProfileService } from "../../services/ProfileService";
import { useUserInfo } from "../../logic/hooks/userHooks";
import { DiscordAccountLinkingSection } from "./DiscordAccountLinkingSection";
import { PersistSignInSection } from "./PersistSignInSection";
import { FavoriteCommanderSection } from "./FavoriteCommanderSection";
import { MoxfieldAccountLinkingSection } from "./MoxfieldAccountLinkingSection";

export const SettingsMenuItem = React.memo(function SettingsMenuItem({ finalRef }: { finalRef: any }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { userId } = useUserInfo();

    const updateProfile = ProfileService.useUpdateProfile();

    const profile = useSelector((state: AppState) => ProfileSelectors.getProfile(state, userId ?? ""));

    const favoriteCommanderId = profile && profile.favoriteCommanderId ? profile.favoriteCommanderId : "no value";
    const [commanderSelectValue, setCommanderSelectValue] = useState<string>(() => favoriteCommanderId);

    const profiles = useSelector(ProfileSelectors.getProfiles);

    // this is the moxfieldId that is used to populate the value of the input. It may not match the one
    // in the state if the user is in the process of updating their linked moxfield account.
    const [moxfieldId, setMoxfieldId] = useState<string>(profile?.moxfieldId ?? "");
    // This determines if the user can save. Various validators may take this setter as a way of preventing the
    // settings page from saving. Currently, this is only the moxfield account linking.
    const [hasErrors, setHasErrors] = useState<boolean>(false);

    useEffect(() => {
        // if profiles are hydrated AND we don't see our current user in the profiles list, kick off an "initialization" request to get this user into the db
        if (profiles !== undefined && userId !== undefined && profiles[userId] === undefined) {
            console.log("Initialized user in chatterfang:" + userId);
            updateProfile("");
        }
    }, [profiles, updateProfile, userId]);

    // TODO: we should figure out a way that hiding the modal forces an unmount of this entire component instead of just tying it to the menu item.
    const openModal = useCallback(() => {
        // because the modal always exists and we are just toggling the visibility of the modal,
        // the initial value the commanderSelectValue will always be "" because the profile hasn't hydrated yet.
        // hence, force a hydration of the commanderSelectValue every time the modal opens for the first time.
        setCommanderSelectValue(favoriteCommanderId);

        onOpen();
    }, [favoriteCommanderId, onOpen]);

    const onSave = useCallback(async () => {
        console.log(hasErrors);
        if (!hasErrors) {
            updateProfile(commanderSelectValue, moxfieldId);
            onClose();
        }
    }, [hasErrors, onClose, updateProfile, commanderSelectValue, moxfieldId]);

    return (
        <>
            <MenuItem onClick={openModal}>Settings</MenuItem>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW={"500px"}>
                    <ModalHeader>Settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DiscordAccountLinkingSection />
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
                            <FavoriteCommanderSection
                                favoriteCommander={commanderSelectValue}
                                setFavoriteCommander={setCommanderSelectValue}
                            />
                            <MoxfieldAccountLinkingSection
                                moxfieldId={moxfieldId}
                                setMoxfieldId={setMoxfieldId}
                                setHasErrors={setHasErrors}
                            />
                        </Flex>
                        <PersistSignInSection />
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onSave} isDisabled={hasErrors}>
                            Save
                        </Button>
                        <Button mr={3} onClick={onClose} variant={"outline"}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
});
