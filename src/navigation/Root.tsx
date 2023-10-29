import { Outlet } from "react-router-dom";

import "./Root.css";
import AppFrame from "../components/navigation/AppFrame";
import { MatchHistoryService } from "../services/MatchHistoryService";
import { DiscordService } from "../services/DiscordService";
import { ProfileService } from "../services/ProfileService";

export default function Root() {
    const hydrateProfiles = ProfileService.useHydrateProfiles();
    const getCurrentUserInfo = DiscordService.useGetCurrentUserInfo();

    // kick off the initial data hydration
    MatchHistoryService.useMatchHistory();

    // initiates the hydration of the discord info for the current user
    getCurrentUserInfo();

    // make the initial call to hydrate profiles
    hydrateProfiles();

    return (
        <AppFrame>
            <Outlet />
        </AppFrame>
    );
}
