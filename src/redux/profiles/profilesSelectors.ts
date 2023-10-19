import { AppState } from "../rootReducer";

const getProfiles = (state: AppState) => state.profiles.profiles;

export const ProfileSelectors = {
    getProfiles
};
