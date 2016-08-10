import React from "react";
import { Link } from "react-router";



var tabList = [
    { 'id': 1, 'num': '1', 'name': 'Treasure Coast CrossFit', 'initials': 'Tt', 'url': '/cc', 'photo': 'images/tc-bg.jpg' },
    { 'id': 2, 'num': '2', 'name': 'Achievements Unlimited', 'initials': 'Au', 'url': '/au', 'photo': 'images/port-bg-au.jpg' },
    { 'id': 3, 'num': '3', 'name': 'Rigquipment Finance', 'initials': 'Rf', 'url': '/ht', 'photo': 'images/rf-bg.jpg' },
    { 'id': 4, 'num': '4','name': 'Photography Portfolio', 'initials': 'Ft', 'url': '/ft', 'photo': 'images/port-square.jpg' }
];

var Tab = React.createClass({
    handleClick: function(e){
        e.preventDefault();
        this.props.handleClick();
    },

    render: function(){
        return (
        	<div className={'pt-button pt-hover wow fadeIn'}>
              <figure>
                <a onClick={this.handleClick} href={this.props.url}>


                <img src={this.props.photo} />

                <div className={'parent'}>
		              <div className={'title'}>
		                  <div className={'pos'}>
			                  <h5>{this.props.num}</h5>
			                  <h1>{this.props.initials}</h1>
			                  <p>{this.props.name}</p>
		              	  </div>
		              </div>
		              </div>
                </a>
          </figure>
        </div>
        );
    }
});


var Tabs = React.createClass({
    handleClick: function(tab){
        this.props.changeTab(tab);
    },

    render: function(){
        return (


<div className={'pt-wrap'}>
                {this.props.tabList.map(function(tab) {
                    return (
                        <Tab
                            handleClick={this.handleClick.bind(this, tab)}
                            key={tab.id}
                            url={tab.url}
                            name={tab.name}
                            isCurrent={(this.props.currentTab === tab.id)}
                            photo={tab.photo}
                            num={tab.num}
                            initials={tab.initials}
                         />
                    );
                }.bind(this))}
</div>
        );
    }
});

var Content = React.createClass({
    render: function(){


        return(
            <div className="content" id="content">

                {this.props.currentTab === 1 ?
                    <div className="cc">
                           <div className="left">
                        <div className="desktop">
                        	<div className="wrapper">
                        		<div className="holder">
    		                    	<img src="images/tccf-ss2.png" />
    		                    </div>
    		                	</div>
    		            </div>
    		        </div>
                    <div className="desc">
                    	<h1>Treasure Coast CrossFit</h1>
                        <hr/>
    	                	<p>Collaborating with <a href="http://321goproject.com/" target="_blank">321goproject</a> I have worked alongside their senior developer to build the Frontend and launch of Treasure Coast CrossFit, and many others over the past year. I was additionally given the responsibility of maintaining previous sites and developing new sites from PSD to live.</p>
                                <div className="tag">
                                    <h2>Tools used</h2>
                                    <p>HTML5</p>
                                    <p>CSS3</p>
                                    <p>JavaScript</p>
                                    <p>PHP</p>
                                    <p>WordPress</p>
                                    <p>API</p>
                                </div>
    					<a className="port-btn" href="http://treasurecoastcrossfit.com/" target="_blank">Check it out yourself</a>
                    	</div>
                    </div>


                :null}


                {this.props.currentTab === 2 ?
                <div className="au">
                      <div className="left">
                    <div className="desktop">
                    	<div className="wrapper">
                    		<div className="holder">
		                    	<img src="images/au-ss.png" />
		                    </div>
		                </div>
		            </div>
		        </div>
                <div className="desc">
                    <h1>Achievements Unlimited</h1>
                    <hr />
                    <p>Achievements Unlimited needed a full redesign, development and a mobile/SEO friendly website</p>
                    <p>Some key requests i implemented on their site included; a photo carousel and gallery of past and current events. Also built, was an "Order Print" option that allows interested users to email the photographer to purchase a photo from the carousel and automatically include all neccessary information of the photo to be sent to the photographer to open communication up.</p>


                    <div className="tag">
                        <h2>Tools used</h2>
                        <p>HTML5</p>
                        <p>CSS3</p>
                        <p>PHP</p>
                        <p>JavaScript</p>
                        <p>Bootstrap</p>
                    </div>
                <a className="port-btn" href="http://achievementsunlimited.com/" target="_blank">Check it out yourself</a>
                	</div>
                </div>
                :null}

                {this.props.currentTab === 3 ?
                    <div className="ht">

                       <div className="left">
                            <div className="desktop">
                            	<div className="wrapper">
                            		<div className="holder">
        		                    	<img src="images/rf-ss.png" />
        		                    </div>
        		                </div>
        		            </div>
        		        </div>



                    	<div className="desc">
    	                	<h1>Rigquipment Finance</h1>
                                <hr/>
            	                	<p>Collaborating with <a href="http://321goproject.com/" target="_blank">321goproject</a> I have worked alongside their senior developer to build the Frontend and launch of Rigquipment Finance, and many others.</p>


                            <div className="tag">
                                <h2>Tools used</h2>
                                    <p>HTML5</p>
                                    <p>CSS3</p>
                                    <p>JavaScript</p>
                                    <p>PHP</p>
                                    <p>WordPress</p>
                            </div>
                            <a className="port-btn" href="https://rigquipment.com/" target="_blank">Check it out yourself</a>
                    	</div>
                    </div>
                :null}

                {this.props.currentTab === 4 ?
                <div className="ft">
                        <div className="left">
                    <div className="desktop">
                    	<div className="wrapper">
                    		<div className="holder">
		                    	<img src="images/photo-port.png" />
		                    </div>
		                </div>
		            </div>
		        </div>
                <div className="desc">
                	<h1>Photography Portfolio</h1>
                    <hr/>
                	<p>Personal photography portfolio</p>
                        <div className="tag">
                            <h2>Technology</h2>
                            <p>HTML5</p>
                            <p>CSS3</p>
                            <p>JavaScript</p>
                        </div>
				<a className="port-btn" href="old-photo-port/photoPort.html" target="_blank">Check it out yourself</a>
				              	</div>
                </div>
                :null}

            </div>
        );
    }
});




var Works = React.createClass({
    getInitialState: function () {
        return {
            tabList: tabList,
            currentTab: 1
        };
    },

    changeTab: function(tab) {
        this.setState({ currentTab: tab.id });
    },

    render: function(){
        return(
            <div>
            <Content currentTab={this.state.currentTab} />
                <Tabs
                    currentTab={this.state.currentTab}
                    tabList={this.state.tabList}
                    changeTab={this.changeTab}
                />

            </div>
        );
    }
});

export default Works;
