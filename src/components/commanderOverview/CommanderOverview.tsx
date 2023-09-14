import { Checkbox, Flex, Heading, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { SortableTable } from "../dataVisualizations/SortableTable";
import { commanderOverviewColumns } from "./commanderOverviewColumnHelper";
import { getCommanders } from "../../redux/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { Commander } from "../../types/domain/Commander";
import { useNavigate } from "react-router-dom";
import { COMMANDER_MINIMUM_GAMES_REQUIRED } from "../contants";

export const CommanderOverview = React.memo(function MatchHistory() {
    const navigate = useNavigate();
    const commanders: { [id: string]: Commander } | undefined = useSelector(getCommanders);
    const [isFiltered, setIsFiltered] = useState<boolean>(true);

    const onFilterChange = () => {
        setIsFiltered(!isFiltered);
    };

    if (commanders === undefined) {
        return <Loading text="Loading..." />;
    }

    let commandersArray = Object.values(commanders).sort((a: Commander, b: Commander) => a.name.localeCompare(b.name));
    if (isFiltered) {
        commandersArray = commandersArray.filter(
            (value: Commander) => value.matches.length >= COMMANDER_MINIMUM_GAMES_REQUIRED,
        );
    }

    return (
        <Flex direction="column" justify="center" align="center">
            <Heading>Commander Overview</Heading>
            <Flex alignSelf={"center"} marginBottom={"16px"}>
                <Tooltip
                    label={<p style={{ textAlign: "center" }}>Commanders play 5 games to be qualified.</p>}
                    hasArrow
                    arrowSize={15}
                >
                    <div>
                        <Checkbox isChecked={isFiltered} onChange={onFilterChange}>
                            {"Show only qualified"}
                        </Checkbox>
                    </div>
                </Tooltip>
            </Flex>
            <SortableTable
                columns={commanderOverviewColumns}
                data={commandersArray}
                getRowProps={(row: any) => {
                    return {
                        onClick: () => {
                            navigate(`/commanderOverview/${row.original.id}`);
                            window.scrollTo(0, 0);
                        },
                    };
                }}
            />
        </Flex>
    );
});
