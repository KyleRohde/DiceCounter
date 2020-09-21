import React from 'react';
import { Row, Col } from 'reactstrap';

class DiceDetail extends React.Component{
    constructor(props){
        super(props);
        this.dataToParent = this.dataToParent.bind(this);
    }

    dataToParent(){
        let toReturn = this.props.data;
        toReturn.apiMethod = "put";
        this.props.passData(toReturn);
    }

    render(){
        return(
            <Row>
                <Col xs={8} s={6} md={4}>{this.props.data.description}</Col>
                <Col xs={2}>{"d" + this.props.data.faces}</Col>
                <Col xs={2}><button onClick={this.dataToParent}>Select</button></Col>
            </Row>
        );
    }
}

export default DiceDetail;