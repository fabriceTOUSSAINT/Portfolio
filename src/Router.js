import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import NavPageWrapper from './modules/NavPageWrapper';
import About from './pages/About';
import Work from './pages/Work';
import Photography from './pages/Photography';

export default (
    <Router>
        <div className="main">
            <NavPageWrapper />
            <Route path='/About' component={About} />
            <Route path='/Work' component={Work} />
            <Route path='/Photography' component={Photography} />
        </div>
    </Router>
);
