import axios from 'axios';
import { useDispatch } from 'react-redux';

import { Match } from '../types/domain/Match';
import { sheetRowToMatch } from '../types/service/dataMappers';
import { StatsAction } from '../redux/statsActions';
import { useEffect } from 'react';

const dataEndpoint = 'https://docs.google.com/spreadsheets/d/1FsjnGp3JPsqAEmlyWlxmYK5pSwGASqfIcDl9HvD-fuk/gviz/tq?gid=1885300192';

export const useMatchHistory = () => {
    // Do the initial data hydration here
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get<string>(dataEndpoint, {}).then((res) => {
            // strip out the setResponse text from the data
            let raw: string = res.data;
            const startText = ".setResponse(";
            raw = raw.substring(raw.indexOf(startText) + startText.length);
            raw = raw.substring(0, raw.length - 2);
            const resultObj = JSON.parse(raw);
            const matches = mapObjectoMatches(resultObj);

            if (matches !== undefined) {
                dispatch(StatsAction.HydrateMatchHistoryComplete(matches));
            } else {
                console.log("mapping resultObj to matches failed.");
            }
        });
    }, []);
};

export function mapObjectoMatches(resultObj: any): Match[] | undefined {
    const matches: Match[] = [];

    if (resultObj.table === undefined ||
        resultObj.table.rows === undefined) {
        console.log("Error parsing JSON object from data: resultObj.table or resultObj.table.rows is undefined.");
        return undefined;
    }

    for (let i = 0; i < resultObj.table.rows.length; i++) {
        const cell = resultObj.table.rows[i];
        const match = sheetRowToMatch(cell, i.toString());
        matches.push(match);
    }

    return matches;
}