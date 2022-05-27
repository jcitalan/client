import React from 'react';
import BarChart from '../components/charts_drawing/BarChart';
import LineChart from '../components/charts_drawing/LineChart';
import DoughnutChart from '../components/charts_drawing/DoughnutChart';
function Chart(){
  return (
    <div className="box">
      
      <h2 className="header">
           Flujo de Caja | Graficos
      </h2>
      <BarChart/>
      <br></br>
      <LineChart/>
      <br></br>
      <DoughnutChart/>
    </div>
    )
}
export default Chart