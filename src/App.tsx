import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/routes";
import { SheetData } from "./types/service/SheetData";
import axios from "axios";
import { Match } from "./types/domain/Match";
import { useEffect, useState } from "react";
import { sheetRowToMatch } from "./types/service/dataMappers";
import { Provider, useDispatch } from "react-redux";
import { StatsAction } from "./redux/stats/statsActions";
import { createStore } from "@reduxjs/toolkit";
import { rootReducer } from "./redux/rootReducer";

const queryClient = new QueryClient();

const store = createStore(rootReducer);

export default function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </Provider>
    );
}
