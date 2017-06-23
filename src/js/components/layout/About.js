import React from 'react';


class About extends React.Component{

    render(){
      return(
        <div className='about animated parallax' id='about' data-parallax='scroll'>

          <aside className='about__aside'>
              <div className='about__wrapper'>
                <h2>I'm Fabrice Toussaint</h2>
                <p>A twenty-something year old  who has been in the development world for nearly 5 years. Currently residing in NYC my pure interest in technology and how they worked started years ago. From learning programming on my own at any free time, attending College credited courses and gaining un matched experience under a mentor senior developer lead. My experience is widely diverse, starting in freelance development work to joining a rising startup as a web developer working directly under the senior developer lead with a fully remote team. We helped bring gym owners presences to the digital world on our custom Wordpress theme and other digital needs.</p>

                <p>Currently part of the Digital Experience team at Complex Networks as a Front-End Engineer. Working with product design, DevOps and RnD I develop components and the architecture of our React framework supporting our site <a href='http://complex.com' target='_blank'>Complex.com</a> and our 5 sister sites (
                    <a href='http://collider.com' target='_blank'>Collider.com</a>,&nbsp;
                    <a href='http://solecollector.com' target='_blank'>SoleCollector.com</a>,&nbsp;
                    <a href='http://firstwefeast.com' target='_blank'>FirstWeFeast.com</a>,&nbsp;
                    <a href='http://pigeonsandplanes.com' target='_blank'>PigeonsAndpPlanes.com</a>,&nbsp;
                    <a href='http://theridechannel.com' target='_blank'>TheRideChannel.com</a>) using modern technology such as React, Redux, Isomorphic rendering, es6 and much more I am able to push myself and experiment even more!</p>

                <p>As an avid photographer and traveler I like to pay attention to the details. I see an exploration through to the fullest. Whether it is waking up at 3:30 am for that 2 hour hike up the mountain to get that perfect sunrise photo or seeing that video playlist component being pushed live and in the hands of our millions of users. I put all the dedication and work to see a project through so that it is presented in its best possible quality. </p>


                {/* <p>A twenty-something year old that has been in the development world for over 3 years. Primarily as a Front-end Engineer professionally and Back-end experience on personal projects. As an avid photographer and explorer, I pull inspiration from the mountains I've climbed to the valleys I've photographed to bring a unique inspiration to projects. I currently work at Complex Media with a small team of strong and reliable developers. Collectively we create new features, manage sites using legacy frameworks, dissolve bugs, and consistently brainstorming ways to always be improving the experience for our users. The sites we proudly produce and manage are 1. <a href='http://complex.com' target='_blank'>Complex.com</a> 2. <a href='http://pigeonsandplanes.com' target='_blank'>pigeonsandplanes.com</a> 3. <a href='http://solecollector.com' target='_blank'>solecollector.com</a> 4. <a href='http://firstwefeast.com' target='_blank'>firstwefeast.com</a> 5. <a href='http://collider.com' target='_blank'>collider.com</a> 6. <a href='http://theridechannel.com' target='_blank'>theridechannel.com</a></p>
                <p>I am excited to push the quality of my work further and progress with the fast pace world that is technology. Learning and building are my favorite aspects of the development world, you will always find me reading some article or tinkering around with some new technology.</p> */}
            </div>
          </aside>
        </div>
      )
    }
};

export default About;
