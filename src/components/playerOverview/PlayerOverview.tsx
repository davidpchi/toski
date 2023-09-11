import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { SortableTable } from "../dataVisualizations/SortableTable";
import { playerOverviewColumns } from "./playerOverviewColumnHelper";
import { getPlayers } from "../../redux/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { Player } from "../../types/domain/Player";
import { useNavigate } from "react-router-dom";

/**
 * Component showing all the players in a big list
 */
export const PlayerOverview = React.memo(function MatchHistory() {
	const navigate = useNavigate();
	const players: { [id: string]: Player } | undefined = useSelector(getPlayers);

	if (players === undefined) {
		return <Loading text="Loading..." />;
	}

	const playersArray = Object.values(players);
	playersArray.sort((a: Player, b: Player) => a.name.localeCompare(b.name));

	return (
		<Flex direction="column" justify="center" align="center">
			<Heading>Player Overview</Heading>
			<SortableTable
				columns={playerOverviewColumns}
				data={playersArray}
				getRowProps={(row: any) => {
					console.log(row);
					return {
						onClick: () => {
							navigate(`/playerOverview/${row.original.name}`);
							window.scrollTo(0, 0);
						},
					};
				}}
			/>
		</Flex>
	);
});
