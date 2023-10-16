import { createReducer } from "@reduxjs/toolkit";
import { UserAction } from "./userActions";
import { AuthAction } from "../auth/authActions";

export type UserState = Readonly<{
    username: string | undefined;
    id: string | undefined;
    avatar: string | undefined;
}>;

const initialState: UserState = {
    username: undefined,
    id: undefined,
    avatar: undefined
};

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(UserAction.SetUserComplete, (state, action) => {
        state.avatar = action.payload.avatar;
        state.username = action.payload.username;
        state.id = action.payload.id;
    });
    builder.addCase(AuthAction.LogOut, (state, _action) => {
        state.avatar = undefined;
        state.username = undefined;
        state.id = undefined;
    });
});
