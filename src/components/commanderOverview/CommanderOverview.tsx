import { Checkbox, Flex, Heading } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { SortableTable } from "../SortableTable";
import { commanderOverviewColumns } from "./commanderOverviewColumnHelper";
import { getCommanders } from "../../redux/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { Commander } from "../../types/domain/Commander";
import { useNavigate } from "react-router-dom";

export const CommanderOverview = React.memo(function MatchHistory() {
    const navigate = useNavigate();
    const commanders: { [id: string]: Commander } | undefined = useSelector(getCommanders);
    const [isFiltered, setIsFiltered] = useState<boolean>(true);

    const onFilterChange = () => { setIsFiltered(!isFiltered) };

    if (commanders === undefined) {
        return <Loading text="Loading..." />;
    }

    let commandersArray = Object.values(commanders).sort((a: Commander, b: Commander) => a.name.localeCompare(b.name));
    if (isFiltered) {
        commandersArray = commandersArray.filter((value: Commander) => value.matches.length >= 5);
    }

    return (
        <Flex direction='column' justify='center' align='center'>
            <Heading>Commander Overview</Heading>
            <Flex direction='column' justify='center'>
                <Flex alignSelf={'end'} marginBottom={'16px'}>
                    <Checkbox isChecked={isFiltered} onChange={onFilterChange} >
                        {'Show only qualified'}
                    </Checkbox>
                </Flex>
                <SortableTable
                    columns={commanderOverviewColumns}
                    data={commandersArray}
                    getRowProps={(row: any) => {
                        return {
                            onClick: () => {
                                navigate('/commanderOverview/' + row.original.id);
                                window.scrollTo(0, 0);
                            },
                        };
                    }}
                />
            </Flex>
        </Flex>
    );
});