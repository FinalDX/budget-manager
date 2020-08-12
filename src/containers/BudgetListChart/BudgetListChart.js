import React, { Component } from 'react';
import { connect } from 'react-redux';

import LineChart from '../../components/Charts/LineChart/LineChart';
import Toolbar from '../../components/Toolbar/Toolbar';
import Select from '../../components/UI/Select/Select';

import classes from './BudgetListChart.module.css';

class LineCharts extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: 'Category',
            type: 'Type',
            year: 'Year',
            showCategory: false,
            showType: false
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

    // Create an array of years that exist in budgets.
    parseYears = budgets => {
        let parsedYears = ['Year'];
        for (let budget of budgets) {
            // Find any year that does not exist in 
            // parsedYears and add those years to it.
            let foundYear = parsedYears.find(year => year === budget.date.year);
            if (!foundYear) {
                parsedYears.push(budget.date.year);
            }
        }
        return parsedYears;
    }

    // Parse budgets and return an array of only
    // the budgets that match the selected year.
    parseBudgetsByYear = (budgets, year) => {
        let parsedBudgets = [];
        for (let budget of budgets) {
            if (budget.date.year === year) {
                parsedBudgets.push(budget);
            }
        }
        return parsedBudgets;
    }

    // Create an array of categories that exist in 
    // budgets.
    parseCategories = budgets => {
        let parsedCategories = ['Category'];
        for (let budget of budgets) {
            // Search thu every item in a budget's income list
            // to find any categories that do not yet exist in 
            // parsedCategories and add those categories to it.
            for (let item of budget.incomes) {
                let foundCategory = parsedCategories.find(category => category === item.category);
                if (!foundCategory) {
                    parsedCategories.push(item.category);
                }
            }
            // Search thu every item in a budget's expense list
            // to find any categories that do not exist in 
            // parsedCategories and add those categories to it.
            for (let item of budget.expenses) {
                let foundCategory = parsedCategories.find(category => category === item.category);
                if (!foundCategory) {
                    parsedCategories.push(item.category);
                }
            }
        }
        return parsedCategories;
    }

    // Parse budgets and return an object that contains
    // an array of only the budgets that match the 
    // selected category and whether that category was
    // found in the budgets income list or expense list.
    parseBudgetsByCategory = (budgets, category) => {
        let data = {
            parsedBudgets: [],
            foundIncome: false,
            foundExpense: false
        }
        for (let budget of budgets) {
            for (let item of budget.incomes) {
                if (item.category === category) {
                    data.parsedBudgets.push(budget);
                    data.foundIncome = true;
                }
            }
            for (let item of budget.expenses) {
                if (item.category === category) {
                    data.parsedBudgets.push(budget);
                    data.foundExpense = true;
                }
            }
        }
        return data;
    }

    // ==========================================================
    // RENDER
    // ==========================================================
    render() {
        // Default values
        let dataItems = [];
        let data = [];
        let content = null;
        let message = 'Please select year to see chart.'
        let parsedBudgets = null;

        // Get all years that exist in budgets.
        let parsedYears = this.parseYears(this.props.budgets);

        // Show controls if there is at least one budget
        let showControls;
        if(this.props.budgets) {
            showControls = this.props.budgets.length > 0;
        }

        // Display appropriate message based on what is and 
        // what is not selected.
        if (this.state.type === 'Type') {
            message = 'Please select type to see chart.'
            if (this.state.category === 'Category') {
                message = 'Please select category to see chart.'
                if (this.state.year === 'Year') {
                    message = 'Please select year to see chart.'
                }
            }
        }

        // Show chart if all selections have been made
        let showChart = (
            this.state.category !== 'Category' &&
            this.state.type !== 'Type' &&
            this.state.year !== 'Year');
        
        let controls = [
            <Select
                key={0}
                value={this.state.year}
                options={parsedYears}
                changed={(e) => {
                    this.setState({
                        year: e.target.value,
                        showCategory: true,
                        showType: false,
                        category: 'Category',
                        type: 'Type'
                    });
                }}/>
        ];
    
        if(this.state.showCategory) {
            // Get all budgets that are in the selected year.
            parsedBudgets = this.parseBudgetsByYear(this.props.budgets, this.state.year);
            // Get all categories that exist in the parsed budgets.
            let parsedCategories = this.parseCategories(parsedBudgets);
            controls.push(
                <Select
                    key={1}
                    value={this.state.category}
                    options={parsedCategories}
                    changed={(e) => {
                        this.setState({
                            category: e.target.value,
                            showType: true,
                            type: 'Type'
                        });
                    }}/>
            )
        }

        if(this.state.showType) {
            // Get all budgets that have the selected category and see if that
            // category exists in an income list, an expense list, or both.
            data = this.parseBudgetsByCategory(parsedBudgets, this.state.category);
            parsedBudgets = data.parsedBudgets;
            let parsedTypes = ['Type'];
            if (data.foundIncome) {
                parsedTypes.push('Incomes');
            }
            if (data.foundExpense) {
                parsedTypes.push('Expenses');
            }
            controls.push(
                <Select
                    key={2}
                    value={this.state.type}
                    disabled={false}
                    options={parsedTypes}
                    changed={(e) => {
                        this.setState({
                            type: e.target.value
                        });
                    }}/>
            )
        }


        // If there is at least one budgets that has been
        // created, show the controls.
        if (showControls) {
            content = [(<div key={0}>{controls}</div>)];
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
                        {message}
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
                    title={'Budget List Chart'}
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