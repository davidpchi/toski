import { createReducer } from "@reduxjs/toolkit";

import { ProfilesAction } from "./profilesActions";
import { Profile } from "../../types/domain/Profile";
import { MoxfieldProfile } from "../../types/domain/MoxfieldProfile";

/**
 * State containing all game history data
 */
export type ProfilesState = Readonly<{
    /**
     * A map of all profiles where the ID is the discord id.
     */
    profiles: { [id: string]: Profile } | undefined;
    /**
     * A map of Moxfield profiles where the ID is the Moxfield username.
     */
    moxfieldProfiles: { [id: string]: MoxfieldProfile } | undefined;
}>;

const initialState: ProfilesState = {
    profiles: undefined,
    moxfieldProfiles: undefined
};

export const profilesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ProfilesAction.GetProfilesComplete, (state, action) => {
            const result: { [id: string]: Profile } = {};
            for (const item of action.payload) {
                result[item.id] = item;
            }
            state.profiles = result;
        })
        .addCase(ProfilesAction.HydrateMoxfieldProfileComplete, (state, action) => {
            if (state.moxfieldProfiles === undefined) {
                const result: { [id: string]: MoxfieldProfile } = {};
                result[action.payload.userName] = action.payload;
                state.moxfieldProfiles = result;
            } else {
                state.moxfieldProfiles[action.payload.userName] = action.payload;
            }
        });
});
