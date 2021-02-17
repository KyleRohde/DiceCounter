import React, { useState } from 'react';

import DiceFetcher from '../components/DiceFetcher.js';

const Home = (props) => {
    const [faces, setFaces] = useState(6);
    const [rollHistory, setRollHistory] = useState("");

    const handleFaceChange = (e) => {
        setFaces(e.target.value);
    }

    const handleHistoryChange = (e) => {
        setRollHistory(e.target.value);
    }

    const handleNewDie = () => {
        props.history.push({
            pathname: '/Action',
            state: {
                faces: faces,
                rollHistory: rollHistory,
                apiMethod: "post"
            }
        });
    }

    const handleExistingDie = (data) => {
        props.history.push({
            pathname: '/Action',
            state: { ...data, apiMethod: "put" }
        });
    }

    return (
        <>
            <h1>Dice&nbsp;Counter</h1>
            <label htmlFor="faces">
                Faces:&nbsp;
            </label>
            <input id="faces" type="text" value={faces}
                onChange={(e) => handleFaceChange(e)}
            />
            <br />
            <label htmlFor="history">
                Previous rolls:&nbsp;
            </label>
            <input id="history" type="text" value={rollHistory}
                onChange={(e) => handleHistoryChange(e)}
            />
            <br />
            <button onClick={handleNewDie}>
                Create New
            </button>
            <br /><br />
            <DiceFetcher dataHandler={handleExistingDie} />
        </>
    );
}

export default Home;