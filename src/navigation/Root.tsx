import { Outlet } from "react-router-dom";

import "./Root.css";
import SidebarWithHeader from "../components/SidebarWithHeader";
import { useMatchHistory } from "../services/matchHistoryService";

export default function Root() {
    // kick off the initial data hydration
    useMatchHistory();

    return (
        <SidebarWithHeader>
            <Outlet />
        </SidebarWithHeader>
    );
}
