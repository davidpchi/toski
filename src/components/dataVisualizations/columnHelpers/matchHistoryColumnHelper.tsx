import { Flex, Image, Text } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Match } from "../../../types/domain/Match";
import { commanderList } from "../../../services/commanderList";

const columnHelper = createColumnHelper<Match>();

export const matchHistoryColumns: ColumnDef<Match, any>[] = [
    columnHelper.accessor((row) => row.id, {
        id: "id",
        cell: (info) => info.getValue(),
        header: () => <span>Game Id</span>
    }),
    columnHelper.accessor((row) => row.date, {
        id: "date",
        cell: (info) => {
            return <div>{info.row.original.date.toDateString()}</div>;
        },
        header: () => <span>Date</span>
    }),
    columnHelper.accessor((row) => row.players, {
        id: "players",
        cell: (info) => {
            const players = info.row.original.players.map((value, index) => {
                // loop through all the commanders and build the string
                let commanderText = value.commanders[0];

                // TODO: we need to better handle this and properly determine
                // if the 2nd commander listed is a partner or a companion
                if (value.commanders[1] !== undefined) {
                    commanderText += " and " + value.commanders[1];
                }

                // TODO: right now, we assume the 3rd commander listed is the companion
                const companionText =
                    value.commanders[2] !== undefined ? `with companion ${value.commanders[2]}` : undefined;
                return (
                    <Flex key={index} flexDirection={"column"}>
                        <Text>{value.name + " playing " + commanderText}</Text>
                        {companionText !== undefined ? <Text paddingLeft={2}>{companionText}</Text> : null}
                    </Flex>
                );
            });

            return (
                <Flex align="start" flexDirection="column" flexWrap="wrap" maxWidth={"500px"}>
                    {players}
                </Flex>
            );
        },
        header: () => <span>Players</span>
    }),
    columnHelper.accessor((row) => row.winner, {
        id: "winner",
        cell: (info) => {
            const match = info.row.original;
            // get the commander image for the winner
            const winner = match.players.find((player) => player.name === match.winner);
            const commander = winner ? winner.commanders[0] : "";
            const commanderImage = commanderList[commander]
                ? commanderList[commander].image.replace("normal", "art_crop")
                : "";

            return (
                <Flex alignContent={"center"} justifyContent={"center"} flexDirection={"column"}>
                    <Image src={commanderImage} width={20} borderRadius={8} />
                    <span>{info.getValue()}</span>
                </Flex>
            );
        },
        header: () => <span>Winner</span>
    })
];
