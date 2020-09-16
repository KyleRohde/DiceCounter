import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import DiceButton from './DiceButton';
import { dbPut, dbPost } from '../helpers/apiConnections';

class DiceAction extends React.Component {
    constructor(props) {
        super(props);
        this.increment = this.increment.bind(this);
        this.assembleData = this.assembleData.bind(this);

        let historyParse = (this.props.location.state.history).split(',');
        let historyTotal = 0;
        if(historyParse.length === this.props.location.state.faces){
            for (let x in historyParse){
                historyParse[x] = parseInt(historyParse[x], 10);
                historyTotal += historyParse[x];
            }
        } else {
            historyParse = [];
            for(let x = 0; x < this.props.location.state.faces; x++){
                historyParse.push(0);
            }
        }

        this.state = {
            total: historyTotal,
            history: historyParse
        };
    }

    increment(num){
        let plus = this.state.total;
        let newHistory = this.state.history;
        plus++;
        newHistory[num-1]++;
        this.setState({ total: plus, history: newHistory });
    }

    assembleData(){
        let payload = {
            faces: parseInt(this.props.location.state.faces),
            roll_history: this.state.history.join()
        };
        switch(this.props.location.state.apiMethod){
            case "put":
                payload.description = this.props.location.state.description;
                payload.id = this.props.location.state.diceId;
                dbPut("/DiceItems/" + this.props.location.state.diceId, payload);
                break;
            case "post":
                payload.description = "Temp " + this.props.location.state.faces;
                dbPost("/DiceItems", payload);
                break;
            default:
                console.log("Improper API method call");
        }
    }

    render() {
        let buttons = [];
        let maxFaces = this.props.location.state.faces;
        for(let x = 0; x < maxFaces; x++){
            buttons.push(
                <DiceButton key={x+1} num={x+1}
                    total={this.state.total} count={this.state.history[x]} max={maxFaces} increment={this.increment} />
            );
        }

        return (
            <Container fluid>
            <Row>
                <Col xs={8}>
                    {buttons}
                </Col>
                <Col xs={4}>
                    <Link to="/">{this.state.total}</Link>
                </Col>
            </Row>
            <Row>
                <button onClick={this.assembleData}>Save</button>
            </Row>
            </Container>
        );
    }
}

export default DiceAction;