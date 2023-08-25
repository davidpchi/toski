import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import { Error } from "../components/Error";
import { MatchDetails, loader as matchLoader } from "../components/matchHistory/MatchDetails";
import { MatchHistory } from "../components/matchHistory/MatchHistory";
import { CommanderOverview } from "../components/commanderOverview/CommanderOverview";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error error={'Whoops! Made a wrong turn!'} />,
        children: [
            {
                path: '/toski',
                element: <MatchHistory />,
            },
            {
                path: '/toski/playerOverview',
                element: <MatchHistory />,
            },
            {
                path: '/toski/matchHistory',
                element: <MatchHistory />,
            },
            {
                path: '/toski/commanderOverview',
                element: <CommanderOverview />,
            },
            {
                path: '/toski/matchHistory/:matchId',
                loader: matchLoader,
                element: <MatchDetails />,
            }
        ]
    }
])