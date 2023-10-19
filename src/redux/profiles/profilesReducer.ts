import { createReducer } from "@reduxjs/toolkit";

import { ProfilesAction } from "./profilesActions";
import { Profile } from "../../types/domain/Profile";

/**
 * State containing all game history data
 */
export type ProfilesState = Readonly<{
    /**
     * A map of all profiles where the ID is the discord id.
     */
    profiles: { [id: string]: Profile } | undefined;
}>;

const initialState: ProfilesState = {
    profiles: undefined
};

export const profilesReducer = createReducer(initialState, (builder) => {
    builder.addCase(ProfilesAction.GetProfilesComplete, (state, action) => {
        const result: { [id: string]: Profile } = {};
        for (const item of action.payload) {
            result[item.id] = item;
        }
        state.profiles = result;
    });
});
