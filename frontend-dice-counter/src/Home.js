import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            faces: 6
        };
    }

    handleChange(event) {
        this.setState({ faces: event.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Dice&#160;Counter</h1>
                <input type="text" value={this.state.faces} onChange={this.handleChange} />
                <Link to={{pathname: "/action", state: {faces: this.state.faces} }}>Action</Link>
            </React.Fragment>
        );
    }
}

export default Home;