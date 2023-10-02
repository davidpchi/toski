import { combineReducers, Reducer } from "redux";
import { statsReducer, StatsState } from "./statsReducer";

export interface AppState {
    stats: StatsState;
}

export const rootReducer: Reducer<AppState> = combineReducers({
    stats: statsReducer,
});
