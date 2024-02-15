import { createSelector } from "@reduxjs/toolkit";

import { AppState } from "../rootReducer";
import { Profile } from "../../types/domain/Profile";
import { MoxfieldProfile } from "../../types/domain/MoxfieldProfile";
import { MoxfieldDeck } from "../../types/domain/MoxfieldDeck";

const getProfiles = (state: AppState) => state.profiles.profiles;

const getMoxfieldProfiles = (state: AppState) => state.profiles.moxfieldProfiles;

const getMoxfieldDecks = (state: AppState) => state.profiles.moxfieldDecks;

/**
 * Gets a specific profile based on discord id.
 */
const getProfile = createSelector(
    getProfiles,
    (_state: AppState, id: string) => id,
    (profiles: { [id: string]: Profile } | undefined, id: string) => {
        // there is this weird javascript issue where a string property key on an object that is
        // is a number gets simplified to a number, hence we have to cast the string we pass in to a number
        // so the lookup succeeds.
        return profiles ? profiles[id] : undefined;
    }
);

const getMoxfieldProfile = createSelector(
    getMoxfieldProfiles,
    (_state: AppState, id: string) => id,
    (moxfieldProfiles: { [id: string]: MoxfieldProfile } | undefined, id: string) => {
        return moxfieldProfiles ? moxfieldProfiles[id] : undefined;
    }
);

const getMoxfieldDeck = createSelector(
    getMoxfieldDecks,
    (_state: AppState, id: string) => id,
    (moxfieldDecks: { [id: string]: MoxfieldDeck } | undefined, id: string) => {
        return moxfieldDecks ? moxfieldDecks[id] : undefined;
    }
);

export const ProfileSelectors = {
    getProfiles,
    getMoxfieldProfiles,
    getMoxfieldDecks,
    getProfile,
    getMoxfieldProfile,
    getMoxfieldDeck
};
