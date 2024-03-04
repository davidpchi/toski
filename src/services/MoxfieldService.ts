import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { ProfilesAction } from "../redux/profiles/profilesActions";
import { MoxfieldDeck } from "../types/domain/MoxfieldDeck";
import { MoxfieldProfile } from "../types/domain/MoxfieldProfile";
import { MoxfieldDeckResponseData } from "../types/service/MoxfieldService/MoxfieldDeckResponse";
import { MoxfieldProfileResponseData } from "../types/service/MoxfieldService/MoxfieldProfileResponse";

const useGetMoxfieldProfile = () => {
    const endpoint = "https://chatterfang.onrender.com/moxfield/profile/";

    return useCallback(async (moxfieldId: string): Promise<MoxfieldProfile | undefined> => {
        try {
            const _res = await axios.get<MoxfieldProfileResponseData>(endpoint + moxfieldId, {
                headers: { "Content-Type": "application/json" }
            });
            const serviceObj: MoxfieldProfileResponseData = _res.data;
            let newMoxfieldProfile: MoxfieldProfile = {
                userName: serviceObj.userName,
                imageUrl: serviceObj.profileImageUrl ? serviceObj.profileImageUrl : undefined
            };
            return newMoxfieldProfile;
        } catch (err) {
            console.log(err);
        }
        return undefined;
    }, []);
};

const useHydrateMoxfieldProfile = () => {
    const dispatch = useDispatch();
    const endpoint = "https://chatterfang.onrender.com/moxfield/profile/";

    return useCallback(
        async (moxfieldId: string) => {
            try {
                const _res = await axios.get<MoxfieldProfileResponseData>(endpoint + moxfieldId, {
                    headers: { "Content-Type": "application/json" }
                });
                const serviceObj: MoxfieldProfileResponseData = _res.data;
                let newMoxfieldProfile: MoxfieldProfile = {
                    userName: serviceObj.userName,
                    imageUrl: serviceObj.profileImageUrl ? serviceObj.profileImageUrl : undefined
                };
                dispatch(ProfilesAction.HydrateMoxfieldProfileComplete(newMoxfieldProfile));
            } catch (err) {
                console.error("Error in Hydrate Moxfield Profile" + err);
            }
        },
        [dispatch]
    );
};

const useHydrateMoxfieldDeck = () => {
    const dispatch = useDispatch();

    const endpoint = "https://chatterfang.onrender.com/moxfield/deck/";

    return useCallback(
        async (moxfieldId: string) => {
            try {
                const _res = await axios.get<MoxfieldDeckResponseData>(endpoint + moxfieldId, {
                    headers: { "Content-Type": "application/json" }
                });
                const serviceObj: MoxfieldDeckResponseData = _res.data;

                // the only acceptable format is commander
                if (serviceObj.format === "commander") {
                    let newMoxfieldDeck: MoxfieldDeck = {
                        commanderName: serviceObj.main.name,
                        id: serviceObj.publicId,
                        name: serviceObj.name,
                        url: serviceObj.publicUrl
                    };
                    dispatch(ProfilesAction.HydrateMoxfieldDeckComplete(newMoxfieldDeck));
                }
            } catch (err) {
                console.error("Error in Hydrate Moxfield Deck" + err);
            }
        },
        [dispatch]
    );
};

export const MoxfieldService = {
    useGetMoxfieldProfile,
    useHydrateMoxfieldProfile,
    useHydrateMoxfieldDeck
};
