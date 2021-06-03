import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { dbGet } from '../helpers/apiConnections.js';
import DiceDetail from './DiceDetail.js';

const DiceFetcher = (props) => {
    const [entries, setEntries] = useState([]);

    const fetchDice = async () => {
        let res = await dbGet('/DiceItem');
        let newEntries = [];

        for(let itemElem in res.data){
            newEntries.push(
                <DiceDetail key={"Detail " + itemElem} onSelect={props.dataHandler} 
                    data={res.data[itemElem]} />);
        }
        
        setEntries(newEntries);
    }

    return(
        <React.Fragment>
            <button onClick={fetchDice}>View Existing Dice</button>
            <Container>
                {entries}
            </Container>
        </React.Fragment>
    );
}

export default DiceFetcher;