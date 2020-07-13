import React, { Component } from 'react';

import Dropdown from '../UI/Dropdown/Dropdown';
import Chart from './PieChart/PieChart';

import classes from './Charts.module.css';

class Charts extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: 'Pie Charts (hidden)'
        }
    }

    chartSelected = (name) => {
        this.setState({selected: name})
    }

    render () {
        // A list for the dropdown
        const list = [
            {id: 0, name: 'Pie Charts (hidden)'},
            {id: 1, name: 'Incomes and Expenses'},
            {id: 2, name: 'Expenses'},
            {id: 3, name: 'Incomes'}
        ];
        // Used to determine the data that the Chart componenet 
        // recieves based on the selection of the dropdown
        const data = {
            'Incomes and Expenses': [...this.props.incomeData, ...this.props.expenseData],
            'Expenses': [...this.props.expenseData],
            'Incomes': [...this.props.incomeData]
        }
        // Ensures that the Chart componenet is only rendered if the data
        // is defined
        let chart = data[this.state.selected] ?
            <Chart title={this.state.selected} 
                data={data[this.state.selected]} /> : null;

        return(
            <div className={classes.Charts}>
                <Dropdown title={'Pie Charts'} list={list}
                    selected={this.chartSelected}/>
                <div className={classes.ChartContainer}>
                    {(this.props.incomeData.length > 0 ||
                    this.props.expenseData.length > 0) ? 
                    chart :
                    'Please enter a budget item!'}
                </div>
            </div>
        );
    }
}

export default Charts;