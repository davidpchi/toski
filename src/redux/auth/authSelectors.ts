import { AppState } from "../rootReducer";

export const getTokenType = (state: AppState) => state.auth.tokenType;
export const getAccessToken = (state: AppState) => state.auth.accessToken;
export const getIsFirstLogin = (state: AppState) => state.auth.isFirstLogin;
