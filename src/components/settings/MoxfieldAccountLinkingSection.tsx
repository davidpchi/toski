import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Flex, Text, Input, Image } from "@chakra-ui/react";
import { CheckIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { useValidateMoxfieldId } from "../../logic/hooks/moxfieldHooks";
import { MoxfieldProfile } from "../../types/domain/MoxfieldProfile";
import { AppState } from "../../redux/rootReducer";
import { MoxfieldService } from "../../services/MoxfieldService";
import { ProfileSelectors } from "../../redux/profiles/profilesSelectors";
import { useUserInfo } from "../../logic/hooks/userHooks";
import { secondaryColor } from "../../themes/acorn";

const defaultMoxfieldLogo = "https://pbs.twimg.com/profile_images/1674989472839094273/p7a37K9W_400x400.jpg";
const errorMoxfieldLogo = "https://upload.wikimedia.org/wikipedia/commons/4/4e/OOjs_UI_icon_error-destructive.svg";
const missingMoxfieldProfileImage = "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ico_user_profile_blank.png";

const MoxfieldAccountLinkingValidation = React.memo(function MoxfieldAccountLinkingValidation({
    isValid,
    moxfieldId
}: {
    isValid: boolean | undefined;
    moxfieldId: string;
}) {
    if (isValid === false) {
        return (
            <>
                <WarningTwoIcon color={"red"} marginRight={"8px"} />
                <Text color={"red"}>Failed to locate Moxfield profile. Note that Moxfield IDs are case sensitive</Text>
            </>
        );
    } else if (isValid === true && moxfieldId !== "") {
        return (
            <>
                <CheckIcon color={"green"} marginRight={"8px"} />
                <Text color={"green"}>Moxfield profile located</Text>
            </>
        );
    }

    // if the validationResult is undefined, that means validation has not occurred yet
    return null;
});

export const MoxfieldAccountLinkingSection = React.memo(function MoxfieldAccountLinkingSection({
    moxfieldId,
    setMoxfieldId,
    setHasErrors
}: {
    moxfieldId: string;
    setMoxfieldId: (value: string) => void;
    setHasErrors: (value: boolean) => void;
}) {
    const validateMoxfieldId = useValidateMoxfieldId();
    const hydrateMoxfieldProfile = MoxfieldService.useHydrateMoxfieldProfile();
    const { userId } = useUserInfo();

    const profile = useSelector((state: AppState) => ProfileSelectors.getProfile(state, userId ?? ""));
    const moxfieldProfile: MoxfieldProfile | undefined = useSelector((state: AppState) =>
        ProfileSelectors.getMoxfieldProfile(state, profile?.moxfieldId ?? "")
    );

    // when we mount the component, validation has not ocurred yet
    const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
    const [moxfieldImageUrl, setMoxfieldImageUrl] = useState<string>(defaultMoxfieldLogo);

    // when we load the user's profile, if they already have a moxfield profile linked we should use that
    useEffect(() => {
        if (profile && profile.moxfieldId && !moxfieldProfile) {
            hydrateMoxfieldProfile(profile.moxfieldId);
            console.log("hydrating");
        }
    }, [hydrateMoxfieldProfile, moxfieldProfile, profile]);

    // if we are hydrating the moxfield profile for the first time, let's set the image AND the moxfield id
    useEffect(() => {
        if (moxfieldProfile) {
            setMoxfieldImageUrl(moxfieldProfile.imageUrl ?? missingMoxfieldProfileImage);
            setMoxfieldId(moxfieldProfile.userName);
        }
    }, [moxfieldProfile, setMoxfieldId]);

    const onMoxfieldInputBlur = useCallback(async () => {
        // If the moxfield id is already validated, do not make the call.
        // This prevents repeated calls to the moxfield service when the user is clicking
        // in and out of the input with no changes.
        if (isValid !== undefined) {
            return;
        }

        const validationResult = await validateMoxfieldId(moxfieldId);

        if (validationResult.isValid) {
            if (validationResult.moxfieldProfileImageUri === "") {
                setMoxfieldImageUrl(defaultMoxfieldLogo);
            } else if (validationResult.moxfieldProfileImageUri) {
                setMoxfieldImageUrl(validationResult.moxfieldProfileImageUri);
            } else {
                // if the moxfield account is valid, there may still be no profile image
                setMoxfieldImageUrl(missingMoxfieldProfileImage);
            }
            setIsValid(true);
            setHasErrors(false);
        } else {
            // if the moxfield account does not validate, put us in the error state
            setMoxfieldImageUrl(errorMoxfieldLogo);
            setIsValid(false);
            setHasErrors(true);
        }

        setIsValid(validationResult.isValid);
    }, [isValid, validateMoxfieldId, moxfieldId, setHasErrors]);

    function updateMoxfieldIdInputValue(event: any) {
        // if the user changes their id, they haven't validated it yet
        setIsValid(undefined);
        setMoxfieldId(event.target.value);

        // an empty id implies that they are clearing the moxfield account link
        if (event.target.value === "") {
            setMoxfieldImageUrl(defaultMoxfieldLogo);
        }
    }

    return (
        <Flex alignSelf={"stretch"}>
            <Flex flexDirection={"column"} flex={1} marginRight={"8px"}>
                <Text>Linked Moxfield Account:</Text>
                <Input
                    value={moxfieldId}
                    onChange={updateMoxfieldIdInputValue}
                    onBlur={onMoxfieldInputBlur}
                    placeholder={"No Moxfield Account Linked"}
                />
                <Flex
                    fontSize="xs"
                    color="gray.600"
                    alignSelf={"stretch"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <MoxfieldAccountLinkingValidation isValid={isValid} moxfieldId={moxfieldId} />
                </Flex>
            </Flex>
            <Flex
                width={"110px"}
                height={"80px"}
                borderRadius={8}
                justifyContent={"center"}
                background={secondaryColor[100]}
            >
                <Image src={moxfieldImageUrl} alt="moxfield account link" height={"80px"} borderRadius={8} flex={0} />
            </Flex>
        </Flex>
    );
});
