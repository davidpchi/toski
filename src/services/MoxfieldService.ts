import axios from "axios";
import { useCallback } from "react";

const useGetMoxfieldProfile = () => {
    const endpoint = "https://chatterfang.onrender.com/moxfield/";

    return useCallback((moxfieldId: string) => {
        try {
            axios
                .get<string>(endpoint + moxfieldId, {
                    headers: { "Content-Type": "application/json" }
                })
                .then((_res) => {
                    console.log(_res);
                    return _res;
                });
        } catch (err) {
            console.log(err);
        }
    }, []);
};

export const MoxfieldService = {
    useGetMoxfieldProfile
};
