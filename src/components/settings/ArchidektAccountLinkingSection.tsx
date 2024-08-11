import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Flex, Text, Input, Image } from "@chakra-ui/react";
import { CheckIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { ExternalProfile } from "../../types/domain/ExternalProfile";
import { AppState } from "../../redux/rootReducer";
import { ProfileSelectors } from "../../redux/profiles/profilesSelectors";
import { useUserInfo } from "../../logic/hooks/userHooks";
import { secondaryColor } from "../../themes/acorn";
import { ArchidektService } from "../../services/ArchidektService";
import { useValidateArchidektId } from "../../logic/hooks/archidektHooks";

const defaultArchidektLogo = "https://www.archidekt.com/images/logo.svg";
const errorArchidektLogo = "https://upload.wikimedia.org/wikipedia/commons/4/4e/OOjs_UI_icon_error-destructive.svg";
const missingArchidektProfileImage = "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ico_user_profile_blank.png";

const ArchidektAccountLinkingValidation = React.memo(function ArchidektAccountLinkingValidation({
    isValid,
    archidektId
}: {
    isValid: boolean | undefined;
    archidektId: string;
}) {
    if (isValid === false) {
        return (
            <>
                <WarningTwoIcon color={"red"} marginRight={"8px"} />
                <Text color={"red"}>
                    Failed to locate Archidekt profile. Note that Archidekt IDs are case sensitive
                </Text>
            </>
        );
    } else if (isValid === true && archidektId !== "") {
        return (
            <>
                <CheckIcon color={"green"} marginRight={"8px"} />
                <Text color={"green"}>Archidekt profile located</Text>
            </>
        );
    }

    // if the validationResult is undefined, that means validation has not occurred yet
    return null;
});

export const ArchidektAccountLinkingSection = React.memo(function ArchidektAccountLinkingSection({
    archidektId,
    setArchidektId,
    setHasErrors
}: {
    archidektId: string;
    setArchidektId: (value: string) => void;
    setHasErrors: (value: boolean) => void;
}) {
    const validateArchidektId = useValidateArchidektId();
    const hydrateArchidektProfile = ArchidektService.useHydrateArchidektProfile();
    const { userId } = useUserInfo();

    const profile = useSelector((state: AppState) => ProfileSelectors.getProfile(state, userId ?? ""));
    const archidektProfile: ExternalProfile | undefined = useSelector((state: AppState) =>
        ProfileSelectors.getArchidektProfile(state, profile?.archidektId ?? "")
    );

    // when we mount the component, validation has not ocurred yet
    const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
    const [archidektImageUri, setArchidektImageUri] = useState<string>(defaultArchidektLogo);

    // when we load the user's profile, if they already have a archidekt profile linked we should use that
    useEffect(() => {
        if (profile && profile.archidektId && !archidektProfile) {
            hydrateArchidektProfile(profile.archidektId);
        }
    }, [archidektProfile, hydrateArchidektProfile, profile]);

    // if we are hydrating the archidekt profile for the first time, let's set the image AND the archidekt id
    useEffect(() => {
        if (archidektProfile) {
            setArchidektImageUri(archidektProfile.imageUrl ?? missingArchidektProfileImage);
            setArchidektId(archidektProfile.userName);
        }
    }, [archidektProfile, setArchidektId]);

    const onArchidektInputBlur = useCallback(async () => {
        // If the archidekt id is already validated, do not make the call.
        // This prevents repeated calls to the archidekt service when the user is clicking
        // in and out of the input with no changes.
        if (isValid !== undefined) {
            return;
        }

        const validationResult = await validateArchidektId(archidektId);

        if (validationResult.isValid) {
            if (validationResult.archidektProfileImageUri === "") {
                setArchidektImageUri(defaultArchidektLogo);
            } else if (validationResult.archidektProfileImageUri) {
                setArchidektImageUri(validationResult.archidektProfileImageUri);
            } else {
                // if the archidekt account is valid, there may still be no profile image
                setArchidektImageUri(missingArchidektProfileImage);
            }
            setIsValid(true);
            setHasErrors(false);
        } else {
            // if the archidekt account does not validate, put us in the error state
            setArchidektImageUri(errorArchidektLogo);
            setIsValid(false);
            setHasErrors(true);
        }

        setIsValid(validationResult.isValid);
    }, [isValid, validateArchidektId, archidektId, setHasErrors]);

    function updateArchidektIdInputValue(event: any) {
        // if the user changes their id, they haven't validated it yet
        setIsValid(undefined);
        setArchidektId(event.target.value);

        // an empty id implies that they are clearing the archidekt account link
        if (event.target.value === "") {
            setArchidektImageUri(defaultArchidektLogo);
        }
    }

    return (
        <Flex alignSelf={"stretch"} marginTop={4} marginBottom={4}>
            <Flex flexDirection={"column"} flex={1} marginRight={"8px"}>
                <Text>Linked Archidekt Account:</Text>
                <Input
                    value={archidektId}
                    onChange={updateArchidektIdInputValue}
                    onBlur={onArchidektInputBlur}
                    placeholder={"No Archidekt Account Linked"}
                />
                <Flex
                    fontSize="xs"
                    color="gray.600"
                    alignSelf={"stretch"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <ArchidektAccountLinkingValidation isValid={isValid} archidektId={archidektId} />
                </Flex>
            </Flex>
            <Flex
                width={"110px"}
                height={"80px"}
                padding={"8px"}
                borderRadius={8}
                justifyContent={"center"}
                background={secondaryColor[100]}
            >
                <Image src={archidektImageUri} alt="archidekt account link" borderRadius={8} flex={0} />
            </Flex>
        </Flex>
    );
});
