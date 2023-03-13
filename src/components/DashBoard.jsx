import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
//data const for showcase purposes only, delete and fetch actual data later
const data = [
  {
    name: "Sat",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Sun",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mon",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Tue",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Wed",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Thu",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Fri",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Dashboard() {
  useEffect(() => {
    // fetch data
  }, []);

  // const [data, setData] = useState([]);

  return (
    <div className="flex flex-col mx-auto items-center h-screen">
      <div className="w-2/3 p-4 bg-red-3100 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2 text-center">Line Chart</h2>
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 3 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
        <button
          className="relative  text-red-600 border rounded-lg p-3 hover:bg-red-600 hover:text-white"
          type="button"
        >
          comparer
        </button>
      </div>
      <div className="w-2/3 p-4 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">Bar Chart</h2>
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
        <button
          className="relative  text-red-600 border rounded-lg p-3 hover:bg-red-600 hover:text-white"
          type="button"
        >
          comparer
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
