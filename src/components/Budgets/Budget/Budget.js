import React, { Component } from "react";

import Balance from '../../Balance/Balance';
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

    return (
      <li className={classes.Budget} onClick={this.toggleShow}>
        <div className={classes.Date}>
          {this.props.budget.date.month} {this.props.budget.date.year}
        </div>

        <div className={classes.RightSide}>
          <div className={classes.Remaining}
            ref={this.state.ref}>
              <Balance 
                remaining={this.props.budget.remaining} 
                style={{fontSize: '180%', fontWeight: 'lighter'}}/>
          </div>

          <SlideButton 
            show={this.state.showButtons}
            color={'Blue'}
            style={{height: '100%'}}
            clicked={() => this.props.viewClicked(this.props.budget)}>
              View</SlideButton>
              
          <SlideButton 
            show={this.state.showButtons}
            color={'Red'}
            style={{height: '100%'}}
            clicked={() => this.props.deleteClicked(this.props.id)}>
              Delete</SlideButton>
        </div>
      </li>
    );
  }
}

export default Budget;
