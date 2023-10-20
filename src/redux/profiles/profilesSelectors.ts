import { createSelector } from "@reduxjs/toolkit";

import { AppState } from "../rootReducer";
import { Profile } from "../../types/domain/Profile";

const getProfiles = (state: AppState) => state.profiles.profiles;

/**
 * Gets a specific profile based on discord id.
 */
export const getProfile = createSelector(
    getProfiles,
    (_state: AppState, id: string) => id,
    (profiles: { [id: string]: Profile } | undefined, id: string) => {
        // there is this weird javascript issue where a string property key on an object that is
        // is a number gets simplified to a number, hence we have to cast the string we pass in to a number
        // so the lookup succeeds.
        return profiles ? profiles[id] : undefined;
    }
);

export const ProfileSelectors = {
    getProfiles,
    getProfile
};
