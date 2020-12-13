import React, {useEffect, useState} from 'react';
import './App.css';
import withListLoading from './components/withListLoading';
import Credits from "./components/Credits";

import About from "./components/About";
import Wrapper from "./components/Wrapper";

const getColumnTitle = (colNum) => {
    const columns = [
        '',
        'Shop',
        'Name',
        'Score',
        'Tweet',
        'Image'
    ];

    return columns[colNum];
};

const parsePieData = (data) => {
    const cells = data.feed.entry;

    const list = [];
    let pie = {};
    for (const cell of cells) {
        // Ignore the header row.
        if (cell.gs$cell.row === '1') {
            continue;
        }

        // Start of a new row.
        if (cell.gs$cell.col === '1') {
            pie = {};
        }

        const value = cell.gs$cell.$t;
        const colName = getColumnTitle(cell.gs$cell.col);

        pie[colName] = value;

        // End of a row.
        if (cell.gs$cell.col === '5') {
            list.push(pie)
        }
    }

    list.sort((a, b) => (a.Score < b.Score) ? 1 : -1);

    return list;
};

function App() {
    const Wrap = withListLoading(Wrapper);

    const [appState, setAppState] = useState({
        loading: false,
        list: null,
    });

    useEffect(() => {
        setAppState({loading: true});

        const apiUrl = `https://spreadsheets.google.com/feeds/cells/1-AS3K-Ods0t9hvD0fTRMDTwN1xEIvx0apymseXc7UWs/1/public/full?alt=json`;
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                const list = parsePieData(data);

                setAppState({loading: false, list});
            });
    }, [setAppState]);


    return (
        <div className='App'>
            <h1>Mairéad's Mince Pie Monitor</h1>
            <Wrap isLoading={appState.loading} list={appState.list}/>
            <About />
            <footer>
                <Credits />
            </footer>
        </div>
    );
}

export default App;

// TODO: twitter card
// TODO: facebook tags
// TODO: best show flex?
// TODO: link style
// TODO: half pies
