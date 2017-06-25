import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Velocity from 'velocity-animate';

//Images
import logo from '../../assets/images/fab-logo-wht.png'

class Home extends React.Component {
  state = {
    onHome: true
  };

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
      imagePreload = span.classList.value.replace('link-item home--block__', '');
      elem.className = `home-${imagePreload}`;
      tempRoot.appendChild(elem);
    });
  }

  handleClick = (e) => {
    const whiteSlider = document.getElementsByClassName('home--block__slider')[0];
    const imageBackground = document.getElementsByClassName('home')[0];
    const fullNav = document.getElementsByClassName('home--block--wrapper')[0];
    const pageNav = document.getElementsByClassName('home--block--offHome')[0];

    const linkItems = document.getElementsByClassName('link-item');
    const Fabrice = document.getElementsByClassName('home--block__name')[0];
    const fadeItems = document.querySelectorAll('.home--block--wrapper span');
    for (let x = 0; x < fadeItems.length; x++) {
      fadeItems[x].style.opacity = '0';
      setTimeout(() => {
        fadeItems[x].style.display = 'none';
      }, 2000);
    };
    debugger;
    Fabrice.style.display = 'block';
    Fabrice.style.
    Velocity(Fabrice, {
      translateX: '20px',
    }, [0.82, 0, 0.44, 0.93])
    // debugger;

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

  revealBackgroundOnHover(e) {
    const class_name = e.target.id;
    const home = document.querySelector('.home');

    // Assign classname to the parent tag based off of what link is hovered
    // class determines which background image to display
    switch(class_name) {
      case 'home--block__dev':
        home.className = 'home home-slide home-dev';
        break;
      case 'home--block__photo':
        home.className = 'home home-slide home-photo';
        break;
      case 'home--block__name':
        home.className = 'home home-slide home-name';
        break;
      case 'home--block__blog':
        home.className = 'home home-slide home-blog';
        break;
      case 'home--block__twitter':
        home.className = 'home home-slide home-twitter';
        break;
      default:
        break;
    };

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

  // render <Link /> or <a /> tags attached with needed event functions
  renderLink = (string, dest, id) => {
    const linkClass = `link-item ${id}`;
    const renderComponent = /\b(http|https|mailto)/.test(dest) ?
    <a
      href={dest}
      target='_blank'
      id={id}
      className={linkClass}
      onMouseOver={this.revealBackgroundOnHover}
      onMouseLeave={this.hideBackgroundOnOff}
      onClick={this.clickSlideNavtoPageNav}> {string}
    </a> : <Link
             to={dest}
             id={id}
             className={linkClass}
             onMouseOver={this.revealBackgroundOnHover}
             onMouseLeave={this.hideBackgroundOnOff}
             onClick={this.clickSlideNavtoPageNav}> {string}
           </Link>;

    return renderComponent;
  }

  clickSlideNavtoPageNav = (e) => {
    this.setState({onHome:false});

    // Transform BG Slider
    const imageBackground = document.querySelector('.home');
    const whiteSlider = document.querySelector('.home--block__slider');
    let screenW = window.innerWidth;

    //FIXME: Hack for full slide off screen
    if(screenW < 1200) {screenW = 1200;}
    Velocity(whiteSlider, {width: '200px'});
    // Once i figure out exact photos i will use, include their dimension on the image itself
    // pull image name, regex for size and follow this
    // http://stackoverflow.com/questions/21127479/getting-the-height-of-a-background-image-resized-using-background-size-contain
    Velocity(imageBackground, {backgroundPositionX: -screenW}, [0.82, 0, 0.44, 0.93]);

    // Transform menu itmes
    const navLines = document.querySelectorAll('.home--block__line span');
    const navLinkItems = document.querySelectorAll('.home--block__line .link-item');
    const homeBlockLine = document.querySelector('.home--block__line');
    const homeBlockWrapperHeight = document.querySelector('.home--block--wrapper');
    const keepHBWHeight = `${homeBlockWrapperHeight.offsetHeight}px`;

    function offset(el) {
      debugger;
      // FIXME: NEED to find correct logic to set Link element height to prepeare for animation to second nav
      const parentElOffsetHeight = el.parentElement.parentElement.offsetTop;
        var rect = el.getBoundingClientRect(),
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return rect.top + scrollTop + parentElOffsetHeight
    }

    navLines.forEach((span, index) => {
      let top = `${offset(navLinkItems[index])}px`;
      let left = `${navLinkItems[index].offsetLeft}px`;
      console.log(offset(navLinkItems[index]), '<====top');

      span.style.opacity = '0'; //Hide unimportant text
      // console.log(offset(navLinkItems[index]));
      // debugger;

      // dress new nav text
      navLinkItems[index].style.left = left;
      navLinkItems[index].style.top = top;
      navLinkItems[index].style.position = 'absolute';
      navLinkItems[index].style.color = '#141414';
      navLinkItems[index].style.fontSize = '22px';
      navLinkItems[index].style.textDecoration = 'none';

      homeBlockLine.style.display = 'block';
      span.style.display = 'none';
      homeBlockWrapperHeight.style.height = keepHBWHeight;
      // debugger;
    })

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
            <h1 className='home--block__line'>
              <span>Hello, I'm </span>
              {this.renderLink('Fabrice.', '/About', 'home--block__name')}
            </h1>
            <h1 className='home--block__line'>
              <span>I'm A </span>
              {this.renderLink('Developer', '/Work', 'home--block__dev')}
              <span> & </span>
              {this.renderLink('Photographer.', '/Photography', 'home--block__photo')}
            </h1>
            <h1 className='home--block__line'>
              <span>Read my </span>
              {this.renderLink('Thoughts', '/Blog', 'home--block__blog')}
              <span> & </span>
              {this.renderLink('Tweets.', 'https://twitter.com/fabriceBT', 'home--block__twitter')}
            </h1>
            <h1 className='home--block__line'>
              <span>Lets Create, </span>
              {this.renderLink('developer@fabricebt.com', 'mailto:developer@fabricebt.com', 'home--block__email')}
            </h1>
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
