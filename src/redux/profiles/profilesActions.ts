import { createAction } from "@reduxjs/toolkit";
import { Profile } from "../../types/domain/Profile";

export enum ProfilesActionType {
    GetProfilesComplete = "ProfileActions/GetProfilesComplete"
}

export const ProfilesAction = {
    GetProfilesComplete: createAction(ProfilesActionType.GetProfilesComplete, (data: Profile[]) => ({
        type: ProfilesActionType.GetProfilesComplete,
        payload: data
    }))
};
