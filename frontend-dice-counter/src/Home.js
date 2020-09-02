import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            faces: 6,
            history: ""
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
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Dice&#160;Counter</h1>
                <label htmlFor="faces">Faces:&#160;</label>
                <input id="faces" type="text" value={this.state.faces} onChange={this.handleChange} />
                <br />
                <label htmlFor="history">Previous rolls by face (CSV, low - high):&#160;</label>
                <input id="history" type="text" value={this.state.history} onChange={this.handleChange} />
                <br />
                <Link to={{pathname: "/action", state: this.state }}>Action</Link>
            </React.Fragment>
        );
    }
}

export default Home;