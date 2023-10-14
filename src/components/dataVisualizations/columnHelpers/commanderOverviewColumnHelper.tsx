import { Box, Flex, Image } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { commanderList } from "../../../services/commanderList";
import { Commander } from "../../../types/domain/Commander";

const columnHelper = createColumnHelper<Commander>();

export const commanderOverviewColumns: ColumnDef<Commander, any>[] = [
    columnHelper.accessor((row) => row.name, {
        id: "name",
        cell: (info) => {
            const commander = info.getValue();
            const commanderImage = commanderList[commander]
                ? commanderList[commander].image.replace("normal", "art_crop")
                : "";

            return (
                <Flex direction={"row"} alignItems={"center"}>
                    <Image src={commanderImage} width={20} borderRadius={8} />
                    <Box padding="2">{commander}</Box>
                </Flex>
            );
        },
        header: () => <span>Name</span>
    }),
    columnHelper.accessor((row) => row.matches.length, {
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
