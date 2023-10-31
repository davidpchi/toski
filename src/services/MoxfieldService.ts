import axios from "axios";
import { useCallback } from "react";
import { MoxfieldProfile } from "../types/domain/MoxfieldProfile";
import { MoxfieldResponseData } from "../types/service/MoxfieldService/MoxfieldResponse";

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

export const MoxfieldService = {
    useGetMoxfieldProfile
};
