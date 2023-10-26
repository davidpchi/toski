import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { getWinRatePercentage } from "../../../logic/utils";

export type PlayerMatchupItem = {
    name: string;
    matchCount: number;
    winCount: number;
};

const columnHelper = createColumnHelper<PlayerMatchupItem>();

export const playerMatchupsColumns: ColumnDef<PlayerMatchupItem, any>[] = [
    columnHelper.accessor((row) => row.name, {
        id: "name",
        cell: (info) => info.row.original.name,
        header: () => <span>Player</span>
    }),
    columnHelper.accessor((row) => row.matchCount, {
        id: "gameCount",
        cell: (info) => info.row.original.matchCount,
        header: () => <span>Games Against</span>
    }),
    columnHelper.accessor((row) => row.winCount, {
        id: "wins",
        cell: (info) => info.row.original.winCount,
        header: () => <span>Wins Against</span>
    }),
    columnHelper.accessor((row) => (row.matchCount > 0 ? getWinRatePercentage(row.winCount, row.matchCount) : 0), {
        id: "winrate",
        cell: (info) =>
            info.row.original.matchCount > 0
                ? `${getWinRatePercentage(info.row.original.winCount, info.row.original.matchCount)}%`
                : `N/A`, // This shouldn't happen
        header: () => <span>Winrate Against</span>
    })
];
