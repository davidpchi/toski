import { createReducer } from "@reduxjs/toolkit";
import { AuthAction } from "./authActions";

export type AuthState = Readonly<{
    /**
     * This keeps track if we should be showing the "welcome" modal for when a user first logs in
     */
    isFirstLogin: boolean;

    // token_type
    tokenType: string | undefined;
    // access_token
    accessToken: string | undefined;
    // expires_in
    // scope
    // state
}>;

const initialState: AuthState = {
    tokenType: undefined,
    accessToken: undefined,
    isFirstLogin: false
};

export const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(AuthAction.GetAuthComplete, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.tokenType = action.payload.tokenType;
            state.isFirstLogin = true;
        })
        .addCase(AuthAction.LoadAuthComplete, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.tokenType = action.payload.tokenType;
        })
        .addCase(AuthAction.LogOut, (state, _action) => {
            state.accessToken = undefined;
            state.tokenType = undefined;
            state.isFirstLogin = false;
        })
        .addCase(AuthAction.FirstLoginComplete, (state, _action) => {
            state.isFirstLogin = false;
        });
});
