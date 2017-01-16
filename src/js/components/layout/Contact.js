import React from 'react';

export default class Contact extends React.Component{
  render(){
    return(
      <div className='contact' >
        <section className='tech-list'>
          <h2>Technology I enjoy using</h2>
            <ul>
              <li>
                <img src='images/tech/html5.png' />
                  </li>
              <li>
                <img src='images/tech/css3.png' />
                </li>
                <li>
                  <img src='images/tech/sass.svg' />
                </li>
              <li>
                <img src='images/tech/js.jpg' />
              </li>
              <li>
                <img src='images/tech/react.png' />
              </li>
              <li>
                <img src='images/tech/git.png' />
              </li>
              <li>
                <img src='images/tech/webpack.png' />
              </li>

            </ul>
        </section>
        <h3 id='contact'>Let's Create</h3>

        <div id='email' className='animated'>
        <h2>Say Hello,</h2>
        <a href='mailto:developer@fabricebt.com'>Developer@fabricebt.com</a>
        </div>

          <aside>
            <img src='images/fab-logo-trans.png' className='animated' id='logo'></img>
          </aside>
      </div>
    );
  }
}
