import React, { Component } from 'react';
import {Link} from 'react-router';

class Work extends Component {
  render() {
    return (
      <div className="App">
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/About'>About</Link></li>
                <li><Link to='/Work'>Work</Link></li>
                <li><Link to='/Photography'>Photogrphay</Link></li>
            </ul>
        <h1>Work</h1>
      </div>
    );
  }
}

export default Work;