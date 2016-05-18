import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component{
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const homeClass = location.pathname === "/" ? "active" : "";
    const workClass = location.pathname.match(/^\/work/) ? "active" : "";
    const aboutClass = location.pathname.match(/^\/about/) ? "active" : "";
    const blogClass = location.pathname.match(/^\/blog/) ? "active" : "";
    const contactClass = location.pathname.match(/^\/contact/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <header class="navigation" role="banner">
        <div class="navigation-wrapper">
          <a href="javascript:void(0)" class="logo">
            <img src="https://raw.githubusercontent.com/thoughtbot/refills/49db8c0f2f8066c2c3a275781503fe3303a1a9fc/source/images/placeholder.png" alt="Logo Image" />
          </a>
          <a href="javascript:void(0)" class="navigation-menu-button" id="js-mobile-menu">MENU</a>
          <nav role="navigation">
            <ul id="js-navigation-menu" class="navigation-menu show">
              <li class={homeClass}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
              </li>
              <li class={workClass}>
                <Link to="work" onClick={this.toggleCollapse.bind(this)}>Work</Link>
              </li>
              <li class={aboutClass}>
                <Link to="about" onClick={this.toggleCollapse.bind(this)}>About</Link>
              </li>
              <li class={blogClass}>
                <Link to="blog" onClick={this.toggleCollapse.bind(this)}>Blog</Link>
              </li>
              <li class={contactClass}>
                <Link to="contact" onClick={this.toggleCollapse.bind(this)}>Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header> 





      // <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      //   <div class="container">
      //     <div class="navbar-header">
      //       <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
      //         <span class="sr-only">Toggle navigation</span>
      //         <span class="icon-bar"></span>
      //         <span class="icon-bar"></span>
      //         <span class="icon-bar"></span>
      //       </button>
      //     </div>
      //     <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
      //       <ul class="nav navbar-nav">
      //         <li class={homeClass}>
      //           <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
      //         </li>
      //         <li class={workClass}>
      //           <Link to="work" onClick={this.toggleCollapse.bind(this)}>Work</Link>
      //         </li>
      //         <li class={aboutClass}>
      //           <Link to="about" onClick={this.toggleCollapse.bind(this)}>About</Link>
      //         </li>
      //         <li class={blogClass}>
      //           <Link to="blog" onClick={this.toggleCollapse.bind(this)}>Blog</Link>
      //         </li>
      //         <li class={contactClass}>
      //           <Link to="contact" onClick={this.toggleCollapse.bind(this)}>Contact</Link>
      //         </li>
      //       </ul>
      //     </div>
      //   </div>
      // </nav>
    );
  }
}
