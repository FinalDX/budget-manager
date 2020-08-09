import React, { Component } from 'react';
import { connect } from 'react-redux';

import LineChart from './LineChart/LineChart';
import Toolbar from '../../Toolbar/Toolbar';
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

    // ----------------------------------------------------------
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

    // ==========================================================
    // RENDER
    // ==========================================================
    render() {
        // Show controls if there are at least two budgets
        let showControls;
        if (this.props.budgets) {
            showControls = this.props.budgets.length > 1;
        }
        // Show chart if all selections have been made
        let showChart = (
            this.state.category !== 'Category' &&
            this.state.type !== 'Type' &&
            this.state.year !== 'Year');

        let dataItems = [];
        let data = [];
        let content = null;
        
        let controls = (
            <div key={0}>
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
        );

        // If there are at least two budgets that have been
        // created, show the controls.
        if (showControls) {
            content = [controls];
            // If a selection was made in all of the select boxes inside 
            // the controls, convert the budget data to chart data.
            if (showChart) {
                dataItems = this.budgetsToDataItems();
                data = this.dataItemsToData(dataItems);
                // If there is at least one data item that matched the 
                // criteria of the select boxes, show the chart.
                if (dataItems.length > 0) {    
                    content.push(
                        <div key={1} className={classes.ChartContainer}>
                            <LineChart 
                                data={data}
                                title={`${this.state.type} 
                                    for ${this.state.category} 
                                    during ${this.state.year}`}
                                yAxis={'Dollar Amount'}/>  
                        </div>
                    );
                // If there are no data items that match the criteria
                // of the select boxes, display message.
                } else {
                    content.push(
                        <div key={1} style={{margin: '10px'}}>
                            There is no data to display for the selected type,
                            category, and year.
                        </div>
                    );
                }
            // If at least one selection was not made in the select boxes
            // inside of the controls.
            } else {
                content.push(
                    <div key={1} style={{margin: '10px'}}>
                        Select type, category, and year to see graph.
                    </div>
                );
            }
        // If less than two budgets have been created.
        } else {
            content = (
            <div style={{margin: '10px'}}>
                This graph displays changes in budget categories over time.
                Please create at least two budgets in the same year to display 
                this graph.
            </div>
            )
        }

        return (
            <div>
                <Toolbar 
                    title={'Line Charts'}
                    leftBtnTitle={'< Back'}
                    leftBtnAction ={() => this.props.changeScreen('BudgetList')}/>
                <main style={{paddingTop: '1px', marginTop: '39px'}}>
                    {content}
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      budgets: state.budgets
    }
  }

export default connect(mapStateToProps)(LineCharts);