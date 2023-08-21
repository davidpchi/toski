import { Flex } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Match } from "../../types/domain/Match";

const columnHelper = createColumnHelper<Match>();

export const matchHistoryColumns: ColumnDef<Match, any>[] = [
    columnHelper.accessor((row) => row.id, {
        id: 'id',
        cell: (info) => info.getValue(),
        header: () => <span>Game Id</span>,
    }),
    columnHelper.accessor((row) => row.date, {
        id: 'date',
        cell: (info) => {
            return <div>{info.row.original.date.toDateString()}</div>;
        },
        header: () => <span>Date</span>,
    }),
    columnHelper.accessor((row) => row.players, {
        id: 'players',
        cell: (info) => {
            const players = info.row.original.players.map((value, index) => {
                return (<Flex key={index}>{value.name + " playing " + value.commander}</Flex>);
            });

            return (
                <Flex align='start' flexDirection='column' flexWrap='wrap'>
                    {players}
                </Flex >
            );
        },
        header: () => <span>Players</span>,
    }),
    columnHelper.accessor((row) => row.winner, {
        id: 'winner',
        cell: (info) => {
            return info.getValue();
        },
        header: () => <span>Winner</span>,
    }),
];