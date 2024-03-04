import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import "./Root.css";
import AppFrame from "../components/navigation/AppFrame";
import { MatchHistoryService } from "../services/MatchHistoryService";
import { DiscordService } from "../services/DiscordService";
import { ProfileService } from "../services/ProfileService";
import { useAuthInfo } from "../logic/hooks/authHooks";

export default function Root() {
    const hydrateProfiles = ProfileService.useHydrateProfiles();
    const getCurrentUserInfo = DiscordService.useGetCurrentUserInfo();
    const getMatchHistory = MatchHistoryService.useMatchHistory();

    const { accessToken, tokenType } = useAuthInfo();

    useEffect(() => {
        // kick off the initial data hydration
        getMatchHistory();

        // make the initial call to hydrate profiles
        hydrateProfiles();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // if the accessToken changes, initiates the hydration of the discord info for the current user
        getCurrentUserInfo();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, tokenType]);

    return (
        <AppFrame>
            <Outlet />
        </AppFrame>
    );
}
