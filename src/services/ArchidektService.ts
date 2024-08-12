import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { ProfilesAction } from "../redux/profiles/profilesActions";
import { MoxfieldProfileResponseData } from "../types/service/MoxfieldService/MoxfieldProfileResponse";
import { ArchidektDeckResponse } from "../types/service/ArchidektService/ArchidektDeckResponse";
import { ArchidektDeck } from "../types/domain/ArchidektDeck";
import { ExternalProfile } from "../types/domain/ExternalProfile";
import { ArchidektProfileResponse } from "../types/service/ArchidektService/ArchidektProfileResponse";

const useGetArchidektProfile = () => {
    const endpoint = "https://chatterfang.onrender.com/archidekt/profile/";

    return useCallback(async (archidektId: string): Promise<ExternalProfile | undefined> => {
        try {
            const _res = await axios.get<ArchidektProfileResponse>(endpoint + archidektId, {
                headers: { "Content-Type": "application/json" }
            });
            const serviceObj: ArchidektProfileResponse = _res.data;
            let newArchidektProfile: ExternalProfile = {
                id: serviceObj.id,
                userName: serviceObj.username,
                imageUrl: serviceObj.avatar ? serviceObj.avatar : undefined
            };
            return newArchidektProfile;
        } catch (err) {
            console.log(err);
        }
        return undefined;
    }, []);
};

const useHydrateArchidektProfile = () => {
    const dispatch = useDispatch();
    const endpoint = "https://chatterfang.onrender.com/archidekt/profile/";

    return useCallback(
        async (moxfieldId: string) => {
            try {
                const _res = await axios.get<ArchidektProfileResponse>(endpoint + moxfieldId, {
                    headers: { "Content-Type": "application/json" }
                });
                const serviceObj: ArchidektProfileResponse = _res.data;
                let newMoxfieldProfile: ExternalProfile = {
                    id: serviceObj.id,
                    userName: serviceObj.username,
                    imageUrl: serviceObj.avatar ? serviceObj.avatar : undefined
                };

                dispatch(ProfilesAction.HydrateArchidektProfileComplete(newMoxfieldProfile));
            } catch (err) {
                console.error("Error in Hydrate Archidekt Profile" + err);
            }
        },
        [dispatch]
    );
};

const useHydrateArchidektDeck = () => {
    const dispatch = useDispatch();

    const endpoint = "https://chatterfang.onrender.com/archidekt/deck/";

    return useCallback(
        async (archidektId: string) => {
            try {
                const _res = await axios.get<ArchidektDeckResponse>(endpoint + archidektId, {
                    headers: { "Content-Type": "application/json" }
                });
                const serviceObj: ArchidektDeckResponse = _res.data;

                // the only acceptable format is commander. Format 3 is commander.
                if (serviceObj.deckFormat === 3) {
                    const newArchidektDeck: ArchidektDeck = {
                        id: serviceObj.id,
                        name: serviceObj.name,
                        url: "https://www.archidekt.com/decks/" + serviceObj.id,
                        commanderImageUri: serviceObj.featured
                    };
                    dispatch(ProfilesAction.HydrateArchidektDeckComplete(newArchidektDeck));
                }
            } catch (err) {
                console.error("Error in Hydrate Moxfield Deck" + err);
            }
        },
        [dispatch]
    );
};

export const ArchidektService = {
    useHydrateArchidektDeck,
    useHydrateArchidektProfile,
    useGetArchidektProfile
};
