import { createAction } from "@reduxjs/toolkit";
import { Profile } from "../../types/domain/Profile";
import { MoxfieldDeck } from "../../types/domain/MoxfieldDeck";
import { MoxfieldProfile } from "../../types/domain/MoxfieldProfile";

export enum ProfilesActionType {
    GetProfilesComplete = "ProfileActions/GetProfilesComplete",
    HydrateMoxfieldProfileComplete = "ProfileActions/HydrateMoxfieldProfileComplete",
    HydrateMoxfieldDeckComplete = "ProfileActions/HydrateMoxfieldDeckComplete"
}

export const ProfilesAction = {
    GetProfilesComplete: createAction(ProfilesActionType.GetProfilesComplete, (data: Profile[]) => ({
        type: ProfilesActionType.GetProfilesComplete,
        payload: data
    })),
    HydrateMoxfieldProfileComplete: createAction(
        ProfilesActionType.HydrateMoxfieldProfileComplete,
        (data: MoxfieldProfile) => ({
            type: ProfilesActionType.HydrateMoxfieldProfileComplete,
            payload: data
        })
    ),
    HydrateMoxfieldDeckComplete: createAction(ProfilesActionType.HydrateMoxfieldDeckComplete, (data: MoxfieldDeck) => ({
        type: ProfilesActionType.HydrateMoxfieldDeckComplete,
        payload: data
    }))
};
