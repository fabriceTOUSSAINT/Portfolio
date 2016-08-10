import React from "react";
import { Link } from "react-router";
require('../../scss/style.scss');

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";
import Works from "../components/layout/Works";
import About from "../components/layout/About";
import Contact from "../components/layout/Contact";

export default class Home extends React.Component{
  render(){


    return(
    <div>
      <Nav />
      <div className="hero parallax" id="hero" data-parallax="scroll">
         <img  id="hfirst" src="images/fab-logo-wht.png" alt="Logo" />
         <div className="info">
             <span><span  id="hsecond">DEVELOPER |</span> <span  id="hthird">EXPLORER |</span> <span  id="hfourth">PHOTOGRAPHER</span></span>
       </div>
     </div>
     <Works/>
     <About/>
     <Contact/>
     <Footer />
    </div>

    );
  }
}
