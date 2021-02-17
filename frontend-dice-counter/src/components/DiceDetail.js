import React from 'react';
import { Row, Col } from 'reactstrap';

const DiceDetail = (props) => {
    const handleSelect = () => {
        props.onSelect(props.data);
    }

    return(
        <Row>
            <Col xs={8} s={6} md={4}>
                {props.data.description}
            </Col>
            <Col xs={2}>
                {"d" + props.data.faces}
            </Col>
            <Col xs={2}>
                <button onClick={handleSelect}>Select</button>
            </Col>
        </Row>
    );
}

export default DiceDetail;