import React from 'react'
import FlexNav from '../../components/FlexNav';
import TopNav from '../../components/TopNav';

class Nav extends React.Component {

  state = {
    isFlexNavClose: false,
  }

  toggleFlexNavState = () => {
    const { isFlexNavClose } = this.state;

    this.setState({
      isFlexNavClose: !isFlexNavClose
    });
  }

  render() {
    const navClass = this.state.isFlexNavClose ? 'top-nav-active': 'flex-nav-active';

    return(
      <div className={navClass}>
        <TopNav
          toggleFlexNavState={this.toggleFlexNavState}
          isFlexNavClose
        />
        <FlexNav
          toggleFlexNavState={this.toggleFlexNavState}
          isFlexNavClose
        />
      </div>
    )
  }
}

export default Nav
