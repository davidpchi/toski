import { createAction } from "@reduxjs/toolkit";
import { Profile } from "../../types/domain/Profile";
import { MoxfieldProfile } from "../../types/domain/MoxfieldProfile";

export enum ProfilesActionType {
    GetProfilesComplete = "ProfileActions/GetProfilesComplete",
    HydrateMoxfieldProfileComplete = "ProfileActions/HydrateMoxfieldProfileComplete"
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
    )
};
