import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

import DiceButton from './DiceButton';
import { dbPut, dbPost } from '../helpers/apiConnections';

const DiceTracker = (props) => {
    const [total, setTotal] = useState(0);
    const [incrementIndex, setIncrementIndex] = useState(-1);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        let historyParse = (props.data.rollHistory).split(',');
        let historyTotal = 0;

        if(historyParse.length === props.data.faces){
            for (let x in historyParse){
                historyParse[x] = parseInt(historyParse[x], 10);
                historyTotal += historyParse[x];
            }
        } else {
            historyParse = [];
            for(let x = 0; x < props.data.faces; x++){
                historyParse.push(0);
            }
        }
        
        setTotal(historyTotal);
        setHistory(historyParse);
    }, []);

    useEffect(() => {
        if(incrementIndex > -1){
            let newTotal = total;
            let newHistory = history;

            newTotal++;
            newHistory[incrementIndex]++;

            setHistory(newHistory);
            setTotal(newTotal);
            setIncrementIndex(-1);
        }
    }, [incrementIndex]);

    const increment = (num) => {
        setIncrementIndex(num - 1);
    }

    const assembleData = () => {
        let payload = {
            faces: parseInt(props.data.faces),
            rollHistory: history.join()
        };
        switch(props.data.apiMethod){
            case "put":
                payload.description = props.data.description;
                payload.id = props.data.id;
                dbPut("/DiceItems/" + props.data.id, payload);
                break;
            case "post":
                payload.description = "Temp " + props.data.faces;
                dbPost("/DiceItems", payload);
                break;
            default:
                console.log("Improper API method call");
        }
    }

    return (
        <Container>
            <Row>
                {props.data.description}
            </Row>
            <Row>
                <Col xs={10}>
                    <Row xs={2} md={4}>
                    {
                        history.map((data, index) => {
                            return(
                                <DiceButton key={"button" + index} num={index+1} total={total} 
                                    count={data} max={props.data.faces} increment={increment} />
                            );
                        })
                    }
                    </Row>
                </Col>
                <Col xs={2}>
                    <p>Total rolls: {total}</p>
                    <button onClick={assembleData}>Save</button>
                </Col>
            </Row>
        </Container>
    );
}

export default DiceTracker;