import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { SheetData } from './types/service/SheetData';
import { Flex, Heading } from '@chakra-ui/react';
import { sheetRowToMatch } from './types/service/dataMappers';
import { Match } from './types/domain/Match';
import { SortableTable } from './components/SortableTable';
import { matchHistoryColumns } from './components/matchHistory/matchHistoryColumnHelper';

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

  const [data, setData] = useState<Match[]>([]);

  useEffect(() => {
    fetchData().then((result) => {
      console.dir(result);
      const matches: Match[] = [];

      for (let i = 0; i < result.table.rows.length; i++) {
        const cell = result.table.rows[i];
        const match = sheetRowToMatch(cell, i.toString());
        matches.push(match);
      }

      setData(matches);
    });
  }, []);




  return (
    <Flex direction='column' justify='center' align='center'>
      <Heading>Match History</Heading>
      <SortableTable
        columns={matchHistoryColumns}
        data={data}
      />
    </Flex>
  );
}

export default App;
