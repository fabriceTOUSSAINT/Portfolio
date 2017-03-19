import React, { Component } from 'react';
import {Link} from 'react-router-dom';

//Images
import logo from '../../images/fab-logo-wht.png'

class Home extends React.Component {
  constructor(props){
    super(props);

    this.shiftPageHover = this.shiftPageHover.bind(this);
    this.shiftPageLeave = this.shiftPageLeave.bind(this);

    this.state = {
      pageRendered: false
    }
  }

  componentDidMount() {
    this.setState({pageRendered: true});
  }
  shiftPageHover(e){
    if(this.state.pageRendered) {
      const tag = e.target.className;
      const home = document.getElementsByClassName('home')[0];

      if(tag == 'home--block__dev') { home.className = 'home home-slide home-dev' }
      else if(tag == 'home--block__photo') { home.className = 'home home-slide home-photo' }
      else if(tag == 'home--block__name') { home.className = 'home home-slide home-name' }
      else if(tag == 'home--block__blog') { home.className = 'home home-slide home-blog' }
      else if(tag == 'home--block__twitter') { home.className = 'home home-slide home-twitter' }
      // else if(tag = 'home--block__dev') { home.className += ' home-dev' }

      // debugger;
      // debugger;
      const homePage = document.getElementsByClassName('home--block__slider')[0];
      homePage.className += ' home--block__slider--slide';
    }
    // homePage.className = 'shiftPage';
    // debugger;
  }
  shiftPageLeave(){
    if(this.state.pageRendered){
      const homePage = document.getElementsByClassName('home--block__slider')[0];
      const home = document.getElementsByClassName('home')[0];
      home.classList.remove('home-slide');
      homePage.classList.remove('home--block__slider--slide');
    }
    // homePage.className = '';
  }

  render() {
    return (
      <div className="home">
        <div className="home--left">
          <div className="home--left__block1" />
          <div className="home--left__block2" />
          <div className="home--left__block3" />
          <div className="home--left__block4" />
          <div className="home--left__block5" />
        </div>
        <div className="home--block">
          <img src={logo} className="logo" />
          <div className="home--block--wrapper">
            <h1>Hello, I'm <Link to='/About'
              className="home--block__name"
              onMouseOver={this.shiftPageHover}
              onMouseLeave={this.shiftPageLeave}> Fabrice.</Link>
          </h1><br/>
            <h1>I'm A <Link to='/Work'
              className="home--block__dev"
              onMouseOver={this.shiftPageHover}
              onMouseLeave={this.shiftPageLeave}> Developer</Link> & <Link to='/Photography' className="home--block__photo"
              onMouseOver={this.shiftPageHover}
              onMouseLeave={this.shiftPageLeave}> Photographer.</Link>
            </h1><br/>
            <h1>Read my <Link to='/Blog' className="home--block__blog"
            onMouseOver={this.shiftPageHover}
            onMouseLeave={this.shiftPageLeave}> Thoughts</Link> & <a href="https://twitter.com/fabriceBT" target="_blank" className="home--block__twitter"
            onMouseOver={this.shiftPageHover}
            onMouseLeave={this.shiftPageLeave}>Tweets.</a>
            </h1><br/>
            <h1>Lets Create, <a href='mailto:developer@fabricebt.com' className="home--block__email">developer@fabricebt.com</a></h1><br/>
          </div>
          <div className="home--block__slider"></div>
        </div>
      </div>
    );
  }
}

export default Home;
