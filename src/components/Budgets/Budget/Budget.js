import React, { Component } from "react";

import classes from "./Budget.module.css";

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  toggleShow = () => this.setState({ show: this.state.show ? false : true });

  render() {
    let addedClasses = [classes.Buttons];
    if (this.state.show) {
      addedClasses = [classes.Buttons, classes.ShowBtns];
    }

    return (
      <li onClick={this.toggleShow}>
        <div>
          {this.props.month} {this.props.year}
        </div>
        <div>Remaining Budget: {this.props.remaining}</div>
        <div className={addedClasses.join(" ")}>
          <button style={{ backgroundColor: "#336699" }}>View</button>
          <button>Delete</button>
        </div>
      </li>
    );
  }
}

export default Budget;
