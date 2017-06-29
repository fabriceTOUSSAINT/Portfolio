// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Velocity from 'velocity-animate';

//Images
import logo from '../../assets/images/fab-logo-wht.png'

type State = {
  isFullPageNav: boolean,
  fullPageWrapperHeight: string,
  fpLinkPos: Array<mixed>, // {a: {top: 100, left: 45}, b: {...}}
};

class FlexNav extends React.Component {
  state = {
    isFullPageNav: true,
    fullPageWrapperHeight: '200px',
    fullPageLinkPos:[]
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

  dressNavPosition = (navLinkItems: Object): void => {
      // Transform menu items
      const navLines = document.querySelectorAll('.flex-nav__line span');
      const homeBlockLine = document.querySelector('.flex-nav__line');
      const homeBlockWrapperHeight = document.querySelector('.flex-nav__container--wrapper') || {offsetHeight: 0};
      const keepHBWHeight = `${homeBlockWrapperHeight.offsetHeight}px`;

      let containerHeight = `${navLinkItems[0].parentElement.parentElement.offsetHeight}px`;
      navLinkItems[0].parentElement.parentElement.style.height = containerHeight;

      let flexNavLinks = [];

      // convert link text to stand alone in the current position it is in
      for (let index = navLines.length - 1; index >= 0; index--) {
        let top = `${navLinkItems[index].offsetTop + 2}px`; //
        let left = `${navLinkItems[index].offsetLeft}px`;

        flexNavLinks[navLinkItems[index].id] = {top: top, left: left};

        // dress new nav text
        navLinkItems[index].style.left = left;
        navLinkItems[index].style.top = top;
        // navLinkItems[index].style.position = 'absolute';
        // navLinkItems[index].style.color = '#141414';
        // navLinkItems[index].style.fontSize = '22px';
        // navLinkItems[index].style.textDecoration = 'none';
      }
      //$FlowFixMe
      homeBlockLine.style.display = 'block';
      //$FlowFixMe
      homeBlockWrapperHeight.style.height = keepHBWHeight;

      this.setState({
        fullPageWrapperHeight: keepHBWHeight,
        fullPageLinkPos: flexNavLinks
      });

      // begin hiding unimporntant text, once it dissapears then we'll remove it from DOM
      navLines.forEach((span) => {
        span.id = 'dissapear';
        span.style.opacity = '0'; //Hide unimportant text
        // setTimeout(() => {span.style.display = 'none'}, 0);
      });
      // debugger;

      const revNodeList = [].slice.call(navLines, 0).reverse();
      // debugger;
      revNodeList.forEach((span, index) => {
        // debugger;
        const linkSize = document.querySelectorAll('#dissapear').length - 1;
        navLinkItems[(linkSize - index)].style.position = 'absolute';
        span.style.display = 'none';
      })

      // let spanHide = document.querySelectorAll('#dissapear');
      // const spanLength = spanHide.length;
      // spanHide.forEach((span, index) => {
      //   debugger;
      //   navLinkItems[index].style.position = 'absolute';
      //   span.style.display = 'none';
      // });

      navLinkItems.forEach((nav, index) => {
        nav.classList.add('link-item--shift');
        let sideTopDist = `${35 * (index + 1) + 100}px`;
        nav.style.left = '20px';
        nav.style.top = sideTopDist;
      });
  }

  toggleNavShift = (e: Object, reset: boolean): void => {
    // this.setState({isFullPageNav:false});
    const doNavShiftReset = reset;
    const navLinkItems = document.querySelectorAll('.link-item');
    const homeBlockLine = document.querySelectorAll('.flex-nav__line');
    const imageBackground = document.querySelector('.flex-nav');
    const whiteSlider = document.querySelector('.flex-nav__slider');
    const screenW = window.innerWidth < 1200 ? 1200 : window.innerWidth;

    if (this.state.isFullPageNav) {
      homeBlockLine.forEach(line => {
        console.log(line);
        line.style.backgroundColor = 'rgba(0,0,0,0)';
        line.style.height = 'inherit';
      });

      this.dressNavPosition(navLinkItems);

      this.setState((state) => {
        return {isFullPageNav: false}
      });

      //FIXME: Hack for full slide off screen
      Velocity(whiteSlider, {width: '200px'});
      // Once i figure out exact photos i will use, include their dimension on the image itself
      // pull image name, regex for size and follow this
      // http://stackoverflow.com/questions/21127479/getting-the-height-of-a-background-image-resized-using-background-size-contain
      Velocity(imageBackground, {backgroundPositionX: -screenW}, [0.82, 0, 0.44, 0.93]);
    }

    else if (doNavShiftReset && !this.state.isFullPageNav) {
      Velocity(imageBackground, {backgroundPositionX: 'initial'}, [0.82, 0, 0.44, 0.93]);
      Velocity(whiteSlider, {width: 'initial'});

    }

  }

  render() {
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
          <Link to='/'>
            <img src={logo} onClick={this.toggleNavShift} className="logo" />
          </Link>
          <div className="flex-nav__container--wrapper">
            <h1 className='flex-nav__line'>
              <span>Hello, I'm </span>
              {this.renderLink('Fabrice.', '/About','flex-nav--name')}
            </h1>
            <h1 className='flex-nav__line'>
              <span>I'm A </span>
              {this.renderLink('Developer', '/Work','flex-nav--dev')}
              <span> & </span>
              {this.renderLink('Photographer.', '/Photography','flex-nav--photo')}
            </h1>
            <h1 className='flex-nav__line'>
              <span>Read my </span>
              {this.renderLink('Thoughts', '/Blog','flex-nav--blog')}
              <span> & </span>
              {this.renderLink('Tweets.', 'https://twitter.com/fabriceBT','flex-nav--twitter')}
            </h1>
            <h1 className='flex-nav__line'>
              <span>Lets Create, </span>
              {this.renderLink('developer@fabricebt.com', 'mailto:developer@fabricebt.com','flex-nav--email')}
            </h1>
          </div>
          <div className="flex-nav__slider"></div>
        </div>
      </div>
    );
  }
}

export default FlexNav;
