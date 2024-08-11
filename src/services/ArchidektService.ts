import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { ProfilesAction } from "../redux/profiles/profilesActions";
import { MoxfieldDeck } from "../types/domain/MoxfieldDeck";
import { MoxfieldProfile } from "../types/domain/MoxfieldProfile";
import { MoxfieldDeckResponseData } from "../types/service/MoxfieldService/MoxfieldDeckResponse";
import { MoxfieldProfileResponseData } from "../types/service/MoxfieldService/MoxfieldProfileResponse";
import { ArchidektDeckResponse } from "../types/service/ArchidektService/ArchidektDeckResponse";
import { ArchidektDeck } from "../types/domain/ArchidektDeck";

// const useHydrateArchidektProfile = () => {
//     const dispatch = useDispatch();
//     const endpoint = "https://chatterfang.onrender.com/archidekt/profile/";

//     return useCallback(
//         async (moxfieldId: string) => {
//             try {
//                 const _res = await axios.get<MoxfieldProfileResponseData>(endpoint + moxfieldId, {
//                     headers: { "Content-Type": "application/json" }
//                 });
//                 const serviceObj: MoxfieldProfileResponseData = _res.data;
//                 let newMoxfieldProfile: MoxfieldProfile = {
//                     userName: serviceObj.userName,
//                     imageUrl: serviceObj.profileImageUrl ? serviceObj.profileImageUrl : undefined
//                 };
//                 dispatch(ProfilesAction.HydrateMoxfieldProfileComplete(newMoxfieldProfile));
//             } catch (err) {
//                 console.error("Error in Hydrate Moxfield Profile" + err);
//             }
//         },
//         [dispatch]
//     );
// };

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
    useHydrateArchidektDeck
};
