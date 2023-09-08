import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { getMatchesByPlayerName } from "../../redux/statsSelectors";
import { AppState } from "../../redux/rootReducer";
import { matchHistoryColumns } from "../matchHistory/matchHistoryColumnHelper";
import { SortableTable } from "../SortableTable";
import { Loading } from "../Loading";

export async function loader(data: { params: any }) {
	return data.params.playerId;
}

export const PlayerDetails = React.memo(function PlayerDetails() {
	const navigate = useNavigate();

	// Player variables
	const playerId = useLoaderData() as string;
	const title = playerId;
	const matches = useSelector((state: AppState) =>
		getMatchesByPlayerName(state, playerId ? playerId : ""),
	);

	if (matches.length === 0) {
		return <Loading text="Loading..." />;
	}

	// Calculate metrics (number of games, win rate)
	const numberOfMatches = matches.length;
	let numberOfWins = 0; // initialized at zero but incremented below
	for (let i = 0; i < numberOfMatches; i++) {
		if (matches[i].winner === playerId) {
			numberOfWins++;
		}
	}

	const playerWinRate =
		numberOfMatches > 0
			? Math.round((numberOfWins * 100) / numberOfMatches)
			: 0;

	return (
		<Flex direction="column" justify="center" align="center">
			<Flex>
				<Heading>{title}</Heading>

				<Flex direction="column" padding="16px">
					<Text> {`Total Number of Games: ${numberOfMatches}`}</Text>
					<Text>{`Winrate: ${playerWinRate}%`}</Text>
				</Flex>
			</Flex>

			<SortableTable
				columns={matchHistoryColumns}
				data={matches}
				getRowProps={(row: any) => {
					return {
						onClick: () => {
							navigate(`/matchHistory/${row.original.id}`);
							window.scrollTo(0, 0);
						},
					};
				}}
			/>
		</Flex>
	);
});
