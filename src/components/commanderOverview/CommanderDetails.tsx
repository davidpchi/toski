import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AppState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";
import { getCommander, getMatch, getMatches, getMatchesByCommanderName } from "../../redux/statsSelectors";
import { Loading } from "../Loading";
import { FiLoader } from "react-icons/fi";
import { commanderList } from "../../services/commanderList";
import { SortableTable } from "../SortableTable";
import { matchHistoryColumns } from "../matchHistory/matchHistoryColumnHelper";

export async function loader(data: { params: any }) {
    return data.params.commanderId;
};

export const CommanderDetails = React.memo(function CommanderDetails() {
    const navigate = useNavigate();
    const commanderId = useLoaderData() as string;
    const commander = useSelector((state: AppState) => getCommander(state, commanderId));
    const matches = useSelector((state: AppState) => getMatchesByCommanderName(state, commander ? commander.name : ""))

    if (commander === undefined) {
        return <Loading text="" />
    }

    const title = commander.name.toUpperCase();

    return (
        <Flex direction='column' justify='center' align='center'>
            <Heading>{title}</Heading>
            <Flex direction='row' maxWidth={"1024px"} alignSelf={'center'} justify='center' align='start' flexWrap='wrap' marginBottom='32px'>
                {commanderList[commander.name] ? <Image width={300} src={commanderList[commander.name].image} /> : null}
                <Flex direction='column' padding='16px'>
                    <Text>
                        {`Total Number of Games: ${commander.matches.length}`}
                    </Text>
                    <Text>
                        {`Wins: ${commander.wins}`}
                    </Text>
                    <Text>
                        {`Winrate: ${commander.matches.length > 0 ? Math.round(commander.wins / commander.matches.length * 100) : 0}%`}
                    </Text>
                </Flex>
            </Flex>
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
    )
});