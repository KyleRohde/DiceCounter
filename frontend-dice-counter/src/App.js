import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './pages/homePage';
import Action from './pages/actionPage';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/action" component={Action} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;