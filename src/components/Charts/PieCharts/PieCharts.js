import React, { Component } from "react";

import PieChart from "./PieChart/PieChart";
import Select from "../../UI/Select/Select";

import classes from "./PieCharts.module.css";

class PieCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Pie Charts (hidden)"
    };
  }

  chartSelected = name => {
    this.setState({ selected: name });
  };

  render() {
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

    return (
      <div className={classes.Charts}>
        <Select
          style={{ width: "250px" }}
          defaultValue={"Pie Charts (hidden)"}
          changed={e => this.chartSelected(e.target.value)}
          options={[
            "Pie Charts (hidden)",
            "Incomes and Expenses",
            "Incomes",
            "Expenses"
          ]}
        />
        <div className={classes.ChartContainer}>
          {this.props.incomeData.length > 0 || this.props.expenseData.length > 0
            ? chart
            : "Please enter a budget item!"}
        </div>
      </div>
    );
  }
}

export default PieCharts;