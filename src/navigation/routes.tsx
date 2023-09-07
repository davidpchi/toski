import { createHashRouter } from "react-router-dom";

import Root from "./Root";
import {
	CommanderDetails,
	loader as commanderLoader,
} from "../components/commanderOverview/CommanderDetails";
import { CommanderOverview } from "../components/commanderOverview/CommanderOverview";
import { Error } from "../components/Error";
import Home from "../components/home/Home";
import {
	MatchDetails,
	loader as matchLoader,
} from "../components/matchHistory/MatchDetails";
import { MatchHistory } from "../components/matchHistory/MatchHistory";
import { PlayerOverview } from "../components/playerOverview/PlayerOverview";
import { MatchTrends } from "../components/matchTrends/MatchTrends";

export const router = createHashRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error error={"Whoops! Made a wrong turn!"} />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/playerOverview",
				element: <PlayerOverview />,
			},
			{
				path: "/matchHistory",
				element: <MatchHistory />,
			},
			{
				path: "/matchHistory/:matchId",
				loader: matchLoader,
				element: <MatchDetails />,
			},
			{
				path: "/matchTrends",
				element: <MatchTrends />,
			},
			{
				path: "/commanderOverview",
				element: <CommanderOverview />,
			},
			{
				path: "/commanderOverview/:commanderId",
				loader: commanderLoader,
				element: <CommanderDetails />,
			},
		],
	},
]);
