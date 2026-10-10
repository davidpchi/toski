import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppState } from "../../redux/rootReducer";
import { Commander } from "../../types/domain/Commander";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { CommandersSelectors } from "../../redux/commanders/commandersSelectors";
import { SortableTable } from "../dataVisualizations/SortableTable";
import { getCommanderOverviewColumns } from "../dataVisualizations/columnHelpers/commanderOverviewColumnHelper";

export const CommanderHistoryTable = React.memo(function CommanderHistoryTable({ playerId }: { playerId: string }) {
    const navigate = useNavigate();

    // Get array of commanders played and sort by game count
    const playedCommanders: Commander[] = useSelector((state: AppState) =>
        StatsSelectors.getCommandersByPlayerName(state, playerId ? playerId : "")
    );
    playedCommanders.sort((a: Commander, b: Commander) => b.validMatchesCount - a.validMatchesCount);

    const commandersData = useSelector((state: AppState) => CommandersSelectors.getCommanders(state));
    const columns = getCommanderOverviewColumns(commandersData);

    return (
        <SortableTable
            columns={columns}
            data={playedCommanders}
            getRowProps={(row: any) => {
                return {
                    onClick: () => {
                        navigate(`/commanderOverview/${row.original.id}`);
                        window.scrollTo(0, 0);
                    }
                };
            }}
        />
    );
});
