import axios from "axios";
import { useDispatch } from "react-redux";

import { Match } from "../types/domain/Match";
import { sheetRowToMatch } from "../types/service/dataMappers";
import { StatsAction } from "../redux/stats/statsActions";
import { useEffect } from "react";

const matchHistoryDataEndpoint =
    "https://docs.google.com/spreadsheets/d/1FsjnGp3JPsqAEmlyWlxmYK5pSwGASqfIcDl9HvD-fuk/gviz/tq?gid=1885300192";
// const matchHistorySubmitEndpoint = 'https://docs.google.com/forms/d/e/1FAIpQLScguPsS2TOxaABYLtbCDZ5zPXec2av9AI2kPI2JFwYqmghBYQ/formResponse?&submit=Submit?usp=pp_url&entry.1178471159=2023-09-27&entry.2132042053=player+1+name&entry.961836116=player+1+commander&entry.1252336227=1&entry.147625596=2&entry.840407098=player+2+name&entry.493870522=player+2+commander&entry.898724110=2&entry.531480374=3&entry.2099339267=player+3+name&entry.1961193649=player+3+commnader&entry.87571757=3&entry.807216034=4&entry.575868019=player+4+name&entry.270994715=player+4+commander&entry.153957972=4&entry.652184592=1&entry.2043626966=additional+comments';
// const matchHistorySubmitEndpoint = 'https://docs.google.com/forms/d/e/1FAIpQLScguPsS2TOxaABYLtbCDZ5zPXec2av9AI2kPI2JFwYqmghBYQ/formResponse?usp=pp_url&entry.1178471159=2023-09-05&entry.2132042053=player+1+name&entry.961836116=player+1+commander&entry.1252336227=1&entry.147625596=2&entry.840407098=player+2+name&entry.493870522=player+2+commander&entry.898724110=2&entry.531480374=3&entry.2099339267=player+3+name&entry.1961193649=player+3+commander&entry.87571757=3&entry.807216034=4&entry.575868019=player+4+name&entry.270994715=player+4+commander&entry.153957972=4&entry.652184592=1&entry.2043626966=woiw+comments';
const matchHistorySubmitEndpoint =
    "https://docs.google.com/forms/d/e/1FAIpQLScguPsS2TOxaABYLtbCDZ5zPXec2av9AI2kPI2JFwYqmghBYQ/formResponse";

const useMatchHistory = () => {
    // Do the initial data hydration here
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get<string>(matchHistoryDataEndpoint, {}).then((res) => {
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

function mapObjectoMatches(resultObj: any): Match[] | undefined {
    const matches: Match[] = [];

    if (resultObj.table === undefined || resultObj.table.rows === undefined) {
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

export type MatchSubmissionPlayer = {
    name: string;
    commander: string;
    turnOrder: number;
    rank: number;
};

const submitMatch = async (
    date: Date,
    player1?: MatchSubmissionPlayer,
    player2?: MatchSubmissionPlayer,
    player3?: MatchSubmissionPlayer,
    player4?: MatchSubmissionPlayer,
    turnCount?: number,
    extraNotes?: string
) => {
    var body: { [fieldName: string]: string } = {};
    body["entry.1178471159"] = date.toISOString().split("T")[0];

    if (player1) {
        body["entry.2132042053"] = player1.name;
        body["entry.961836116"] = player1.commander;
        body["entry.1252336227"] = player1.turnOrder.toString();
        body["entry.147625596"] = player1.rank.toString();
    }

    if (player2) {
        body["entry.840407098"] = player2.name;
        body["entry.493870522"] = player2.commander;
        body["entry.898724110"] = player2.turnOrder.toString();
        body["entry.531480374"] = player2.rank.toString();
    }

    if (player3) {
        body["entry.2099339267"] = player3.name;
        body["entry.1961193649"] = player3.commander;
        body["entry.87571757"] = player3.turnOrder.toString();
        body["entry.807216034"] = player3.rank.toString();
    }

    if (player4) {
        body["entry.575868019"] = player4.name;
        body["entry.270994715"] = player4.commander;
        body["entry.153957972"] = player4.turnOrder.toString();
        body["entry.652184592"] = player4.rank.toString();
    }

    body["entry.676929187"] = turnCount !== undefined ? turnCount.toString() : "";

    body["entry.2043626966"] = extraNotes !== undefined ? extraNotes : "";

    // This is all super hacky to begin so bear with me here...
    // We are able to directly submit to the google form via a URL and POST. No auth needed since this a public form.
    // This is pretty fragile because if any of the above fields have their IDs change or are deleted
    // this will result in a 400.

    // TODO: need to figure out why we are running into CORs on local host.
    try {
        await axios
            .post(matchHistorySubmitEndpoint, body, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                withCredentials: false
            })
            .then((res) => {
                console.log(res);
                return true;
            });
    } catch (e) {
        // just assume the data entry was successful
        console.log(e);
        return true;
    }

    return false;
};

export const MatchHistoryService = {
    useMatchHistory,
    submitMatch
};
