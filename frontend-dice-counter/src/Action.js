import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import DiceButton from './DiceButton';

class Action extends React.Component {
    constructor(props) {
        super(props);
        this.increment = this.increment.bind(this);

        this.state = {
            total: 0
        };
    }

    increment(){
        let plus = this.state.total;
        plus++;
        this.setState({ total: plus }, ()=>{console.log(plus)});
    }

    render() {
        let buttons = [];
        for(let x = 0; x < this.props.location.state.faces; x++){
            buttons.push(
                <DiceButton key={x+1} total={this.state.total} increment={this.increment} />
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
                    <Link to="/">{this.props.location.state.faces}</Link>
                </Col>
            </Container>
        );
    }
}

export default Action;