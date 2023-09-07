import React from "react";
import { useLoaderData } from "react-router-dom";
import { Loading } from "../Loading";
import { getMatchesByPlayerName } from "../../redux/statsSelectors";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/rootReducer";
import { Flex, Heading, Text } from "@chakra-ui/react";

export async function loader(data: { params: any }) {
	return data.params.playerId;
}

export const PlayerDetails = React.memo(function PlayerDetails() {
	// Key player variables
	const playerId = useLoaderData() as string;
	const title = playerId;
	const matches = useSelector((state: AppState) =>
		getMatchesByPlayerName(state, playerId ? playerId : ""),
	);

	if (playerId === undefined) {
		return <Loading text="" />;
	}
	console.log(matches);

	// Calculate metrics (number of games, win rate)
	const numberOfMatches = matches.length;

	return (
		<Flex direction="column" justify="center" align="center">
			<Heading>{title}</Heading>
			<Flex direction="column" padding="16px">
				<Text>{`Total Number of Games: ${numberOfMatches}`}</Text>
			</Flex>
		</Flex>
	);
});
