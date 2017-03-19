import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Home from './modules/Home/Home.js';
import About from './modules/About';
import Work from './modules/Work';
import Photography from './modules/Photography';

export default (
    <Router>
      <div className="main">
          <Home />
          {/* <Route path='/' component={Home}> */}
          <Route path='/About' component={About} />
          <Route path='/Work' component={Work} />
          <Route path='/Photography' component={Photography} />
        {/* </Route> */}
      </div>
    </Router>
);
