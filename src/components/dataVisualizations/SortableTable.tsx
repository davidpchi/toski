import { TriangleDownIcon, TriangleUpIcon, UpDownIcon } from "@chakra-ui/icons";
import { chakra, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {
    Cell,
    Column,
    ColumnSort,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    Header,
    Row,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import React from "react";
import { primaryColor } from "../../themes/acorn";

const defaultPropGetter = () => ({});

export const SortableTable = React.memo(function SortableTable({
    columns,
    data,
    defaultSort = [],
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter
}: {
    columns: any;
    data: any;
    defaultSort?: ColumnSort[];
    getHeaderProps?: (header: Header<any, any>) => any;
    getColumnProps?: (column: Column<any>) => any;
    getRowProps?: (row: Row<any>) => any;
    getCellProps?: (cell: Cell<any, any>) => any;
}) {
    const [sorting, setSorting] = React.useState<SortingState>(defaultSort);
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting
        }
    });

    return (
        <TableContainer
            border="0px"
            borderColor="#E2E8F0"
            borderRadius="md"
            backgroundColor="white"
            boxShadow={"0px 12px 18px -6px rgba(0,0,0,0.3)"}
        >
            <Table>
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const meta: any = header.column.columnDef.meta;
                                return (
                                    <Th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                        {...getHeaderProps(header)}
                                        role={"button"}
                                        backgroundColor={primaryColor["500"]}
                                        color={"white"}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}

                                        <chakra.span pl="4">
                                            {header.column.getIsSorted() ? (
                                                header.column.getIsSorted() === "desc" ? (
                                                    <TriangleDownIcon aria-label="sorted descending" />
                                                ) : (
                                                    <TriangleUpIcon aria-label="sorted ascending" />
                                                )
                                            ) : (
                                                <UpDownIcon />
                                            )}
                                        </chakra.span>
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr
                            key={row.id}
                            {...getRowProps(row)}
                            role={getRowProps(row).onClick !== undefined ? "button" : undefined}
                        >
                            {row.getVisibleCells().map((cell) => {
                                const meta: any = cell.column.columnDef.meta;
                                return (
                                    <Td
                                        key={cell.id}
                                        isNumeric={meta?.isNumeric}
                                        {...getCellProps(cell)}
                                        {...getColumnProps(cell.column)}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Td>
                                );
                            })}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
});
