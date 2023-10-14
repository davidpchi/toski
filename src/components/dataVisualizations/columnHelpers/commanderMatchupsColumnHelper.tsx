import { Box, Flex, Image } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { commanderList } from "../../../services/commanderList";

export type CommanderMatchupItem = {
    name: string;
    matchCount: number;
    winCount: number;
};

const columnHelper = createColumnHelper<CommanderMatchupItem>();

export const commanderMatchupsColumns: ColumnDef<CommanderMatchupItem, any>[] = [
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
        header: () => <span>Commander</span>
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
    columnHelper.accessor((row) => (row.matchCount > 0 ? Math.round((row.winCount / row.matchCount) * 100) : 0), {
        id: "winrate",
        cell: (info) =>
            info.row.original.matchCount > 0
                ? `${Math.round((info.row.original.winCount / info.row.original.matchCount) * 100)}%`
                : `0%`,
        header: () => <span>Winrate Against</span>
    })
];
