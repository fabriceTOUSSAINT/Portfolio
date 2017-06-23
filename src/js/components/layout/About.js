import React from 'react';


class About extends React.Component{

    render(){
      return(
        <div className='about animated parallax' id='about' data-parallax='scroll'>

          <aside className='about__aside'>
              <div className='about__wrapper'>
                <h2>I'm Fabrice Toussaint</h2>
                <p>A twenty-something year old who has been in the development world for nearly 5 years. Currently residing in NYC my pure interest in technology and how they worked started years ago. From learning how to code on my own free time, attending College credited courses and gaining unmatched experience under a mentor senior developer. My experience is widely diverse, starting in freelance development work to joining a rising startup as a web developer working directly under the senior developer lead with a fully remote team. We helped bring gym owners presences to the digital world on our custom Wordpress theme and other digital needs such as email development, landing pages, setting up membership sites and more.</p>

                <p>I am currently part of the Digital Experience team at Complex Networks as a Front-End Engineer. Working with product design, DevOps and RnD I develop components and the architecture of our React framework supporting our site <a href='http://complex.com' target='_blank'>Complex.com</a> and our 5 sister sites (
                    <a href='http://collider.com' target='_blank'>Collider.com</a>,&nbsp;
                    <a href='http://solecollector.com' target='_blank'>SoleCollector.com</a>,&nbsp;
                    <a href='http://firstwefeast.com' target='_blank'>FirstWeFeast.com</a>,&nbsp;
                    <a href='http://pigeonsandplanes.com' target='_blank'>PigeonsAndpPlanes.com</a>,&nbsp;
                    <a href='http://theridechannel.com' target='_blank'>TheRideChannel.com</a>). Using modern technology such as React, Redux, Isomorphic rendering, es6, Angular, Laravel and much more I am able to push myself and experiment even more</p>

                <p>As an avid photographer and traveler, I like to keep my eye on the details. I see an exploration through to the fullest. Whether it is waking up at 3:30 am for that 2-hour hike up the mountain to get that perfect sunrise photo or seeing that project I have been working on for days pushed live and in the hands of our millions of users. I put the dedication and work to see a project through so that it is completed at its best possible quality. </p>

            </div>
          </aside>
        </div>
      )
    }
};

export default About;
