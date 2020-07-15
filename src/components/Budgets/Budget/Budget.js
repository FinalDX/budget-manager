import React, { Component } from "react";

import SlideButton from '../../UI/Buttons/SlideButton/SlideButton';

import classes from "./Budget.module.css";

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButtons: false
    };
  }

  toggleShow = () => this.setState({ showButtons: this.state.showButtons ? false : true });

  render() {
    const months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return (
      <li className={classes.Budget} onClick={this.toggleShow}>
        <div className={classes.Date}>
          {months[this.props.budget.date.getMonth()]} {this.props.budget.date.getFullYear()}
        </div>
        <div className={classes.RightSide}>
          <div className={classes.Remaining}>
            Remaining Budget: {this.props.budget.remaining}
          </div>
          <div className={classes.Buttons}>
            <SlideButton show={this.state.showButtons}
              style={{backgroundColor: '#33658A'}}>View</SlideButton>
            <SlideButton show={this.state.showButtons}
              style={{backgroundColor: 'rgb(253, 68, 68)'}}>Delete</SlideButton>
          </div>
        </div>
      </li>
    );
  }
}

export default Budget;
