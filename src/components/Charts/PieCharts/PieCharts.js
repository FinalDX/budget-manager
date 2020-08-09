import React, { Component } from "react";

import PieChart from "./PieChart/PieChart";
import Toolbar from '../../Toolbar/Toolbar';
import Select from "../../UI/Select/Select";

import classes from "./PieCharts.module.css";

class PieCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Incomes and Expenses"
    };
  }

  // ----------------------------------------------------------
  chartSelected = name => {
    this.setState({ selected: name });
  };

  render() {
    let content = null;

    // Used to determine the data that the Chart componenet
    // recieves based on the selection from the select box.
    const data = {
      'Incomes and Expenses': [
        ...this.props.incomeData,
        ...this.props.expenseData
      ],
      'Expenses': [...this.props.expenseData],
      'Incomes': [...this.props.incomeData]
    };
    // Ensures that the Chart componenet is only rendered if the data
    // is defined.
    let chart = data[this.state.selected] ? (
      <PieChart title={this.state.selected} data={data[this.state.selected]} />
    ) : null;

    // Show the content if there is at least one item inside
    // incomes or expenses.
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
    // If there are no items, display a message.
    } else {
      content = (
        <div style={{marginBottom: '20px'}}>
          Please enter at least one budget item to view the pie charts.
        </div>
      );
    }

    return (
      <div>
        <Toolbar 
          title={'Pie Charts'}
          leftBtnTitle={'< Back'}
          leftBtnAction ={this.props.changeScreen}/>
        <main style={{paddingTop: '1px', marginTop: '39px'}}>
          {content}
        </main>
      </div>
    );
  }
}

export default PieCharts;