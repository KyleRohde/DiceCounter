import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './Home';
import Action from './Action';

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/action" component={Action} />
            </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
