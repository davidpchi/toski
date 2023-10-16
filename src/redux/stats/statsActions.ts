import { createAction } from "@reduxjs/toolkit";
import { Match } from "../../types/domain/Match";

export enum StatsActionType {
    HydrateMatchHistoryComplete = "StatsActions/HydrateMatchHistoryComplete"
}

export const StatsAction = {
    HydrateMatchHistoryComplete: createAction(StatsActionType.HydrateMatchHistoryComplete, (data: Match[]) => ({
        type: StatsActionType.HydrateMatchHistoryComplete,
        payload: data
    }))
};
