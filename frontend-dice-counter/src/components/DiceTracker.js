import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import DiceButton from './DiceButton';
import { dbPut, dbPost } from '../helpers/apiConnections';

class DiceTracker extends React.Component {
    constructor(props) {
        super(props);
        this.increment = this.increment.bind(this);
        this.assembleData = this.assembleData.bind(this);

        let historyParse = (this.props.roll_History).split(',');
        let historyTotal = 0;
        if(historyParse.length === this.props.faces){
            for (let x in historyParse){
                historyParse[x] = parseInt(historyParse[x], 10);
                historyTotal += historyParse[x];
            }
        } else {
            historyParse = [];
            for(let x = 0; x < this.props.faces; x++){
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
            faces: parseInt(this.props.faces),
            roll_history: this.state.history.join()
        };
        switch(this.props.apiMethod){
            case "put":
                payload.description = this.props.description;
                payload.id = this.props.diceId;
                dbPut("/DiceItems/" + this.props.diceId, payload);
                break;
            case "post":
                payload.description = "Temp " + this.props.faces;
                dbPost("/DiceItems", payload);
                break;
            default:
                console.log("Improper API method call");
        }
    }

    render() {
        let buttons = [];
        let maxFaces = this.props.faces;
        for(let x = 0; x < maxFaces; x++){
            buttons.push(
                <DiceButton key={x+1} num={x+1}
                    total={this.state.total} count={this.state.history[x]} max={maxFaces} increment={this.increment} />
            );
        }

        return (
            <Container>
                <Row>
                    {this.props.description}
                </Row>
                <Row>
                    <Col xs={10}>
                        <Row xs={2} md={this.props.faces/2}>{buttons}</Row>
                    </Col>
                    <Col xs={2}>
                        <Link to="/">{this.state.total}</Link>
                        <button onClick={this.assembleData}>Save</button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DiceTracker;