import React, { Component } from 'react';

import Arrows from '../../../UI/Icons/Arrows/Arrows';

import classes from './Category.module.css';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
    }

    toggleShow = () => this.setState({show: this.state.show ? false : true})

    render() {
        return (
            <div className={classes.Category}>
                <div className={classes.Title}>
                    <h3>{this.props.title}</h3>
                    <div className={classes.Icon}
                        onClick={this.toggleShow}>
                        <Arrows show={this.state.show} />
                    </div>
                </div>
                <ul>{this.state.show ? this.props.items : null}</ul>
            </div>
        );
    }
}

export default Category;