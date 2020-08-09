import React, { Component } from 'react';

import Toolbar from '../../components/Toolbar/Toolbar';
import Balance from '../../components/Balance/Balance';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Toolbar 
                    title={'Dashboard'}
                    rightBtnTitle={'Budget List'}
                    rightBtnAction={() => this.props.changeScreen('BudgetList')}
                    leftBtnTitle={'Settings'}
                />
                <main style={{paddingTop: '1px', marginTop: '39px'}}>
                    <h1>Total Balance:</h1>
                    <Balance
                        remaining={100}
                        style={{ fontSize: "300%", fontWeight: "lighter" }}
                    />
                </main>
            </div>
        );
    }
}

export default Dashboard;