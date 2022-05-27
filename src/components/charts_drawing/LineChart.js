import { useMemo, useEffect, useState} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

var url = "http://18.221.204.164:80/linechart";
// var url = "http://127.0.0.1:5000/linechart";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5];
// const scores2 = [1, 3, 2, 2, 4, 4, 5, 3, 2];
const labels = [1, 2, 3, 4, 5];

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

export default function LineChart() {
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
  const title2 =  todos.title2;
 
  

  const data =  {
      datasets: [
        {
          label: title,
          data: todos.ingresos_anios,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
        {
          label: title2,
          tension: 0.3,
          data: todos.gasto_anios,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          pointRadius: 6,
        },
      ],
      labels,
    };
 

  return (
    <div className="App">
    <h2 className="header">
      Ingresos vs Gastos
    </h2>
    <Line data={data} options={options} />
  </div>
  );
}