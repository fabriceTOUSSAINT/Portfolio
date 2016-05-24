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
            <h4>Fabrice Toussaint | </h4>
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
          <ul class="social-nav">
            <li>
              <a href="https://github.com/fabriceTOUSSAINT" target="_blank">
                <i class="fa fa-github" aria-hidden="true"></i></a></li>
            <li><a href="https://twitter.com/fabriceBT" target="_blank">
              <i class="fa fa-twitter" aria-hidden="true"></i></a></li>
            <li><a href="https://instagram.com/croissant__" target="_blank">
              <i class="fa fa-instagram" aria-hidden="true"></i></a></li>
          </ul>
        </div>
      </header>







    );
  }
}
