import { createAction } from "@reduxjs/toolkit";
import { CommanderData } from "../../services/CommanderService";

export enum CommandersActionType {
    HydrateCommandersComplete = "CommandersActions/HydrateCommandersComplete",
    SetLoadingCommanders = "CommandersActions/SetLoadingCommanders"
}

export const CommandersAction = {
    HydrateCommandersComplete: createAction(
        CommandersActionType.HydrateCommandersComplete,
        (data: CommanderData[]) => ({
            type: CommandersActionType.HydrateCommandersComplete,
            payload: data
        })
    ),

    SetLoadingCommanders: createAction<boolean>(CommandersActionType.SetLoadingCommanders)
};
