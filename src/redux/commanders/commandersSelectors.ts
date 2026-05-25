import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";
import { CommanderData } from "../../services/CommanderService";

const getCommanders = (state: AppState) => state.commanders.commanders;
const getIsLoading = (state: AppState) => state.commanders.isLoading;

/**
 * Gets a specific commander by name.
 */
const getCommanderByName = createSelector(
    getCommanders,
    (_state: AppState, commanderName: string) => commanderName,
    (commanders: { [name: string]: CommanderData } | undefined, commanderName: string) => {
        return commanders ? commanders[commanderName] : undefined;
    }
);

/**
 * Gets all commanders as an array.
 */
const getAllCommanders = createSelector(getCommanders, (commanders: { [name: string]: CommanderData } | undefined) => {
    return commanders ? Object.values(commanders) : [];
});

/**
 * Gets all commander names.
 */
const getAllCommanderNames = createSelector(
    getCommanders,
    (commanders: { [name: string]: CommanderData } | undefined) => {
        return commanders ? Object.keys(commanders) : [];
    }
);

/**
 * Gets the loading state of commanders.
 */
const getCommandersLoading = createSelector(getIsLoading, (isLoading: boolean) => isLoading);

export const CommandersSelectors = {
    getCommanderByName,
    getAllCommanders,
    getAllCommanderNames,
    getCommandersLoading
};
