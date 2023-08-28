import { createHashRouter } from "react-router-dom";
import Root from "./Root";
import { Error } from "../components/Error";
import { MatchDetails, loader as matchLoader } from "../components/matchHistory/MatchDetails";
import { MatchHistory } from "../components/matchHistory/MatchHistory";
import { CommanderOverview } from "../components/commanderOverview/CommanderOverview";
import Home from "../components/home/Home";

export const router = createHashRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error error={'Whoops! Made a wrong turn!'} />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/playerOverview',
                element: <MatchHistory />,
            },
            {
                path: '/matchHistory',
                element: <MatchHistory />,
            },
            {
                path: '/commanderOverview',
                element: <CommanderOverview />,
            },
            {
                path: '/matchHistory/:matchId',
                loader: matchLoader,
                element: <MatchDetails />,
            }
        ]
    }
])