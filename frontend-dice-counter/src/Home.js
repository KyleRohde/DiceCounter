import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import { dbGet } from './helpers/apiConnections.js'

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
            let res = await dbGet('/DiceItems');
            let newEntries = [];
            for(let itemElem in res.data){
                let transitionState = {
                    pathname: "/action",
                    state: {
                        faces: res.data[itemElem].faces,
                        history: res.data[itemElem].roll_History,
                        diceId: res.data[itemElem].id,
                        description: res.data[itemElem].description,
                        apiMethod: "put"
                    }
                }
                newEntries.push(<Row key={itemElem}>
                    <Col>{res.data[itemElem].description}</Col>
                    <Col><Link to={transitionState}>Roll Existing</Link></Col>
                </Row>);
            }

            this.setState({entries: newEntries});
        } catch (e) {
            console.log(e);
        }
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
                <button onClick={this.fetchDice}>View Existing Dice</button>
                <Container>
                    {this.state.entries}
                </Container>
            </React.Fragment>
        );
    }
}

export default Home;