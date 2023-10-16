import { Outlet } from "react-router-dom";

import "./Root.css";
import AppFrame from "../components/navigation/AppFrame";
import { MatchHistoryService } from "../services/MatchHistoryService";

export default function Root() {
    // kick off the initial data hydration
    MatchHistoryService.useMatchHistory();

    return (
        <AppFrame>
            <Outlet />
        </AppFrame>
    );
}
