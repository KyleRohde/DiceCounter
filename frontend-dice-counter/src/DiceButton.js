import React from 'react';
import {Col} from 'react-bootstrap';

class DiceButton extends React.Component{
    constructor(props) {
        super(props);
        this.addOne = this.addOne.bind(this);

        this.state = {
            count: 0,
            percent: 0,
            color: "#dddddd66"
        };
    }

    componentDidUpdate(prevProps){
        if(this.props.total && this.props.total !== prevProps.total){
            let num = ((this.state.count / this.props.total) * 100).toFixed(2);

            let skew = ((this.state.count / this.props.total) / (1 / this.props.max)).toFixed(2);
            let g = Math.trunc(255 * (1 - Math.abs(skew - 1))).toString(16);
            let r = skew < 1 ? Math.trunc(400 * (1 - skew)).toString(16) : 0;
            r = r > 255 ? 255 : r;
            let b = skew > 1 ? Math.trunc(400 * (skew - 1)).toString(16) : 0;
            b = b > 255 ? 255 : b;
            let newColor = "#" + ("0" + r).slice(-2) + ("0" + g).slice(-2) + ("0" + b).slice(-2) + "66";

            this.setState({ percent: num, color: newColor });
        }
    }

    addOne(){
        let plus = this.state.count;
        plus++;
        this.setState({ count: plus });
        this.props.increment();
    }

    render() {
        return (
            <Col md={6} xs={3}>
                <button onClick={this.addOne} style={{background: this.state.color}}>
                    <p>{this.props.num}</p>
                    {this.state.percent}%
                </button>
            </Col>
        );
    }
}

export default DiceButton;