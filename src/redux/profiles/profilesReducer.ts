import { createReducer } from "@reduxjs/toolkit";

import { ProfilesAction } from "./profilesActions";
import { Profile } from "../../types/domain/Profile";
import { ExternalProfile } from "../../types/domain/ExternalProfile";
import { MoxfieldDeck } from "../../types/domain/MoxfieldDeck";
import { ArchidektDeck } from "../../types/domain/ArchidektDeck";

/**
 * State containing all game history data
 */
export type ProfilesState = Readonly<{
    /**
     * A map of all profiles where the key is the discord id and the value is the chatterfang profile.
     */
    profiles: { [id: string]: Profile } | undefined;
    /**
     * A map of Moxfield profiles where the ID is the Moxfield username.
     */
    moxfieldProfiles: { [id: string]: ExternalProfile } | undefined;
    /**
     * A map of Archidekt profiles where the ID is the Archidekt username.
     */
    archidektProfiles: { [id: string]: ExternalProfile } | undefined;
    /**
     * A map of Moxfield decks where the ID is the Moxfield deck id
     */
    moxfieldDecks: { [id: string]: MoxfieldDeck } | undefined;
    /**
     * A map of Archidekt decks where the ID is the Archidekt deck id
     */
    archidektDecks: { [id: string]: ArchidektDeck } | undefined;
    /**
     * A map of all linked toski accounts where the key is the all lower-case toski id and the value is the discord id
     */
    toskiToDiscordMap: { [id: string]: string } | undefined;
}>;

const initialState: ProfilesState = {
    profiles: undefined,
    moxfieldProfiles: undefined,
    archidektProfiles: undefined,
    moxfieldDecks: undefined,
    archidektDecks: undefined,
    toskiToDiscordMap: undefined
};

export const profilesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ProfilesAction.GetProfilesComplete, (state, action) => {
            const profilesMap: { [id: string]: Profile } = {};
            const toskiToDiscordMap: { [id: string]: string } = {};
            for (const item of action.payload) {
                profilesMap[item.id] = item;
                if (item.toskiId) {
                    toskiToDiscordMap[item.toskiId.toLowerCase()] = item.id;
                }
            }
            state.profiles = profilesMap;
            state.toskiToDiscordMap = toskiToDiscordMap;
        })
        .addCase(ProfilesAction.HydrateMoxfieldProfileComplete, (state, action) => {
            if (state.moxfieldProfiles === undefined) {
                const result: { [id: string]: ExternalProfile } = {};
                result[action.payload.userName] = action.payload;
                state.moxfieldProfiles = result;
            } else {
                state.moxfieldProfiles[action.payload.userName] = action.payload;
            }
        })
        .addCase(ProfilesAction.HydrateMoxfieldDeckComplete, (state, action) => {
            if (state.moxfieldDecks === undefined) {
                const result: { [id: string]: MoxfieldDeck } = {};
                result[action.payload.id] = action.payload;
                state.moxfieldDecks = result;
            } else {
                state.moxfieldDecks[action.payload.id] = action.payload;
            }
        })
        .addCase(ProfilesAction.HydrateArchidektProfileComplete, (state, action) => {
            if (state.archidektProfiles === undefined) {
                const result: { [id: string]: ExternalProfile } = {};
                result[action.payload.userName] = action.payload;
                state.archidektProfiles = result;
            } else {
                state.archidektProfiles[action.payload.userName] = action.payload;
            }
        })
        .addCase(ProfilesAction.HydrateArchidektDeckComplete, (state, action) => {
            if (state.archidektDecks === undefined) {
                const result: { [id: string]: ArchidektDeck } = {};
                result[action.payload.id] = action.payload;
                state.archidektDecks = result;
            } else {
                state.archidektDecks[action.payload.id] = action.payload;
            }
        });
});
