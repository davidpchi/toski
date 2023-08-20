import React, { useState } from 'react';
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

  fetchData().then((result) => {
    console.dir(result);
    const gameResults: string[] = [];
    for (const cell of result.table.rows) {
      const gameDate = cell.c[2];
      const gameWinner = cell.c[22]
      if (gameDate !== null && gameWinner !== null) {
        gameResults.push(gameDate.f + ": " + gameWinner.v);
      }
    }
    if (data.length === 0) {
      setData(gameResults);
    }
  });

  const results = data.map((value) =>
    <p>{value}</p>
  )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {results}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
