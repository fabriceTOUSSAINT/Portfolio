import { Link } from 'react-router-dom';
import React from 'react';

// render <Link /> or <a /> tags attached with needed event functions
export const renderLink = (string: string, dest: string, id: string): Object => {
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
