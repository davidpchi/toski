import { createAction } from "@reduxjs/toolkit";
import { Profile } from "../../types/domain/Profile";
import { MoxfieldDeck } from "../../types/domain/MoxfieldDeck";
import { ExternalProfile } from "../../types/domain/ExternalProfile";
import { ArchidektDeck } from "../../types/domain/ArchidektDeck";

export enum ProfilesActionType {
    GetProfilesComplete = "ProfileActions/GetProfilesComplete",
    HydrateMoxfieldProfileComplete = "ProfileActions/HydrateMoxfieldProfileComplete",
    HydrateMoxfieldDeckComplete = "ProfileActions/HydrateMoxfieldDeckComplete",
    HydrateArchidektProfileComplete = "ProfileActions/HydrateArchidektProfileComplete",
    HydrateArchidektDeckComplete = "ProfileActions/HydrateArchidektDeckComplete"
}

export const ProfilesAction = {
    GetProfilesComplete: createAction(ProfilesActionType.GetProfilesComplete, (data: Profile[]) => ({
        type: ProfilesActionType.GetProfilesComplete,
        payload: data
    })),
    HydrateMoxfieldProfileComplete: createAction(
        ProfilesActionType.HydrateMoxfieldProfileComplete,
        (data: ExternalProfile) => ({
            type: ProfilesActionType.HydrateMoxfieldProfileComplete,
            payload: data
        })
    ),
    HydrateMoxfieldDeckComplete: createAction(ProfilesActionType.HydrateMoxfieldDeckComplete, (data: MoxfieldDeck) => ({
        type: ProfilesActionType.HydrateMoxfieldDeckComplete,
        payload: data
    })),
    HydrateArchidektProfileComplete: createAction(
        ProfilesActionType.HydrateArchidektProfileComplete,
        (data: ExternalProfile) => ({
            type: ProfilesActionType.HydrateArchidektProfileComplete,
            payload: data
        })
    ),
    HydrateArchidektDeckComplete: createAction(
        ProfilesActionType.HydrateArchidektDeckComplete,
        (data: ArchidektDeck) => ({
            type: ProfilesActionType.HydrateMoxfieldDeckComplete,
            payload: data
        })
    )
};
