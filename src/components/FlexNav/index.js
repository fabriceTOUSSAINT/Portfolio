// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Velocity from 'velocity-animate';
//Images
import logo from '../../assets/images/fab-logo-wht.png'

type State = {
  isFullPageNav: boolean,
  fullPageWrapperHeight: string,
  fullPageLinkPos: Array<mixed>, // {a: {top: 100, left: 45}, b: {...}}
  navKeys: Array<string>
};

type Props = {
  toggleFlexNavState: () => {},
  isFlexNavClose: bool
}

class FlexNav extends React.Component {

  state = {
    isFullPageNav: true,
    fullPageWrapperHeight: '200px',
    fullPageLinkPos:[],
    navKeys: []
  };

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return (nextProps !== this.props) || (nextState !== this.state);
  }

  componentDidMount() {
    //preLoad background images
    const imagePreloadSpans = document.querySelectorAll('.link-item');
    let tempRoot = document.querySelector('#root');
    let imagePreload;

    imagePreloadSpans.forEach((span) => {
      let elem = document.createElement('div');
      elem.setAttribute('height', '1');
      elem.setAttribute('width', '1');
      elem.setAttribute('posittion', 'absolute');
      // This assumes that className will be like 'link-item flex-nav--name'
      imagePreload = span.className.replace('link-item flex-nav--', '');
      elem.className = `flex-nav--bg-${imagePreload}`;
      // $FlowFixMe - This looks like a flow bug below.
      tempRoot.appendChild(elem);
    });
  }

  revealBackgroundOnHover(e: Object) {
    e.preventDefault();
    const class_name = e.target.id;
    const home = document.querySelector('.flex-nav') || {className: ''};

    // Assign classname to the parent tag based off of what link is hovered
    // class determines which background image to display
    switch(class_name) {
      case 'flex-nav--dev':
        home.className = 'flex-nav flex-nav--slide flex-nav--bg-dev';
        break;
      case 'flex-nav--photo':
        home.className = 'flex-nav flex-nav--slide flex-nav--bg-photo';
        break;
      case 'flex-nav--name':
        home.className = 'flex-nav flex-nav--slide flex-nav--bg-name';
        break;
      case 'flex-nav--blog':
        home.className = 'flex-nav flex-nav--slide flex-nav--bg-blog';
        break;
      case 'flex-nav--twitter':
        home.className = 'flex-nav flex-nav--slide flex-nav--bg-twitter';
        break;
      default:
        break;
    };

    //assign sliding action css class to parent wrapper container
    const homePage = document.getElementsByClassName('flex-nav__slider')[0];
    homePage.className += ' flex-nav__slider--slide';
  }

  hideBackgroundOnOff(){
    const homePage = document.getElementsByClassName('flex-nav__slider')[0];
    const home = document.getElementsByClassName('flex-nav')[0];
    home.classList.remove('flex-nav--slide');
    homePage.classList.remove('flex-nav__slider--slide');
  }

  // render <Link /> or <a /> tags attached with needed event functions
  renderLink = (string: string, dest: string, id: string): Object => {
    const linkClass = `link-item ${id}`;
    const renderComponent = /\b(http|https|mailto)/.test(dest) ?
    <a
      href={dest}
      target='_blank'
      id={id}
      className={linkClass}
      onMouseOver={this.revealBackgroundOnHover}
      onMouseLeave={this.hideBackgroundOnOff}
      onClick={this.toggleNavShift}> {string}
    </a> : <Link
             to={dest}
             id={id}
             className={linkClass}
             onMouseOver={this.revealBackgroundOnHover}
             onMouseLeave={this.hideBackgroundOnOff}
             onClick={this.toggleNavShift}> {string}
           </Link>;

    return renderComponent;
  }

  toggleNavShift = (VOID: any, reset: boolean): void => {
    // this.setState({isFullPageNav:false});
    const doNavShiftReset = reset;

    //TODO: use refs here.
    const navLinkItems = document.querySelectorAll('.link-item');
    const homeBlockLine = document.querySelectorAll('.flex-nav__line');
    const imageBackground = document.querySelector('.flex-nav');
    const whiteSlider = document.querySelector('.flex-nav__slider');
    let screenW = window.innerWidth < 1200 ? 1200 : window.innerWidth;
    screenW = screenW + 300;

    const navItems = document.querySelector('.flex-nav__container--wrapper');

    if (this.state.isFullPageNav) {
      homeBlockLine.forEach(line => {
        line.style.backgroundColor = 'rgba(0,0,0,0)';
        // line.style.height = 'inherit';
      });


      this.setState((state) => {
        return {isFullPageNav: false}
      });


      //FIXME: Hack for full slide off screen
      // Velocity(whiteSlider, {width: '0px'});
      whiteSlider.classList.add('open_slider');
      whiteSlider.style.boxShadow= 'rgba(0, 0, 0, 0.4) -3px 0px 20px';
      // Once i figure out exact photos i will use, include their dimension on the image itself
      // pull image name, regex for size and follow this
      // http://stackoverflow.com/questions/21127479/getting-the-height-of-a-background-image-resized-using-background-size-contain
      Velocity(imageBackground, {backgroundPositionX: -screenW}, [0.82, 0, 0.44, 0.93]);
      Velocity(navItems, {translateX: -screenW, translateY: '-50%'}, [0.82, 0, 0.44, 0.93]);
    }

    else if (doNavShiftReset && !this.state.isFullPageNav) {
      this.setState((state) => {
        return {isFullPageNav: true}
      });


      Velocity(imageBackground, {backgroundPositionX: 0}, [0.82, 0, 0.44, 0.93]);
      // Velocity(navItems, {translateX: 0}, [0.82, 0, 0.44, 0.93]);
      whiteSlider.classList.remove('open_slider');


    }

    // set parent state to share.
    this.props.toggleFlexNavState(this.state.isFullPageNav);
  }

  render() {
    const email = this.state.isFullPageNav ? 'developer@fabricebt.com' : 'Email';

    return (
      <div className="flex-nav">
        <div className="flex-nav--left-border">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="flex-nav__container">
          <Link to='/' onClick={() => this.toggleNavShift(null, true)}>
            <img src={logo} onClick={this.toggleNavShift} className="logo" />
          </Link>
          <div className="flex-nav__container--wrapper">
            <h1 className='flex-nav__line'>
              <div className='flex-nav__line--wrapper'>
                <span>Hello, I'm </span>
                {this.renderLink('Fabrice.', '/About','flex-nav--name')}
              </div>
            </h1>
            <h1 className='flex-nav__line'>
              <div className='flex-nav__line--wrapper'>
                <span>I'm A </span>
                {this.renderLink('Developer', '/Work','flex-nav--dev')}
                <span> & </span>
                {this.renderLink('Photographer.', '/Photography','flex-nav--photo')}
              </div>
            </h1>
            <h1 className='flex-nav__line'>
              <div className='flex-nav__line--wrapper'>
                <span>Read my </span>
                {this.renderLink('Thoughts', '/Blog','flex-nav--blog')}
                <span> & </span>
                {this.renderLink('Tweets.', 'https://twitter.com/fabriceBT','flex-nav--twitter')}
              </div>
            </h1>
            <h1 className='flex-nav__line'>
              <div className='flex-nav__line--wrapper'>
                <span>Lets create, </span>
                {this.renderLink(email, 'mailto:developer@fabricebt.com','flex-nav--email')}
              </div>
            </h1>
          </div>
          <div className="flex-nav__slider"></div>
        </div>
      </div>
    );
  }
}

export default FlexNav;
