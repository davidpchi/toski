import { AppState } from "../rootReducer";

const getTokenType = (state: AppState) => state.auth.tokenType;
const getAccessToken = (state: AppState) => state.auth.accessToken;
const getIsFirstLogin = (state: AppState) => state.auth.isFirstLogin;

export const AuthSelectors = {
    getTokenType,
    getAccessToken,
    getIsFirstLogin
};
