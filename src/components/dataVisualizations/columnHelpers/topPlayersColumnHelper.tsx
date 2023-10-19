import { Box, Flex } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { Player } from "../../../types/domain/Player";
import { getWinRatePercentage } from "../../../logic/utils";

const columnHelper = createColumnHelper<Player>();

export const topPlayersColumns: ColumnDef<Player, any>[] = [
    columnHelper.accessor((row) => row.name, {
        id: "name",
        cell: (info) => {
            const player = info.getValue();
            return (
                <Flex direction={"row"} alignItems={"center"}>
                    <Box padding="2">{player}</Box>
                </Flex>
            );
        },
        header: () => <span>Name</span>
    }),
    columnHelper.accessor((row) => row.matches, {
        id: "gameCount",
        cell: (info) => info.row.original.matches.length,
        header: () => <span>Game Count</span>
    }),
    columnHelper.accessor((row) => row.wins, {
        id: "wins",
        cell: (info) => info.row.original.wins,
        header: () => <span>Wins</span>
    }),
    columnHelper.accessor((row) => (row.matches.length > 0 ? getWinRatePercentage(row.wins, row.matches.length) : 0), {
        id: "winrate",
        cell: (info) =>
            info.row.original.matches.length > 0
                ? `${getWinRatePercentage(info.row.original.wins, info.row.original.matches.length)}%`
                : `0%`,
        header: () => <span>Winrate</span>
    })
];
