import { Outlet } from 'react-router-dom';

import './Root.css';
import SidebarWithHeader from '../components/SidebarWithHeader';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Match } from '../types/domain/Match';
import { sheetRowToMatch } from '../types/service/dataMappers';
import { StatsAction } from '../redux/statsActions';
import { SheetData } from '../types/service/SheetData';
import axios from 'axios';

const dataEndpoint = 'https://docs.google.com/spreadsheets/d/1FsjnGp3JPsqAEmlyWlxmYK5pSwGASqfIcDl9HvD-fuk/gviz/tq?gid=1885300192';

export const fetchData = (): Promise<SheetData> =>
    axios.get<string>(dataEndpoint, {}).then((res) => {
        // strip out the setResponse text from the data
        let raw: string = res.data;
        const startText = ".setResponse(";
        raw = raw.substring(raw.indexOf(startText) + startText.length);
        raw = raw.substring(0, raw.length - 2);
        return JSON.parse(raw);
    });

export default function Root() {

    // Do the initial data hydration here
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData().then((result) => {
            const matches: Match[] = [];

            for (let i = 0; i < result.table.rows.length; i++) {
                const cell = result.table.rows[i];
                const match = sheetRowToMatch(cell, i.toString());
                matches.push(match);
            }

            dispatch(StatsAction.HydrateMatchHistoryComplete(matches));
        });
    }, []);

    return (
        <SidebarWithHeader>
            <Outlet />
        </SidebarWithHeader>
    );
}
