import React, { Component } from 'react';

import LineChart from './LineChart/LineChart';
import Select from '../../UI/Select/Select';
import classes from './LineCharts.module.css';

class LineCharts extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: 'Category',
            type: 'Type',
            year: 'Year'
        };
    };

    // Find all budgets that match the select box criteriea,
    // then extract name, amount, and month to create objects
    // for the dataItems array.
    budgetsToDataItems = () => {
        let dataItems = [];
        let formattedType = this.state.type.toLowerCase();
        for (const budget of this.props.budgets) {
            if (budget.date.year.toString() === this.state.year) {
                for (const item of budget[formattedType]) {
                    if (item.category === this.state.category) {
                        dataItems.push({
                            name: item.name,
                            amount: item.amount,
                            month: budget.date.month
                        })
                    }
                }
            }
        }
        return dataItems;
    }
    // ----------------------------------------------------------

    // Create data objects for line chart by searching through
    // dataItems in order by month and creating dataPoints for
    // each item name.
    dataItemsToData = (dataItems) => {
        let data = [];
        let months = ['January', 'Febuary', 'March', 'April',
        'May', 'June', 'July', 'August', 'September', 'October',
        'November', 'December'];
        for (const month of months) {
            for(const item of dataItems) {
                if (item.month === month) {
                    // Find out if object with same name already exists in data array
                    const dataIndex = data.findIndex(dataObject => dataObject.name === item.name);
                    // If it does exist, add datapoint using item object
                    if (dataIndex !== -1) {
                        data[dataIndex].dataPoints.push({y: item.amount, label: item.month})
                    // If it does NOT exist, create new data object
                    } else {
                        data.push({
                            type: "spline",
                            name: item.name,
                            showInLegend: true,
                            dataPoints: [{ y: item.amount, label: item.month }]
                        })
                    }
                }
            }
        }
        return data;
    }
    // ----------------------------------------------------------

    render() {
        let showGraph = (
            this.state.category !== 'Category' &&
            this.state.type !== 'Type' &&
            this.state.year !== 'Year');
        let dataItems = [];
        let data = [];

        if (showGraph) {
            dataItems = this.budgetsToDataItems();
            data = this.dataItemsToData(dataItems);
        }

        return (
            <div>
                <div>
                    <Select 
                        haveDefaultOption={true}
                        defaultValue={'Type'}
                        options={['Incomes', 'Expenses']}
                        changed={(e) => {
                            this.setState({type: e.target.value});
                        }}/>
                    <Select 
                        haveDefaultOption={true}
                        defaultValue={'Category'}
                        options={this.props.categories}
                        changed={(e) => {
                            this.setState({category: e.target.value});
                        }}/>
                    <Select 
                        haveDefaultOption={true}
                        defaultValue={'Year'}
                        options={this.props.years}
                        changed={(e) => {
                            this.setState({year: e.target.value});
                        }}/>
                </div>
                <div className={classes.ChartContainer}>
                    {/* Only display graph once all three select criteria have been selected */}
                    {showGraph ? 
                        <LineChart 
                            data={data}
                            title={`${this.state.type} for ${this.state.category} during ${this.state.year}`}
                            yAxis={'Dollar Amount'}/> :
                        <div style={{margin: '10px'}}>Select type, category, and year to see graph.</div>
                    }
                </div>
            </div>
        )
    }
}

export default LineCharts;