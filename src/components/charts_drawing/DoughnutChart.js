import React ,{ useMemo ,useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

var url = "http://18.221.204.164:80/doughnutchart";
// var url = "http://127.0.0.1:5000/doughnutchart";


const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function DoughnutChart() {
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
  console.log(todos.disponible)
  const data =  {
      labels:todos.labels,
      datasets: [
        {
          label: "Mis datos",
          tension: 0.3,
          data: todos.disponible,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          hoverOffset: 4,
        },
      ],
    };


  return (
    <div className="App">
      <h2 className="header">
      Efectivo Disponible por Año
      </h2>
      <Doughnut data={data} />
    </div>
  );
}