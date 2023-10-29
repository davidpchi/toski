import { createAction } from "@reduxjs/toolkit";

export enum AuthActionType {
    GetAuthComplete = "AuthActions/GetAuthComplete",

    LoadAuthComplete = "AuthActions/LoadAuthComplete",

    LogOut = "AuthActions/LogOut",

    FirstLoginComplete = "AuthActions/FirstLoginComplete"
}

export const AuthAction = {
    GetAuthComplete: createAction(
        AuthActionType.GetAuthComplete,
        (data: { tokenType: string; accessToken: string; expirationTimeInSeconds: number }) => ({
            type: AuthActionType.GetAuthComplete,
            payload: data
        })
    ),
    LoadAuthComplete: createAction(
        AuthActionType.LoadAuthComplete,
        (data: { tokenType: string; accessToken: string; expirationDate: Date }) => ({
            type: AuthActionType.LoadAuthComplete,
            payload: data
        })
    ),
    LogOut: createAction(AuthActionType.LogOut, () => ({
        type: AuthActionType.LogOut,
        payload: {}
    })),
    FirstLoginComplete: createAction(AuthActionType.FirstLoginComplete, () => ({
        type: AuthActionType.FirstLoginComplete,
        payload: {}
    }))
};
