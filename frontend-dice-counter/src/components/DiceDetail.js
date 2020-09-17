import React from 'react';
import { Row, Col } from 'reactstrap';

class DiceDetail extends React.Component{
    constructor(props){
        super(props);
        this.dataToParent = this.dataToParent.bind(this);
    }

    dataToParent(data){
        this.props.passData(this.props.data);
    }

    render(){
        return(
            <Row>
                <Col>{this.props.data.description}</Col>
                <Col><button onClick={this.dataToParent}>Select</button></Col>
            </Row>
        );
    }
}

export default DiceDetail;