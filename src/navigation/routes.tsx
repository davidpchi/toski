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
import {
	PlayerDetails,
	loader as playerLoader,
} from "../components/playerOverview/PlayerDetails";
import NewsOverview from "../components/news/NewsOverview";
import { loader as newsLoader, NewsDetail } from "../components/news/NewsDetail";
import { MatchSubmission } from "../components/matchHistory/MatchSubmission";

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
				path: "/playerOverview/:playerId",
				loader: playerLoader,
				element: <PlayerDetails />,
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
			{
				path: '/articles',
				element: <NewsOverview />,
			},
			{
				path: '/articles/:newsId',
				loader: newsLoader,
				element: <NewsDetail />,
			},
			{
				path: '/matchHistory/submit',
				element: <MatchSubmission />,
			}
		],
	},
]);
