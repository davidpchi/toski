import { Box, Flex, Image } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { getWinRatePercentage } from "../../../logic/utils";
import { CommanderData } from "../../../services/CommanderService";

export type CommanderMatchupItem = {
    id: string;
    name: string;
    matchCount: number;
    winCount: number;
};

const columnHelper = createColumnHelper<CommanderMatchupItem>();

export const getCommanderMatchupsColumns = (
    commandersMap: { [name: string]: CommanderData } | undefined
): ColumnDef<CommanderMatchupItem, any>[] => [
    columnHelper.accessor((row) => row.name, {
        id: "name",
        cell: (info) => {
            const commander = info.getValue();
            const commanderData = commandersMap ? commandersMap[commander] : undefined;
            const commanderImage = commanderData
                ? commanderData.image.replace("normal", "art_crop")
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
    columnHelper.accessor((row) => (row.matchCount > 0 ? getWinRatePercentage(row.winCount, row.matchCount) : 0), {
        id: "winrate",
        cell: (info) =>
            info.row.original.matchCount > 0
                ? `${getWinRatePercentage(info.row.original.winCount, info.row.original.matchCount)}%`
                : `N/A`, // This shouldn't happen
        header: () => <span>Winrate Against</span>
    })
];

// Keep the old export for backward compatibility
export const commanderMatchupsColumns: ColumnDef<CommanderMatchupItem, any>[] = getCommanderMatchupsColumns(undefined);
