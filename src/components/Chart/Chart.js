import React from "react";

import CanvasJSReact from "../../assets/canvasjs/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const chart = props => {
  //Needs work, does not group.
  // 1. Look at category and check for existing
  // 2. Check type to determine action
  // 3. Add to array of category and total values.
  // 4. Use array to create needed objects.
  const data = [...props.data[0], ...props.data[1]];
  const dataPoints = {};
  for (let item of data) {
    if (item.category in dataPoints) {
      dataPoints[item.category] = dataPoints[item.category] + item.amount;
    } else {
      dataPoints[item.category] = item.amount;
    }
  }

  const options = {
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: "Incomes and Expenses"
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
        dataPoints: dataPoints
      }
    ]
  };

  return <CanvasJSChart options={options} />;
};

export default chart;
