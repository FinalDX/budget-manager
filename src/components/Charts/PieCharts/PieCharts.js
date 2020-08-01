import React, { Component } from "react";

import PieChart from "./PieChart/PieChart";
import Select from "../../UI/Select/Select";
import FullButton from '../../UI/Buttons/FullButton/FullButton';

import classes from "./PieCharts.module.css";

class PieCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Incomes and Expenses",
      showBtn: {
        show: false,
        btnText: 'Show',
        btnColor: 'Blue'
    }
    };
  }

  chartSelected = name => {
    this.setState({ selected: name });
  };

  // Toggle showBtn in state
  toggleShowBtn = () => {
    this.setState({showBtn: this.state.showBtn.show ?
        {show: false, btnText: 'Show', btnColor: 'Blue'} :
        {show: true, btnText: 'Hide', btnColor: 'Purple'}});
  } 

  render() {
    let content = null;

    // Used to determine the data that the Chart componenet
    // recieves based on the selection from the select box
    const data = {
      "Incomes and Expenses": [
        ...this.props.incomeData,
        ...this.props.expenseData
      ],
      Expenses: [...this.props.expenseData],
      Incomes: [...this.props.incomeData]
    };
    // Ensures that the Chart componenet is only rendered if the data
    // is defined
    let chart = data[this.state.selected] ? (
      <PieChart title={this.state.selected} data={data[this.state.selected]} />
    ) : null;

    if (this.state.showBtn.show) {
      if(this.props.incomeData.length > 0 || this.props.expenseData.length > 0) {
          content = (
            <div className={classes.Charts}>
              <Select
                style={{ width: "250px" }}
                defaultValue={"Pie Charts (hidden)"}
                changed={e => this.chartSelected(e.target.value)}
                options={[
                  "Incomes and Expenses",
                  "Incomes",
                  "Expenses"
                ]}
              />
              <div className={classes.ChartContainer}>
                {chart}
              </div>
            </div>
          );
      } else {
        content = (
          <div style={{marginBottom: '20px'}}>
            Please enter at least one budget item to view the pie charts.
          </div>
        );
      }
    }

    return (
      <div>
        <h2>Pie Chart</h2>
        <FullButton
            style={{margin: '10px auto'}}
            color={this.state.showBtn.btnColor}
            clicked={this.toggleShowBtn}>
                {this.state.showBtn.btnText}
        </FullButton>
        {content}
      </div>
    );
  }
}

export default PieCharts;