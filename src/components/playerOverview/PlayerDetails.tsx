import React from "react";
import { useLoaderData } from "react-router-dom";
import { Loading } from "../Loading";
import { getMatchesByPlayerName } from "../../redux/statsSelectors";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/rootReducer";

export async function loader(data: { params: any }) {
	return data.params.playerId;
}

export const PlayerDetails = React.memo(function PlayerDetails() {
	const playerId = useLoaderData() as string;
	const matches = useSelector((state: AppState) =>
		getMatchesByPlayerName(state, playerId ? playerId : ""),
	);

	if (playerId === undefined) {
		return <Loading text="" />;
	}

	return <div>{playerId}</div>;
});
