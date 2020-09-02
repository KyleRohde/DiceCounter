import React from 'react';
import {Col} from 'react-bootstrap';

class DiceButton extends React.Component{
    constructor(props) {
        super(props);
        this.addOne = this.addOne.bind(this);
        this.colorize = this.colorize.bind(this);

        this.state = {
            count: this.props.count,
            percent: 0,
            color: "#dddddd66"
        };
    }

    componentDidMount(){
        if(this.props.total){
            this.colorize();
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.total && this.props.total !== prevProps.total){
            this.colorize();
        }
    }
    
    colorize(){
        let num = ((this.state.count / this.props.total) * 100).toFixed(2);

        // Calculate colors based on whether the number has been rolled more or less than average
        let skew = ((this.state.count / this.props.total) / (1 / this.props.max)).toFixed(2);
        let g = Math.trunc(200 * (1 - Math.abs(skew - 1)));
        let r = skew < 1 ? Math.trunc(255 * (1 - skew)) : 0;
        let b = skew > 1 ? Math.trunc(255 * (skew - 1)) : 0;

        // Impose bounds for hex colors
        g = g > 255 ? 255 : (g < 0 ? 0 : g);
        r = r > 255 ? 255 : (r < 0 ? 0 : r);
        b = b > 255 ? 255 : (b < 0 ? 0 : b);

        let newColor = "#" + ("0" + r.toString(16)).slice(-2) +
            ("0" + g.toString(16)).slice(-2) +
            ("0" + b.toString(16)).slice(-2) + "66";

        this.setState({ percent: num, color: newColor });
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