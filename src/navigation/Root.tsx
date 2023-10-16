import { Outlet } from "react-router-dom";

import "./Root.css";
import AppFrame from "../components/navigation/AppFrame";
import { useMatchHistory } from "../services/matchHistoryService";

export default function Root() {
    // kick off the initial data hydration
    useMatchHistory();

    return (
        <AppFrame>
            <Outlet />
        </AppFrame>
    );
}
