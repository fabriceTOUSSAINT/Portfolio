import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';

import Home from './modules/Home/Home.js';
import About from './modules/About';
import Work from './modules/Work';
import Photography from './modules/Photography';

export default (
    <Router history={browserHistory}>
        <div className="jawn">
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/About'>About</Link></li>
                <li><Link to='/Work'>Work</Link></li>
                <li><Link to='/Photography'>Photogrphay</Link></li>
            </ul>

            <hr/>

            <Route exact path='/' component={Home} />
            <Route path='/About' component={About} />
            <Route path='/Work' component={Work} />
            <Route path='/Photography' component={Photography} />
        </div>
    </Router>
);
