import { AppState } from "./rootReducer";

export const getMatches = (state: AppState) => state.stats.matches;