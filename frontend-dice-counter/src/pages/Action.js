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
                history={this.props.location.state.history}
                description={this.props.location.state.description}
                faces={this.props.location.state.faces} />
        );
    }
}

export default Action;