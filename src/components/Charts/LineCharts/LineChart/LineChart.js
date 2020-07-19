import React from "react";

import classes from './LineChart.module.css';

import CanvasJSReact from "../../../../assets/canvasjs/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    
const lineChart = props => {
    const options = {
            animationEnabled: true,	
            title:{
                text: props.title
            },
            axisY : {
                title: props.yAxis,
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: props.data
    }
    
    return (
        <div className={classes.LineChart}>
            <CanvasJSChart options={options} />
        </div>
    );
}
    
export default lineChart;                          