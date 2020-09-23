import React from 'react';
import DiceFetcher from '../components/DiceFetcher.js';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.dataHandler = this.dataHandler.bind(this);

        this.state = {
            faces: "6",
            roll_History: ""
        };
    }

    handleChange(event) {
        switch(event.target.id){
            case "faces":
                this.setState({ faces: event.target.value });
                break;
            case "history":
                this.setState({ roll_History: event.target.value });
                break;
            default:
        };
    }

    dataHandler(data, origin) {
        if(origin === "new"){
            data.apiMethod = "post";
        }
        else if (origin === "detail") {
            data.apiMethod = "put";
        }

        this.props.history.push({
            pathname: '/Action',
            state: data
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Dice&#160;Counter</h1>
                <label htmlFor="faces">Faces:&#160;</label>
                <input id="faces" type="text" value={this.state.faces} onChange={this.handleChange} />
                <br />
                <label htmlFor="history">Previous rolls by face (CSV, low - high):&#160;</label>
                <input id="history" type="text" value={this.state.roll_History} onChange={this.handleChange} />
                <br />
                <button value="new" onClick={e => this.dataHandler(this.state, e.target.value)}>
                    Create New From Above Fields
                </button>
                <br /><br />
                <DiceFetcher passData={this.dataHandler}/>
            </React.Fragment>
        );
    }
}

export default Home;