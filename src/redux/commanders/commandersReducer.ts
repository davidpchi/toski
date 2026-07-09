import { createReducer } from "@reduxjs/toolkit";
import { CommandersAction } from "./commandersActions";
import { CommanderData } from "../../services/CommanderService";

/**
 * State containing all commander data
 */
export type CommandersState = Readonly<{
    /**
     * A map of all commanders where the key is the commander name (friendly name).
     */
    commanders: { [name: string]: CommanderData } | undefined;

    /**
     * Loading state for commanders data
     */
    isLoading: boolean;
}>;

const initialState: CommandersState = {
    commanders: undefined,
    isLoading: true
};

export const commandersReducer = createReducer(initialState, (builder) => {
    builder.addCase(CommandersAction.HydrateCommandersComplete, (state, action) => {
        const commandersArray = action.payload;
        const commandersMap: { [name: string]: CommanderData } = {};

        commandersArray.forEach((commander) => {
            commandersMap[commander.name] = commander;
        });

        state.commanders = commandersMap;
        state.isLoading = false;
    });

    builder.addCase(CommandersAction.SetLoadingCommanders, (state, action) => {
        state.isLoading = action.payload;
    });
});
