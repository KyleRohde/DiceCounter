import React, { useState, useEffect } from 'react';
import { Col } from 'reactstrap';

const DiceButton = (props) => {
    const [percent, setPercent] = useState(0.0);
    const [color, setColor] = useState("#dddddd66");

    useEffect(() => {
        colorize();
    }, [props.count, props.total]);
    
    const colorize = () => {
        let newPercent = ((props.count / props.total) * 100).toFixed(2);

        // Calculate colors based on whether the number has been rolled more or less than average
        let skew = ((props.count / props.total) / (1 / props.max)).toFixed(2);
        let g = Math.trunc(200 * (1 - Math.abs(skew - 1)));
        let r = skew < 1 ? Math.trunc(500 * (1 - skew)) : 0;
        let b = skew > 1 ? Math.trunc(500 * (skew - 1)) : 0;

        // Impose bounds for hex colors
        g = g > 255 ? 255 : (g < 0 ? 0 : g);
        r = r > 255 ? 255 : (r < 0 ? 0 : r);
        b = b > 255 ? 255 : (b < 0 ? 0 : b);

        let newColor = "#" + ("0" + r.toString(16)).slice(-2) +
            ("0" + g.toString(16)).slice(-2) +
            ("0" + b.toString(16)).slice(-2) + "66";

        setColor(newColor);
        setPercent(newPercent);
    }

    const addOne = () => {
        props.increment(props.num);
    }

    return (
        <Col>
            <button onClick={addOne} style={{background: color, width: '100%'}}>
                <p>{props.num}</p>
                <p>{percent}%</p>
            </button>
        </Col>
    );
}

export default DiceButton;