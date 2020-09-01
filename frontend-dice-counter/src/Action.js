import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import DiceButton from './DiceButton';

class Action extends React.Component {
    constructor(props) {
        super(props);
        this.increment = this.increment.bind(this);

        this.state = {
            buttons: [],
            total: 0
        };
    }

    componentDidMount(){
        let newButtons = [];
        for(let x = 0; x < this.props.location.state.faces; x++){
            newButtons.push(
                <DiceButton key={x+1} total={this.state.total} increment={this.increment} />
            );
        }

        this.setState({ buttons: newButtons });
    }

    increment(){
        let plus = this.state.total;
        plus++;
        this.setState({ total: plus }, ()=>{console.log(plus)});
    }

    render() {
        return (
            <Container>
                <Col md={10} lg={12}>
                    <Row>
                        <DiceButton key={0} total={this.state.total} increment={this.increment} />
                        {this.state.buttons}
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