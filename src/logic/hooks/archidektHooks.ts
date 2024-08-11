import { useCallback } from "react";

import { ExternalProfile } from "../../types/domain/ExternalProfile";
import { ArchidektService } from "../../services/ArchidektService";

/**
 * Gets a callback that will make a request to the archidekt service to validate that the archidekt id is valid.
 * Note that empty ids are considered valid as they are used to represent "no account linked".
 * @returns If the archidekt is valid, returns an object with "isValid" set to true as well as the account image url. Otherwise, returns an object with "isValid" set to false.
 */
export const useValidateArchidektId = (): ((
    archidektId: string
) => Promise<{ isValid: false } | { isValid: true; archidektProfileImageUri: string | undefined }>) => {
    const getArchidektProfile = ArchidektService.useGetArchidektProfile();

    return useCallback(
        async (archidektId: string) => {
            // If the archidekt id is empty, that means they want to remove the archidekt account link.
            // Hence, this is technically a valid archidekt id.
            if (archidektId === "") {
                return { isValid: true, archidektProfileImageUri: "" };
            }

            // Make the call to the archidekt service to get the archidekt profile for the specified id.
            const archidektProfileObj: ExternalProfile | undefined = await getArchidektProfile(archidektId);

            // If archidekt id does not match the one returned by the service (case-sensitive), fail validation.
            if (archidektProfileObj !== undefined && archidektProfileObj.userName === archidektId) {
                return { isValid: true, archidektProfileImageUri: archidektProfileObj.imageUrl };
            }

            return { isValid: false };
        },
        [getArchidektProfile]
    );
};
