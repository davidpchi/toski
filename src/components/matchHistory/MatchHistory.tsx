import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { SortableTable } from "../SortableTable";
import { matchHistoryColumns } from "./matchHistoryColumnHelper";
import { getMatches } from "../../redux/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";

export const MatchHistory = React.memo(function MatchHistory() {
    const navigate = useNavigate();

    const matches = useSelector(getMatches);

    if (matches === undefined) {
        return <Loading text="" />;
    }

    return (
        <Flex direction='column' justify='center' align='center'>
            <Heading>Match History</Heading>
            <SortableTable
                columns={matchHistoryColumns}
                data={matches}
                getRowProps={(row: any) => {
                    return {
                        onClick: () => {
                            navigate('/matchHistory/' + row.original.id);
                            window.scrollTo(0, 0);
                        },
                    };
                }}
            />
        </Flex>
    );
});