import React from 'react';
import DiceTracker from '../components/DiceTracker.js';

class Action extends React.Component {
    constructor(props){
        super(props);
        this.dataHandler = this.dataHandler.bind(this);
    }

    dataHandler(data){
        console.log(data);
    }

    render(){
        return(
            <DiceTracker data={this.props.location.state} />
        );
    }
}

export default Action;