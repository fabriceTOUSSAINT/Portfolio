import React from 'react'
import { Link } from 'react-router-dom';
const TopNav = ({toggleFlexNavState, isFlexNavClose}) => {

  return (
    <div className="top-nav-container">
      <ul className="top-nav--items">
        <li>
        <Link to='/About' className="link-item">About</Link>
        </li>
        <li>
        <Link to='/Work' className="link-item">Work</Link>
        </li>
        <li>
        <Link to='/Photography' className="link-item">Photography</Link>
        </li>
        <li>
        <a href="mailto:developer@fabricebt.com" target='_blank' className='link-item'>E-mail</a>
        </li>
      </ul>
    </div>
  )
}

export default TopNav
