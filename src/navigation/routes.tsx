import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import { Error } from "../components/Error";
import { MatchHistory } from "../components/matchHistory/MatchHistory";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error error={'Whoops! Made a wrong turn!'} />,
        children: [
            {
                path: '/',
                element: <MatchHistory />,
            },
            {
                path: '/playerOverview',
                element: <MatchHistory />,
            },
            {
                path: '/matchHistory',
                element: <MatchHistory />,
            },
        ]
    }
])