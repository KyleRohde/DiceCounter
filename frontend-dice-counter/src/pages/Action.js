import React from 'react';
import { Link } from 'react-router-dom';
import DiceTracker from '../components/DiceTracker.js';
import DiceFetcher from '../components/DiceFetcher.js';

class Action extends React.Component {
    constructor(props){
        super(props);
        this.dataHandler = this.dataHandler.bind(this);

        this.state = {
            choosing: false,
            dice: [this.props.location.state]
        }
    }

    dataHandler(data, origin){
        data.apiMethod = "put";
        let tempList = this.state.dice;
        tempList.push(data);

        this.setState({
            choosing: false,
            dice: tempList
        });
    }

    render(){
        return(
            <React.Fragment>
                <Link to="/">Return to Home</Link>
                {this.state.dice.map((data, index) => <DiceTracker key={"Dice" + index} data={data} />)}
                <br />
                <button onClick={() => {this.setState({choosing: true})}}>Add Die</button>
                <br />
                {this.state.choosing && <DiceFetcher passData={this.dataHandler} />}
            </React.Fragment>
        );
    }
}

export default Action;