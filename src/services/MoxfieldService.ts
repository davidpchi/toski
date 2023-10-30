import axios from "axios";
import { useCallback } from "react";

const useGetMoxfieldProfile = () => {
    const endpoint = "https://chatterfang.onrender.com/moxfield/";

    return useCallback(async (moxfieldId: string) => {
        try {
            const _res = await axios.get<MoxfieldResponse>(endpoint + moxfieldId, {
                headers: { "Content-Type": "application/json" }
            });
            return _res.data;
        } catch (err) {
            console.log(err);
        }
        return undefined;
    }, []);
};

export const MoxfieldService = {
    useGetMoxfieldProfile
};

export type MoxfieldResponse = {
    data: {
        userName: string;
        profileImageType: string;
        profileImageUrl: string;
        followerCount: number;
        followingCount: number;
        deckCount: number;
        userSinceUtc: string;
        badges: any[];
    };
    [key: string]: any; // This allows any other properties
};

export type MoxfieldResponseData = {
    userName: string;
    profileImageType: string;
    profileImageUrl: string;
    followerCount: number;
    followingCount: number;
    deckCount: number;
    userSinceUtc: string;
    badges: any[];
};
