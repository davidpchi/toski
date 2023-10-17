import { Box, Flex, Text } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { Player } from "../../../types/domain/Player";
import { isNewlyQualifiedPlayer } from "../../../logic/utils";

const columnHelper = createColumnHelper<Player>();

export const playerOverviewColumns: ColumnDef<Player, any>[] = [
    columnHelper.accessor((row) => row.name, {
        id: "name",
        cell: (info) => {
            const player = info.getValue();
            // if the player is newly qualified, show the *NEW* tag next to it
            // TODO: there is a possiblity that this also shows up in the commander details page
            // but we need to decide if that makes sense.
            const isNewlyQualified = isNewlyQualifiedPlayer(info.row.original);

            return (
                <Flex direction={"row"} alignItems={"center"}>
                    <Box padding="2">{player}</Box>
                    {isNewlyQualified ? <Text fontWeight={"bold"}>*NEW*</Text> : null}
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
    columnHelper.accessor((row) => (row.matches.length > 0 ? Math.round((row.wins / row.matches.length) * 100) : 0), {
        id: "winrate",
        cell: (info) =>
            info.row.original.matches.length > 0
                ? `${Math.round((info.row.original.wins / info.row.original.matches.length) * 100)}%`
                : `0%`,
        header: () => <span>Winrate</span>
    })
];
