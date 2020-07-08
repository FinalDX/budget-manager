import React, { Component } from 'react';

import Dropdown from '../UI/Dropdown/Dropdown';
import Chart from '../Chart/Chart';

class Charts extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            chart: null
        }
    }

    toggleShowChart = (name) => {
        switch (name) {
            case 'Pie Chart':
                this.setState({chart: null});
                break;
            case 'Incomes and Expenses':
                this.setState({chart: (<Chart data={this.props.data}/>)});
                break;
            case 'Expenses':
                this.setState({chart: null});
                break;
            default:
                this.setState({chart: null});
                break;
        } 
    }

    render () {
        const list = [
            {id: 1, name: 'Incomes and Expenses'},
            {id: 2, name: 'Expenses'}
        ]

        return(
            <div>
                <Dropdown title={'Pie Charts'} list={list}
                    selected={this.toggleShowChart}/>
                {this.state.chart}
            </div>
        );
    }

}

export default Charts;