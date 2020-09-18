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
            <DiceTracker diceId={this.props.location.state.diceId}
                roll_History={this.props.location.state.roll_History}
                description={this.props.location.state.description}
                faces={this.props.location.state.faces} />
        );
    }
}

export default Action;