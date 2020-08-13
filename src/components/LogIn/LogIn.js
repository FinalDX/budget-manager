import React, { Component } from 'react';

import FullButton from '../UI/Buttons/FullButton/FullButton';
import TextButton from '../UI/Buttons/TextButton/TextButton';
import Keypad from '../Keypad/Keypad';

import classes from './LogIn.module.css';

class LogIn extends Component {
    render() {
        const formStyle = {
            display: 'block',
            margin: '20px auto',
            width: '250px'
        };

        return (
            <div className={classes.Background}>
                <div className={classes.LogIn}>
                    <h1 style={{marginBottom: '0'}}><span style={{color: '#33658a'}}>P</span>ocket <span style={{color: 'rgb(253, 68, 68)'}}>P</span>lanner</h1>
                    <h3>Passcode:</h3>
                    <div className={classes.Keypad}>
                        <Keypad />
                    </div>
                    <div className={classes.Buttons}>
                        <FullButton
                            clicked={this.props.logIn}
                            style={formStyle}
                            color={'Blue'}>Log In</FullButton>
                        <TextButton color={'#333'}>Sign Up</TextButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogIn;