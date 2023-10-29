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
    expirationDate: Date | undefined;
    // scope
    // state
}>;

const initialState: AuthState = {
    tokenType: undefined,
    accessToken: undefined,
    isFirstLogin: false,
    expirationDate: undefined
};

export const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(AuthAction.GetAuthComplete, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.tokenType = action.payload.tokenType;

            // compute the expiration date
            const expirationDate = new Date(new Date().getTime() + action.payload.expirationTimeInSeconds * 1000);
            state.expirationDate = expirationDate;

            state.isFirstLogin = true;
        })
        .addCase(AuthAction.LoadAuthComplete, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.tokenType = action.payload.tokenType;
            state.expirationDate = action.payload.expirationDate;
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
