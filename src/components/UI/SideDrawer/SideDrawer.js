import React, { Component } from 'react';

import Backdrop from '../Backdrop/Backdrop';

import classes from './SideDrawer.module.css';

class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  render() {
    let addedClasses = [classes.SideDrawer];
    if (this.props.show) {
      addedClasses.push(classes.Open);
    }

    return(
      <div>
        <Backdrop 
          show={this.props.show}
          clicked={this.props.toggleShow}
          layer={800}/>
        <div className={addedClasses.join(' ')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default SideDrawer;