import React from 'react';
import {Link} from 'react-router-dom';

class Action extends React.Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {
        return (
            <Link to="/">{this.props.location.state.faces}</Link>
        );
    }
}

export default Action;