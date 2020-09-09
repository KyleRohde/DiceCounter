import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import dbConnection from './helpers/apiConnections.js'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.fetchDice = this.fetchDice.bind(this);

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
        }
    }

    async fetchDice(){
        try {
            const res = await dbConnection.get('/DiceItems');

            let newEntries = [];
            for(let item of res.data){
                let transitionState = {pathname: "/action", state: {faces: item.faces, history: item.roll_History} }
                newEntries.push(<Row>
                    <Col>{item.description}</Col>
                    <Col><Link to={transitionState}>
                        Roll Existing</Link></Col>
                </Row>);
            }

            this.setState({entries: newEntries});
        } catch (e) {
            console.log(e);
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
                <Link to={{pathname: "/action", state: this.state }}>Create New</Link>
                <br />
                <button onClick={this.fetchDice}>View Existing Dice</button>
                <Container>
                    {this.state.entries}
                </Container>
            </React.Fragment>
        );
    }
}

export default Home;