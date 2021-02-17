import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import DiceTracker from '../components/DiceTracker.js';
import DiceFetcher from '../components/DiceFetcher.js';

const Action = (props) => {
    const [choosing, setChoosing] = useState(false);
    const [activeDiceList, setActiveDiceList] = useState([]);

    useEffect(() => {
        if(props.location.state){
            setActiveDiceList([props.location.state]);
        }
    }, []);

    const dataHandler = (data) => {
        data.apiMethod = "put";
        let tempList = activeDiceList;
        tempList.push(data);

        setChoosing(false);
        setActiveDiceList(tempList);
    }

    return(
        <>
            <Link to="/">Return to Home</Link>
            {activeDiceList.map((data, index) => <DiceTracker key={"Dice" + index} data={data} />)}
            <br />
            <button onClick={() => {setChoosing(true)}}>
                Add Die
            </button>
            <br />
            {choosing &&
                <DiceFetcher dataHandler={dataHandler} />
            }
        </>
    );
}

export default Action;