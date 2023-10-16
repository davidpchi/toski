import { createAction } from "@reduxjs/toolkit";

export enum UserActionType {
    SetUserComplete = "UserActions/SetUserComplete"
}

export const UserAction = {
    SetUserComplete: createAction(
        UserActionType.SetUserComplete,
        (data: { username: string; id: string; avatar: string }) => ({
            type: UserActionType.SetUserComplete,
            payload: data
        })
    )
};
