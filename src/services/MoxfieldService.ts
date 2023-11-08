import axios from "axios";
import { useCallback } from "react";
import { MoxfieldProfile } from "../types/domain/MoxfieldProfile";
import { MoxfieldResponseData } from "../types/service/MoxfieldService/MoxfieldResponse";
import { useDispatch } from "react-redux";
import { ProfilesAction } from "../redux/profiles/profilesActions";

const useGetMoxfieldProfile = () => {
    const endpoint = "https://chatterfang.onrender.com/moxfield/";

    return useCallback(async (moxfieldId: string): Promise<MoxfieldProfile | undefined> => {
        try {
            const _res = await axios.get<MoxfieldResponseData>(endpoint + moxfieldId, {
                headers: { "Content-Type": "application/json" }
            });
            const serviceObj: MoxfieldResponseData = _res.data;
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
    const endpoint = "https://chatterfang.onrender.com/moxfield/";

    return useCallback(
        async (moxfieldId: string) => {
            try {
                const _res = await axios.get<MoxfieldResponseData>(endpoint + moxfieldId, {
                    headers: { "Content-Type": "application/json" }
                });
                const serviceObj: MoxfieldResponseData = _res.data;
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

export const MoxfieldService = {
    useGetMoxfieldProfile,
    useHydrateMoxfieldProfile
};
