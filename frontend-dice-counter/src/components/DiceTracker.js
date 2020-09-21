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

        let historyParse = (this.props.data.roll_History).split(',');
        let historyTotal = 0;
        if(historyParse.length === this.props.data.faces){
            for (let x in historyParse){
                historyParse[x] = parseInt(historyParse[x], 10);
                historyTotal += historyParse[x];
            }
        } else {
            historyParse = [];
            for(let x = 0; x < this.props.data.faces; x++){
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
            faces: parseInt(this.props.data.faces),
            roll_history: this.state.history.join()
        };
        switch(this.props.data.apiMethod){
            case "put":
                payload.description = this.props.data.description;
                payload.id = this.props.data.id;
                dbPut("/DiceItems/" + this.props.data.id, payload);
                break;
            case "post":
                payload.description = "Temp " + this.props.data.faces;
                dbPost("/DiceItems", payload);
                break;
            default:
                console.log("Improper API method call");
        }
    }

    render() {
        let buttons = [];
        let maxFaces = this.props.data.faces;
        for(let x = 0; x < maxFaces; x++){
            buttons.push(
                <DiceButton key={x+1} num={x+1}
                    total={this.state.total} count={this.state.history[x]} max={maxFaces} increment={this.increment} />
            );
        }
        const sizing = this.props.data.faces <= 12 ?
            Math.ceil(this.props.data.faces/2) : (this.props.data.faces%4 === 0 ? 4 : 6);

        return (
            <Container>
                <Row>
                    {this.props.data.description}
                </Row>
                <Row>
                    <Col xs={10}>
                        <Row xs={2} md={sizing}>{buttons}</Row>
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