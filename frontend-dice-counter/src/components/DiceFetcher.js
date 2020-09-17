import React from 'react';
import { Container } from 'reactstrap';
import { dbGet } from '../helpers/apiConnections.js';
import DiceDetail from './DiceDetail.js';

class DiceFetcher extends React.Component {
    constructor(props) {
        super(props);
        this.fetchDice = this.fetchDice.bind(this);

        this.state = {
            entries: []
        };
    }

    async fetchDice(){
        try {
            let res = await dbGet('/DiceItems');
            let newEntries = [];
            for(let itemElem in res.data){
                newEntries.push(
                    <DiceDetail key={"Detail " + itemElem} passData={this.props.passData} data={res.data[itemElem]} />);
            }
            this.setState({entries: newEntries});
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return(
            <React.Fragment>
                <button onClick={this.fetchDice}>View Existing Dice</button>
                <Container>
                    {this.state.entries}
                </Container>
            </React.Fragment>
        );
    }
}

export default DiceFetcher;