import React, { Component } from "react";

import Budgets from "../../components/Budgets/Budgets";
import Modal from '../../components/UI/Modal/Modal';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      date: new Date(),
      budgets: []
    };
  }

  toggleAddModal = () => this.setState({showAddModal: this.state.showAddModal ? false : true});

  inputDateHandler = (e) => {
    const enteredDate = e.target.value;
    const dateString = enteredDate.split('-');
    const year = dateString[0];
    const month = dateString[1];
    const day = dateString[2];
    const updatedDate = new Date(this.state.date.getTime());
    updatedDate.setFullYear(year);
    updatedDate.setMonth(month - 1);
    updatedDate.setDate(day);
    this.setState({date: updatedDate});
    
  }

  render() {
    console.log(`${this.state.date.getFullYear()}-${this.state.date.getMonth() + 1}-${this.state.date.getDate()}`);
    let inputDate = `2020-7-13`;
    console.log(inputDate);
    return (
      <div>
        {this.state.showAddModal ? 
          <Modal type={'prompt'} title={'Select Date'}
          message={'Please select the month and the year for the new budget.'}
          canceled={this.toggleAddModal}
          input={'date'}
          inputValue={inputDate}
          changed={(e) => this.inputDateHandler(e)}/> : 
          null}
        <Budgets budgets={this.state.budgets}
          addClicked={this.toggleAddModal} />
      </div>
    );
  }
}

export default Dashboard;
