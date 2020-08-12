import React from "react";

import CanvasJSReact from "../../../assets/canvasjs/canvasjs.react";
import classes from "./Chart.module.css";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const chart = (props) => {
  const options = {
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: props.title
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: props.dataPoints
      }
    ]
  };

  return props.dataPoints.length > 0 ? (
    <div className={classes.Chart}>
      <CanvasJSChart options={options} />
    </div>
  ) : null;
};

export default chart;
