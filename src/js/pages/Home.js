import React from "react";
//import Works from "../components/layout/Works";

export default class Home extends React.Component{
  render(){
    console.log("Home");
    return(
      <div className="hero">
       <img  src="images/ftLogo.png" alt="Logo" />
       <div className="info">
           <span> DEVELOPER | PHOTOGRAPHER | EXPLORER</span>
       </div>
    </div>
    //  <Works />
    );
  }
}
