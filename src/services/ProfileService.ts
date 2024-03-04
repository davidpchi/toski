import axios from "axios";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AuthSelectors } from "../redux/auth/authSelectors";
import { UserSelectors } from "../redux/user/userSelectors";
import { ChatterfangProfile } from "../types/service/ProfileService/ChatterfangProfile";
import { Profile } from "../types/domain/Profile";
import { profilesDataMapper } from "../types/service/ProfileService/dataMappers";
import { ProfilesAction } from "../redux/profiles/profilesActions";
import { MoxfieldService } from "./MoxfieldService";

const profileMap: { [name: string]: string } = {
    Doomgeek: "230904033915830272",
    "Aetherium Slinky": "226715073031176193",
    LumenAdi: "224315766042787840",
    Wisecompany: "396390132988641281",
    Leon_Von_Kaktuus: "563015313935826984",
    Wrinklebuns: "187707404761169920",
    WitchPHD: "71482669514366976"
};

const useHydrateProfiles = () => {
    const dispatch = useDispatch();

    const hydrateMoxfieldDeck = MoxfieldService.useHydrateMoxfieldDeck();

    const endpoint = "https://chatterfang.onrender.com/profiles";

    return useCallback(() => {
        axios
            .get<string>(endpoint, {
                headers: {}
            })
            .then((res) => {
                const data: ChatterfangProfile[] = res.data as unknown as ChatterfangProfile[];
                const profiles: Profile[] = profilesDataMapper(data);
                dispatch(ProfilesAction.GetProfilesComplete(profiles));

                // upon hydrating profiles, also update the moxfield decks for all of these profiles
                if (profiles.length > 0) {
                    for (const profile of profiles) {
                        // we need to hydrate each of these decks
                        for (let i = 0; i < profile.decks.length; i++) {
                            const deck = profile.decks[i];
                            setTimeout(() => hydrateMoxfieldDeck(deck.moxfieldId), 250 * i);
                        }
                    }
                }
            });
    }, [dispatch, hydrateMoxfieldDeck]);
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

const useAddDeckToProfile = () => {
    const hydrateProfiles = useHydrateProfiles();

    const accessToken = useSelector(AuthSelectors.getAccessToken);
    const userId = useSelector(UserSelectors.getId);

    const endpoint = "https://chatterfang.onrender.com/addDeck";

    return useCallback(
        (deckUrl: string, onSuccess?: () => void, onError?: () => void) => {
            const body = { userId: userId, url: deckUrl, source: "moxfield" };

            if (accessToken !== undefined && userId !== undefined) {
                axios
                    .post<string>(endpoint, body, {
                        headers: { "access-token": accessToken, "Content-Type": "application/json" }
                    })
                    .then((_res) => {
                        // kick off a rehydrate of our profiles
                        hydrateProfiles();

                        // call the onSuccess handler
                        if (onSuccess) {
                            onSuccess();
                        }
                    });
            }
        },
        [accessToken, hydrateProfiles, userId]
    );
};

const useRemoveDeckFromProfile = () => {
    const hydrateProfiles = useHydrateProfiles();

    const accessToken = useSelector(AuthSelectors.getAccessToken);
    const userId = useSelector(UserSelectors.getId);

    const endpoint = "https://chatterfang.onrender.com/removeDeck";

    return useCallback(
        (deckId: string) => {
            const body = { userId: userId, deckId: deckId };

            if (accessToken !== undefined && userId !== undefined) {
                axios
                    .post<string>(endpoint, body, {
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
    useGetPlayerName,
    useAddDeckToProfile,
    useRemoveDeckFromProfile
};
