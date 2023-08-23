import { AppState } from "./rootReducer";

export const getMatches = (state: AppState) => state.stats.matches;

export const getCommanders = (state: AppState) => state.stats.commanders;