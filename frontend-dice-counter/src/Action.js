import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import DiceButton from './DiceButton';

class Action extends React.Component {
    constructor(props) {
        super(props);
        this.increment = this.increment.bind(this);

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

    increment(){
        let plus = this.state.total;
        plus++;
        this.setState({ total: plus });
    }

    render() {
        let buttons = [];
        let maxFaces = this.props.location.state.faces
        for(let x = 0; x < maxFaces; x++){
            buttons.push(
                <DiceButton key={x+1} num={x+1} total={this.state.total} count={this.state.history[x]} max={maxFaces} increment={this.increment} />
            );
        }

        return (
            <Container>
                <Col md={10} lg={12}>
                    <Row>
                        {buttons}
                    </Row>
                </Col>
                <Col md={2} lg={12}>
                    <Link to="/">{this.state.total}</Link>
                </Col>
            </Container>
        );
    }
}

export default Action;