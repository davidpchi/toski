import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { CommandersAction } from "../redux/commanders/commandersActions";

export type CommanderApiResponse = {
    _id: string;
    scryfallId: string;
    friendlyName: string;
    image: string;
    colorIdentity: string[];
    scryfallUri: string;
    lastUpdated: string;
    __v: number;
};

export type CommanderData = {
    id: string;
    scryfallId: string;
    name: string;
    image: string;
    colorIdentity: string[];
    scryfallUri: string;
};

const commandersDataEndpoint = "https://chatterfang.onrender.com/commanders";

const mapApiResponseToCommanderData = (apiResponse: CommanderApiResponse): CommanderData => {
    return {
        id: apiResponse.scryfallId,
        scryfallId: apiResponse.scryfallId,
        name: apiResponse.friendlyName,
        image: apiResponse.image,
        colorIdentity: apiResponse.colorIdentity,
        scryfallUri: apiResponse.scryfallUri
    };
};

const useGetCommanders = () => {
    return useCallback(async (): Promise<CommanderData[] | undefined> => {
        try {
            const res = await axios.get<CommanderApiResponse[]>(commandersDataEndpoint, {
                headers: { "Content-Type": "application/json" }
            });
            return res.data.map(mapApiResponseToCommanderData);
        } catch (err) {
            console.error("Failed to fetch commanders:", err);
            return undefined;
        }
    }, []);
};

const useHydrateCommanders = () => {
    const dispatch = useDispatch();
    const getCommanders = useGetCommanders();

    return useCallback(async () => {
        try {
            dispatch(CommandersAction.SetLoadingCommanders(true));
            const commanders = await getCommanders();

            if (commanders !== undefined) {
                dispatch(CommandersAction.HydrateCommandersComplete(commanders));
            } else {
                console.error("Failed to hydrate commanders: API returned undefined");
                dispatch(CommandersAction.SetLoadingCommanders(false));
            }
        } catch (err) {
            console.error("Error hydrating commanders:", err);
            dispatch(CommandersAction.SetLoadingCommanders(false));
        }
    }, [dispatch, getCommanders]);
};

export const CommanderService = {
    useGetCommanders,
    useHydrateCommanders
};
