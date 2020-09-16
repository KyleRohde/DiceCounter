import React from 'react';
import {Link} from 'react-router-dom';
import DiceFetcher from '../components/DiceFetcher.js';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.dataHandler = this.dataHandler.bind(this);

        this.state = {
            faces: 6,
            history: "",
            entries: []
        };
    }

    handleChange(event) {
        switch(event.target.id){
            case "faces":
                this.setState({ faces: event.target.value });
                break;
            case "history":
                this.setState({ history: event.target.value });
                break;
            default:
        };
    }

    dataHandler(data){
        console.log(data);
    }

    render() {
        let transitionState = this.state;
        transitionState.apiMethod = "post";

        return (
            <React.Fragment>
                <h1>Dice&#160;Counter</h1>
                <label htmlFor="faces">Faces:&#160;</label>
                <input id="faces" type="text" value={this.state.faces} onChange={this.handleChange} />
                <br />
                <label htmlFor="history">Previous rolls by face (CSV, low - high):&#160;</label>
                <input id="history" type="text" value={this.state.history} onChange={this.handleChange} />
                <br />
                <Link to={{pathname: "/action", state: transitionState }}>Create New From Above Fields</Link>
                <br /><br />
                <DiceFetcher passData={this.dataHandler}/>
            </React.Fragment>
        );
    }
}

export default Home;