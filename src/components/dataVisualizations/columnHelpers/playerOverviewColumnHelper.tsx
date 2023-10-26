import { Box, Flex, Tag, TagLabel } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { Player } from "../../../types/domain/Player";
import { getWinRatePercentage, isNewlyQualifiedPlayer } from "../../../logic/utils";

const columnHelper = createColumnHelper<Player>();

export const playerOverviewColumns: ColumnDef<Player, any>[] = [
    columnHelper.accessor((row) => row.name, {
        id: "name",
        cell: (info) => {
            const player = info.getValue();
            // if the player is newly qualified, show the *NEW* tag next to it
            const isNewlyQualified = isNewlyQualifiedPlayer(info.row.original);

            return (
                <Flex direction={"row"} alignItems={"center"}>
                    <Box padding="2">{player}</Box>
                    {isNewlyQualified ? (
                        <Tag size={"sm"} rounded={"full"} variant={"solid"}>
                            <TagLabel>NEW</TagLabel>
                        </Tag>
                    ) : null}
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
    columnHelper.accessor(
        (row) => (row.validMatchesCount > 0 ? getWinRatePercentage(row.wins, row.validMatchesCount) : 0),
        {
            id: "winrate",
            cell: (info) =>
                info.row.original.validMatchesCount > 0
                    ? `${getWinRatePercentage(info.row.original.wins, info.row.original.validMatchesCount)}%`
                    : `N/A`, // Displays N/A if the player has no valid matches
            header: () => <span>Winrate</span>
        }
    )
];
