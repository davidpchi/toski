import { useCallback } from "react";

import { MoxfieldProfile } from "../../types/domain/MoxfieldProfile";
import { MoxfieldService } from "../../services/MoxfieldService";

/**
 * Gets a callback that will make a request to the moxfield service to validate that the moxfield id is valid.
 * Note that empty ids are considered valid as they are used to represent "no account linked".
 * @returns If the moxfield is valid, returns an object with "isValid" set to true as well as the account image url. Otherwise, returns an object with "isValid" set to false.
 */
export const useValidateMoxfieldId = (): ((
    moxfieldId: string
) => Promise<{ isValid: false } | { isValid: true; moxfieldProfileImageUri: string | undefined }>) => {
    const getMoxfieldProfile = MoxfieldService.useGetMoxfieldProfile();

    return useCallback(
        async (moxfieldId: string) => {
            // If the moxfield id is empty, that means they want to remove the moxfield account link.
            // Hence, this is technically a valid moxfield id.
            if (moxfieldId === "") {
                return { isValid: true, moxfieldProfileImageUri: "" };
            }

            // Make the call to the moxfield service to get the moxfield profile for the specified id.
            const moxfieldProfileObj: MoxfieldProfile | undefined = await getMoxfieldProfile(moxfieldId);

            // If moxfield id does not match the one returned by the service (case-sensitive), fail validation.
            if (moxfieldProfileObj !== undefined && moxfieldProfileObj.userName === moxfieldId) {
                return { isValid: true, moxfieldProfileImageUri: moxfieldProfileObj.imageUrl };
            }

            return { isValid: false };
        },
        [getMoxfieldProfile]
    );
};
