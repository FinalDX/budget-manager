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

    // Parse the budget data to populate the select
    // boxes with only options that exist in the 
    // budgets.
    parseData = budgets => {
        let parsedData = {
            type: [],
            categories: [],
            years: []
        }
        for (let budget of budgets) {
            // Find if any income or expense exists in 
            // budgets and if any are found then add that
            // type to parsedData.type.
            if (!parsedData.type.find(type => type === 'Incomes') &&
                budget.incomes.length > 0) {
                parsedData.type.push('Incomes');
            }
            if (!parsedData.type.find(type => type === 'Expenses') && 
                budget.expenses.length > 0) {
                parsedData.type.push('Expenses');
            }
            // Search thu every item in a budget's income list
            // to find any categories that do not yet exist in 
            // parsedData.categories.
            for (let item of budget.incomes) {
                let foundCategory = parsedData.categories.find(category => category === item.category);
                if (!foundCategory) {
                    parsedData.categories.push(item.category);
                }
            }
            // Search thu every item in a budget's expense list
            // to find any categories that do not exist in 
            // parsedData.categories.
            for (let item of budget.expenses) {
                let foundCategory = parsedData.categories.find(category => category === item.category);
                if (!foundCategory) {
                    parsedData.categories.push(item.category);
                }
            }
            // Find any year that does not exist in 
            // parsedData.years.
            let foundYear = parsedData.years.find(year => year === budget.date.year);
            if (!foundYear) {
                parsedData.years.push(budget.date.year);
            }
        }
        return parsedData;
    }

    // ==========================================================
    // RENDER
    // ==========================================================
    render() {
        let parsedData = this.parseData(this.props.budgets);
        // Show controls if there are at least two budgets
        let showControls;
        if(this.props.budgets) {
            showControls = this.props.budgets.length > 0;
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
                    options={parsedData.type}
                    changed={(e) => {
                        this.setState({type: e.target.value});
                    }}/>
                <Select 
                    haveDefaultOption={true}
                    defaultValue={'Category'}
                    options={parsedData.categories}
                    changed={(e) => {
                        this.setState({category: e.target.value});
                    }}/>
                <Select 
                    haveDefaultOption={true}
                    defaultValue={'Year'}
                    options={parsedData.years}
                    changed={(e) => {
                        this.setState({year: e.target.value});
                    }}/>
            </div>
        );

        // If there is at least one budgets that has been
        // created, show the controls.
        if (showControls) {
            content = [controls];
            // If a selection was made in all of the select boxes inside 
            // the controls, convert the budget data to chart data.
            if (showChart) {
                dataItems = this.budgetsToDataItems();
                data = this.dataItemsToData(dataItems);
                content.push(
                    <div key={1} className={classes.ChartContainer}>
                        <LineChart 
                            data={data}
                            title={`${this.state.type} for ${this.state.category} during ${this.state.year}`}
                            yAxis={'Dollar Amount'}/>  
                    </div>
                );
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
                Please create at least one budget to display 
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