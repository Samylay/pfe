import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const dataLine = [
  { name: "Jan", value1: 400, value2: 200 },
  { name: "Feb", value1: 300, value2: 300 },
  { name: "Mar", value1: 200, value2: 200 },
  { name: "Apr", value1: 100, value2: 200 },
  { name: "May", value1: 500, value2: 200 },
  { name: "Jun", value1: 600, value2: 400 },
  { name: "Jul", value1: 700, value2: 200 },
  { name: "Aug", value1: 800, value2: 200 },
  { name: "Sep", value1: 900, value2: 200 },
  { name: "Oct", value1: 1000, value2: 200 },
  { name: "Nov", value1: 1100, value2: 1000 },
  { name: "Dec", value1: 1200, value2: 200 },
];

export default function KPI() {
  const [compare, setCompare] = useState(false);

  const dataLineCompare = dataLine.map((item, index) => ({
    name: item.name,
    value3: (item.value1 + item.value2) / 2,
  }));

  return (
    <div className="flex flex-1 bg-gray-100 min-h-screen w-full">
      <div className="flex-1 max-w-7xl w-full mx-auto my-6 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">KPI</h2>
        <div className="bg-white rounded-md p-6 m-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Line Chart</h3>
          <div className="relative w-full h-full">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={compare ? dataLineCompare : dataLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {true && (
                  <>
                    <Line type="monotone" dataKey="value1" stroke="#8884d8" />
                    <Line type="monotone" dataKey="value2" stroke="#82ca3d" />
                  </>
                )}
                {compare && (
                  <Line type="monotone" dataKey="value3" stroke="#82ca9d" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setCompare(!compare)}
            >
              {compare ? "Hide Comparison" : "Compare"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
