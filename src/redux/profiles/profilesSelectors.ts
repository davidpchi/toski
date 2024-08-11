import { createSelector } from "@reduxjs/toolkit";

import { AppState } from "../rootReducer";
import { Profile } from "../../types/domain/Profile";
import { ExternalProfile } from "../../types/domain/ExternalProfile";
import { MoxfieldDeck } from "../../types/domain/MoxfieldDeck";

const getProfiles = (state: AppState) => state.profiles.profiles;

const getMoxfieldProfiles = (state: AppState) => state.profiles.moxfieldProfiles;

const getArchidektProfiles = (state: AppState) => state.profiles.archidektProfiles;

const getMoxfieldDecks = (state: AppState) => state.profiles.moxfieldDecks;

const getArchidektDecks = (state: AppState) => state.profiles.archidektDecks;

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
    (moxfieldProfiles: { [id: string]: ExternalProfile } | undefined, id: string) => {
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

const getArchidektProfile = createSelector(
    getArchidektProfiles,
    (_state: AppState, id: string) => id,
    (archidektProfiles: { [id: string]: ExternalProfile } | undefined, id: string) => {
        return archidektProfiles ? archidektProfiles[id] : undefined;
    }
);

export const ProfileSelectors = {
    getProfiles,
    getMoxfieldProfiles,
    getMoxfieldDecks,
    getArchidektDecks,
    getArchidektProfile,
    getProfile,
    getMoxfieldProfile,
    getMoxfieldDeck
};
