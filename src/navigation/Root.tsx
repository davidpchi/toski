import { Outlet } from "react-router-dom";

import "./Root.css";
import AppFrame from "../components/navigation/AppFrame";
import { MatchHistoryService } from "../services/MatchHistoryService";
import { DiscordService } from "../services/DiscordService";
import { ProfileService } from "../services/ProfileService";

export default function Root() {
    // kick off the initial data hydration
    MatchHistoryService.useMatchHistory();

    // initiates the hydration of the discord info for the current user
    DiscordService.useCurrentUserInfo();

    // make the initial call to hydrate profiles
    ProfileService.useProfiles();

    return (
        <AppFrame>
            <Outlet />
        </AppFrame>
    );
}
