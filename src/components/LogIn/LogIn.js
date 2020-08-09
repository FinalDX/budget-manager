import React, { Component } from 'react';

import Input from '../UI/Input/Input';
import FullButton from '../UI/Buttons/FullButton/FullButton';
import TextButton from '../UI/Buttons/TextButton/TextButton';

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
                    <h1><span style={{color: '#33658a'}}>P</span>ocket <span style={{color: 'rgb(253, 68, 68)'}}>P</span>lanner</h1>
                    <h3>Log In</h3>
                    <div className={classes.Form}>
                        <div className={classes.Inputs}>
                            <Input 
                                style={formStyle}
                                type={'text'} 
                                placeholder={'Username'}/>
                            <Input
                                style={formStyle}
                                type={'password'} 
                                placeholder={'Password'}/>
                        </div>
                        <div className={classes.Buttons}>
                            <FullButton
                                clicked={() => this.props.changeScreen('Dashboard')}
                                style={formStyle}
                                color={'Blue'}>Log In</FullButton>
                            <TextButton color={'#333'}>Sign Up</TextButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogIn;