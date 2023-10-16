import { Flex } from "@chakra-ui/react";
import React from "react";
import { SortableTable } from "../dataVisualizations/SortableTable";
import { matchHistoryColumns } from "../dataVisualizations/columnHelpers/matchHistoryColumnHelper";
import { getMatches } from "../../redux/stats/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";
import { Match } from "../../types/domain/Match";

export const MatchHistory = React.memo(function MatchHistory() {
    const navigate = useNavigate();
    let matches = useSelector(getMatches);

    if (matches === undefined) {
        return <Loading text="" />;
    }

    // Cannot directly mutate state, copy to new array first
    matches = matches.slice().sort((a: Match, b: Match) => Number(b.id) - Number(a.id));

    return (
        <Flex direction="column" justify="center" align="center">
            <SortableTable
                columns={matchHistoryColumns}
                data={matches}
                getRowProps={(row: any) => {
                    return {
                        onClick: () => {
                            navigate(`/matchHistory/${row.original.id}`);
                            window.scrollTo(0, 0);
                        }
                    };
                }}
            />
        </Flex>
    );
});
