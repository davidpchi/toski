import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Commander } from "../../types/domain/Commander";

const columnHelper = createColumnHelper<Commander>();

export const commanderOverviewColumns: ColumnDef<Commander, any>[] = [
    columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
    }),
    columnHelper.accessor((row) => row.matches, {
        id: 'gameCount',
        cell: (info) => info.row.original.matches.length,
        header: () => <span>Game Count</span>,
    }),
];