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
        cell: (info) => info.row.original.validMatchesCount,
        header: () => <span>Game Count</span>
    }),
    columnHelper.accessor((row) => row.wins, {
        id: "wins",
        cell: (info) => info.row.original.wins,
        header: () => <span>Wins</span>
    }),
    columnHelper.accessor((row) => (row.validMatchesCount > 0 ? getWinRatePercentage(row.wins, row.validMatchesCount) : 0), {
        id: "winrate",
        cell: (info) =>
            info.row.original.validMatchesCount > 0
                ? `${getWinRatePercentage(info.row.original.wins, info.row.original.validMatchesCount)}%`
                : `N/A`, // Displays N/A if the player has no valid matches
        header: () => <span>Winrate</span>
    })
];
