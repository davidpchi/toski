import { createAction } from "@reduxjs/toolkit";
import { Match } from "../../types/domain/Match";

export enum StatsActionType {
    HydrateMatchHistoryComplete = "StatsActions/HydrateMatchHistoryComplete",
    UpdateStartDate = "StatsActions/UpdateStartDate"
}

export const StatsAction = {
    HydrateMatchHistoryComplete: createAction(StatsActionType.HydrateMatchHistoryComplete, (data: Match[]) => ({
        type: StatsActionType.HydrateMatchHistoryComplete,
        payload: data
    })),

    UpdateStartDate: createAction<string | undefined>(StatsActionType.UpdateStartDate)
};
