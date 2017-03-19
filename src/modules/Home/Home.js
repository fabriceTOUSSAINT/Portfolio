import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Velocity from 'velocity-animate';

//Images
import logo from '../../assets/images/fab-logo-wht.png'

class Home extends React.Component {
  constructor(props){
    super(props);

    // determine if current page is home or not, to properly display the navigation/sidebar
    this.state = {
      homePage: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // e.preventDefault();
    const whiteSlider = document.getElementsByClassName('home--block__slider');
    const imageBackground = document.getElementsByClassName('home')[0];
    let screenW = window.innerWidth;
    //FIXME: Hack for full slide off screen
    if(screenW < 1200) {screenW = 1200;}

    Velocity(whiteSlider, {translateX:'-50%'});
    // Once i figure out exact photos i will use, include their dimension on the image itself
    // pull image name, regex for size and follow this
    // http://stackoverflow.com/questions/21127479/getting-the-height-of-a-background-image-resized-using-background-size-contain
    Velocity(imageBackground, {backgroundPositionX: -screenW}, [0.82, 0, 0.44, 0.93]);

  }

  revealBackgroundOnHover(e){
    const class_name = e.target.className;
    const home = document.getElementsByClassName('home')[0];

    // Assign classname to the parent tag based off of what link is hovered
    // class determines which background image to display
    if(class_name == 'home--block__dev') { home.className = 'home home-slide home-dev' }
    else if(class_name == 'home--block__photo') { home.className = 'home home-slide home-photo' }
    else if(class_name == 'home--block__name') { home.className = 'home home-slide home-name' }
    else if(class_name == 'home--block__blog') { home.className = 'home home-slide home-blog' }
    else if(class_name == 'home--block__twitter') { home.className = 'home home-slide home-twitter' }

    //assign sliding action css class to parent wrapper container
    const homePage = document.getElementsByClassName('home--block__slider')[0];
    homePage.className += ' home--block__slider--slide';
  }

  hideBackgroundOnOff(){
    const homePage = document.getElementsByClassName('home--block__slider')[0];
    const home = document.getElementsByClassName('home')[0];
    home.classList.remove('home-slide');
    homePage.classList.remove('home--block__slider--slide');
  }

  render() {
    console.warn('rerender');
    return (
      <div className="home">
        <div className="home--left">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="home--block">
          <Link to='/'>
            <img src={logo} className="logo" />
          </Link>
          <div className="home--block--wrapper">
            <h1>Hello, I'm <Link
              to='/About'
              className="home--block__name"
              onMouseOver={this.revealBackgroundOnHover}
              onMouseLeave={this.hideBackgroundOnOff}
              onClick={this.handleClick}> Fabrice.
            </Link>
          </h1><br/>
            <h1>I'm A <Link
              to='/Work'
              className="home--block__dev"
              onMouseOver={this.revealBackgroundOnHover}
              onMouseLeave={this.hideBackgroundOnOff}
              onClick={this.handleClick}> Developer
            </Link> & <Link
              to='/Photography'
              className="home--block__photo"
              onMouseOver={this.revealBackgroundOnHover}
              onMouseLeave={this.hideBackgroundOnOff}
              onClick={this.handleClick}> Photographer.</Link>
            </h1>
            <br/>
            <h1>Read my <Link
            to='/Blog'
            className="home--block__blog"
            onMouseOver={this.revealBackgroundOnHover}
            onMouseLeave={this.hideBackgroundOnOff}
            onClick={this.handleClick}> Thoughts</Link> & <a href="https://twitter.com/fabriceBT" target="_blank" className="home--block__twitter"
            onMouseOver={this.revealBackgroundOnHover}
            onMouseLeave={this.hideBackgroundOnOff}
            onClick={this.handleClick}
            onClick={this.handleClick}>Tweets.</a>
            </h1><br/>
            <h1>Lets Create, <a href='mailto:developer@fabricebt.com' className="home--block__email">developer@fabricebt.com</a></h1><br/>
          </div>
          <div className="home--block__slider"></div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Home;
