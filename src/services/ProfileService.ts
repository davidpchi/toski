import axios from "axios";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AuthSelectors } from "../redux/auth/authSelectors";
import { UserSelectors } from "../redux/user/userSelectors";
import { ChatterfangProfile } from "../types/service/ProfileService/ChatterfangProfile";
import { Profile } from "../types/domain/Profile";
import { profilesDataMapper } from "../types/service/ProfileService/dataMappers";
import { ProfilesAction } from "../redux/profiles/profilesActions";

const profileMap: { [name: string]: string } = {
    Doomgeek: "230904033915830272",
    "Aetherium Slinky": "226715073031176193",
    LumenAdi: "224315766042787840",
    Wisecompany: "396390132988641281",
    Shy: "563015313935826984",
    Wrinklebuns: "187707404761169920"
};

const useHydrateProfiles = () => {
    const dispatch = useDispatch();

    const accessToken = useSelector(AuthSelectors.getAccessToken);
    const userId = useSelector(UserSelectors.getId);

    const endpoint = "https://chatterfang.onrender.com/profiles";

    return useCallback(() => {
        if (accessToken !== undefined && userId !== undefined) {
            axios
                .get<string>(endpoint, {
                    headers: { "access-token": accessToken }
                })
                .then((res) => {
                    const data: ChatterfangProfile[] = res.data as unknown as ChatterfangProfile[];
                    const profiles: Profile[] = profilesDataMapper(data);
                    dispatch(ProfilesAction.GetProfilesComplete(profiles));
                });
        }
    }, [accessToken, userId, dispatch]);
};

const useUpdateProfile = () => {
    const hydrateProfiles = useHydrateProfiles();

    const accessToken = useSelector(AuthSelectors.getAccessToken);
    const userId = useSelector(UserSelectors.getId);

    const endpoint = "https://chatterfang.onrender.com/profiles";

    return useCallback(
        (commanderId: string, moxfieldId?: string) => {
            const newProfile =
                // specifically check against undefined because empty string moxfield id is valid (unlinking account)
                moxfieldId !== undefined
                    ? { userId: userId, favoriteCommander: commanderId, moxfieldId: moxfieldId }
                    : {
                          userId: userId,
                          favoriteCommander: commanderId
                      };

            if (accessToken !== undefined && userId !== undefined) {
                axios
                    .post<string>(endpoint, newProfile, {
                        headers: { "access-token": accessToken, "Content-Type": "application/json" }
                    })
                    .then((_res) => {
                        // kick off a rehydrate of our profiles
                        hydrateProfiles();
                    });
            }
        },
        [accessToken, hydrateProfiles, userId]
    );
};

/**
 * Given a player name (not discord screen name), return the discord id
 */
const useGetProfileId = (): ((playerName: string) => string | undefined) => {
    return useCallback((playerName: string) => {
        return profileMap[playerName] ?? "";
    }, []);
};

/**
 * Given a discord id, return the player name (not discord screen name)
 * @param profileId The discord Id to search from
 * @returns The player name (not the discord screen name). Returns undefined if the mapping doesn't exist.
 */
const useGetPlayerName = (): ((profileId: string) => string | undefined) => {
    return useCallback((profileId: string) => {
        return Object.keys(profileMap).find((name) => profileMap[name] === profileId);
    }, []);
};

export const ProfileService = {
    useHydrateProfiles,
    useUpdateProfile,
    useGetProfileId,
    useGetPlayerName
};
