
import React ,{ useMemo, useEffect, useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Bar } from "react-chartjs-2";

var url = "http://18.221.204.164:80/barchart";
// var url = "http://127.0.0.1:5000/barchart";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);



const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5];

const options = {
  fill: true,
  animations: true,
  scales: {
    y: {
      min: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function BarChart() {

  const [todos, setTodos] = useState([])
  
  const fetchApi= async () => {
    const response = await fetch(url)
    const responseJSON = await response.json()
    setTodos(responseJSON)
    console.log(responseJSON)
  }
  useEffect(() => {
    fetchApi()
  },[]);
  
  const title =  todos.title;
  const anios = todos.anios
  const labels = anios;

  const data = {

      datasets: [
        {
          label: title,
          tension: 0.3,
          data: todos.scores,
          borderColor: ['rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)'],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
        },
      ],
      labels
    };
 

  return (
    <div className="App">
      <h2 className="header">
        Ingresos Anual
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
}