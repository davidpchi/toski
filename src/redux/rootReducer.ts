import { combineReducers, Reducer } from "redux";
import { statsReducer, StatsState } from "./stats/statsReducer";
import { authReducer, AuthState } from "./auth/authReducer";
import { userReducer, UserState } from "./user/userReducer";
import { profilesReducer, ProfilesState } from "./profiles/profilesReducer";

export interface AppState {
    stats: StatsState;
    auth: AuthState;
    user: UserState;
    profiles: ProfilesState;
}

export const rootReducer: Reducer<AppState> = combineReducers({
    stats: statsReducer,
    auth: authReducer,
    user: userReducer,
    profiles: profilesReducer
});
