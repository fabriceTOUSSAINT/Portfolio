import React, { Component } from 'react';
import {Link} from 'react-router';

class Home extends Component {
  render() {
    return (
      <div className="home--block">
        <h1>Hello,</h1>
        <h1>My name is <Link to='/About'>Fabrice.</Link></h1>
        <h1>I'm A <Link to='/Work'>Developer</Link> & <Link to='/Photography'>Photographer.</Link></h1>
        <h1>Lets Create, <a href='mailto:developer@fabricebt.com'>developer@fabricebt.com</a></h1>
        <h1>Read my <Link to='/Blog'>Thoughts</Link> & <a href="https://twitter.com/fabriceBT" target="_blank">Tweets.</a></h1>
      </div>
    );
  }
}

export default Home;
