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
      onHome: true //default
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const whiteSlider = document.getElementsByClassName('home--block__slider')[0];
    const imageBackground = document.getElementsByClassName('home')[0];
    const fullNav = document.getElementsByClassName('home--block--wrapper')[0];
    const pageNav = document.getElementsByClassName('home--block--offHome')[0];

    const linkItems = document.getElementsByClassName('link-item');
    const Fabrice = document.getElementsByClassName('home--block__name')[0];
    Fabrice.style.display = 'block';
    Velocity(Fabrice, {
      translateX: '1500px',
    }, [0.82, 0, 0.44, 0.93])
    // debugger;

    const fadeItems = document.querySelectorAll('.home--block--wrapper span');
    for (let x = 0; x < fadeItems.length; x++) {
      fadeItems[x].style.opacity = '0';
    };
    // Velocity(fullNav, {
    //   translateX: '-1500px',
    // }, [0.82, 0, 0.44, 0.93]);
    this.setState({onHome:false});
    let screenW = window.innerWidth;
    //FIXME: Hack for full slide off screen
    if(screenW < 1200) {screenW = 1200;}
    // debugger;
    Velocity(whiteSlider, {width: '200px'});
    // Once i figure out exact photos i will use, include their dimension on the image itself
    // pull image name, regex for size and follow this
    // http://stackoverflow.com/questions/21127479/getting-the-height-of-a-background-image-resized-using-background-size-contain
    Velocity(imageBackground, {backgroundPositionX: -screenW}, [0.82, 0, 0.44, 0.93]);
    // Velocity(fullNav,{
    //   // translateX:'-1500',
    //   translateX:'-20',
    // }, [0.82, 0, 0.44, 0.93]);
    Velocity(pageNav, {
      opacity: '1',
    });

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

  renderLink = (string, linkClass, dest) => {
    return <Link
      to={dest}
      className={linkClass}
      onMouseOver={this.revealBackgroundOnHover}
      onMouseLeave={this.hideBackgroundOnOff}
      onClick={this.handleClick}> {string}
    </Link>;
  }

  render() {
    return (
      <div className="home nav-page">
        <div className="home--left nav-page--left-border">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="home--block nav-page__main">
          <Link to='/'>
            <img src={logo} className="logo" />
          </Link>
          <div className="home--block--wrapper nav-page__main-wrapper">
            <h1>
              <span>Hello, I'm </span>
              {this.renderLink('Fabrice.', 'link-item home--block__name', '/About')}
            </h1>
            <br/>
            <h1>
              <span>I'm A </span>
              {this.renderLink('Developer', 'link-item home--block__dev', '/Work')}
              <span>&</span>
              {this.renderLink('Photographer.', 'link-item home--block__photo', '/Photography')}
            </h1>
            <br/>
            <h1>
              <span>Read my </span>
              {this.renderLink('Thoughts', 'link-item home--block__blog', '/Blog')}
              <span>&</span>
              <a href="https://twitter.com/fabriceBT" target="_blank" className="link-item home--block__twitter"
                onMouseOver={this.revealBackgroundOnHover}
                onMouseLeave={this.hideBackgroundOnOff}
                onClick={this.handleClick}>Tweets.</a>
            </h1>
            <br/>
            <h1>
              <span>Lets Create, </span>
              <a href='mailto:developer@fabricebt.com' className="link-item home--block__email">developer@fabricebt.com</a>
            </h1>
            <br/>
          </div>
          <div className="home--block--offHome">
            <Link to='/About'>About</Link>
            <Link to='/Work'>Developer</Link>
            <Link to='/Photography'>Photographer</Link>
            <Link to='/Blog'>Blog</Link>
            <a href='mailto:developer@fabricebt.com' className='link-item home--block--mobile__email'>Email</a>
          </div>
          <div className="home--block__slider"></div>
        </div>
      </div>
    );
  }
}

export default Home;
