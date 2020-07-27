import React, { Component } from "react";

import Modal from '../../UI/Modal/Modal';
import SlideButton from '../../UI/Buttons/SlideButton/SlideButton';

import classes from "./Item.module.css";

class Item extends Component {
  constructor(props){
    super(props);
    this.state= { 
      showButton: false,
      showModal: false
    }
  }

  toggleShow = () => this.setState({showButton: this.state.showButton ? false : true});

  toggleShowModal = () => this.setState({showModal: this.state.showModal ? false : true});
  
  confirmModal = () => {
    this.props.deleted(this.props.itemType, this.props.index);
    this.toggleShowModal();
  }

  render() {
    let sign = '+';
    let colorClasses = [classes.Amount];
    if (this.props.itemType === "income") {
      colorClasses = [classes.Amount, classes.Green];
    } else if (this.props.itemType === "expense") {
      colorClasses = [classes.Amount, classes.Red];
      sign = '-';
    }

    return (
      <div>
        {this.state.showModal ? 
          <Modal type={'confirm'}
            title={'Confirm:'}
            message={`Are you sure you want to delete "${this.props.name}"?`}
            canceled={this.toggleShowModal} 
            confirmed={this.confirmModal}/> : null }
  
        <li className={classes.Item} onClick={this.toggleShow}>
          <p className={classes.Name}>{this.props.name}: </p>

          <div className={colorClasses.join(" ")}>
            <p>{sign}${this.props.amount.toFixed(2)}</p>
            <SlideButton 
              show={this.state.showButton}
              color={'Red'}
              onClick={this.toggleShowModal}>
              Delete
            </SlideButton>
          </div>
        </li>
      </div>
    );
  };
}

export default Item;
