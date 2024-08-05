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

const useUpdateProfileLink = () => {
    const hydrateProfiles = useHydrateProfiles();

    const accessToken = useSelector(AuthSelectors.getAccessToken);

    const endpoint = "https://chatterfang.onrender.com/linkprofile";

    return useCallback(
        (userId: string, toskiId: string) => {
            const updatedProfile = {
                userId: userId,
                toskiId: toskiId
            };

            if (accessToken !== undefined && userId !== undefined) {
                axios
                    .post<string>(endpoint, updatedProfile, {
                        headers: { "access-token": accessToken, "Content-Type": "application/json" }
                    })
                    .then((_res) => {
                        // kick off a rehydrate of our profiles
                        hydrateProfiles();
                    });
            }
        },
        [accessToken, hydrateProfiles]
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

export const ProfileService = {
    useHydrateProfiles,
    useUpdateProfile,
    useAddDeckToProfile,
    useRemoveDeckFromProfile,
    useUpdateProfileLink
};
