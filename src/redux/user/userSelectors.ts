import { AppState } from "../rootReducer";

export const getUsername = (state: AppState) => state.user.username;
export const getId = (state: AppState) => state.user.id;
export const getAvatar = (state: AppState) => state.user.avatar;

export const UserSelectors = {
    getUsername,
    getId,
    getAvatar
};
