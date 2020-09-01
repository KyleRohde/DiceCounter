import React from 'react';
import {Col} from 'react-bootstrap';

class DiceButton extends React.Component{
    constructor(props) {
        super(props);
        this.addOne = this.addOne.bind(this);

        this.state = {
            total: this.props.total,
            count: 0
        };
    }

    componentDidUpdate(prevProps, prevState){
        console.log(prevProps, prevState);
    }

    addOne(){
        let plus = this.state.count;
        plus++;
        this.setState({ count: plus });
        this.props.increment();
    }

    render() {
        return (
            <Col md={6} lg={3}>
                <button onClick={this.addOne}>
                    {this.state.count} / {this.props.total}
                </button>
            </Col>
        );
    }
}

export default DiceButton;