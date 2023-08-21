import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { SheetData } from './types/service/SheetData';

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

function App() {

  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    fetchData().then((result) => {
      console.dir(result);
      const gameResults: string[] = [];
      for (const cell of result.table.rows) {

        const date = cell.c[2];

        const player1Name = cell.c[3];
        const player1Commander = cell.c[4];
        const player1Position = cell.c[5];
        const player1Rank = cell.c[6];

        const player2Name = cell.c[7];
        const player2Commander = cell.c[8];
        const player2Position = cell.c[9];
        const player2Rank = cell.c[10];

        const player3Name = cell.c[11];
        const player3Commander = cell.c[12];
        const player3Position = cell.c[13];
        const player3Rank = cell.c[14];

        const player4Name = cell.c[15];
        const player4Commander = cell.c[16];
        const player4Position = cell.c[17];
        const player4Rank = cell.c[18];

        const numberOfTurns = cell.c[19];

        const winnerCommander = cell.c[21];
        const winnerName = cell.c[22];

        if (date !== null && winnerName !== null) {
          gameResults.push(date.f + ": " + winnerName.v);
        }
      }
      if (data.length === 0) {
        setData(gameResults);
      }
    });
  }, []);


  const results = data.map((value, index) =>
    <p key={index}>{value}</p>
  )

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {results}
        </p>
      </header>
    </div>
  );
}

export default App;
