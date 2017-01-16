import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, useRouterHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import { createHistory } from 'history';
require('./scss/style.scss');
const history = useRouterHistory(createHistory)({
  basename: '/'
});

import Home from './js/pages/Home';

const app = document.getElementById('app');

ReactDOM.render(<Home />, app);
