import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts";

const DashboardCard = ({
  title,
  items,
  defaultRepresentation,
  availableRepresentations,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [representation, setRepresentation] = useState(defaultRepresentation);

  const dataLine = [
    { name: "Jan", value1: 400, value2: 200 },
    { name: "Feb", value1: 300, value2: 300 },
    { name: "Mar", value1: 200, value2: 1000 },
    { name: "Apr", value1: 100, value2: 200 },
    { name: "May", value1: 500, value2: 200 },
    { name: "Jun", value1: 600, value2: 400 },
    { name: "Jul", value1: 700, value2: 200 },
    { name: "Aug", value1: 800, value2: 600 },
    { name: "Sep", value1: 900, value2: 300 },
    { name: "Oct", value1: 1000, value2: 200 },
    { name: "Nov", value1: 1100, value2: 1000 },
    { name: "Dec", value1: 1250, value2: 200 },
  ];

  const dataPie = [
    { name: "Category 1", value: 400 },
    { name: "Category 2", value: 300 },
    { name: "Category 3", value: 200 },
    { name: "Category 4", value: 500 },
    { name: "Category 5", value: 600 },
  ];

  const renderChart = () => {
    switch (representation) {
      case "linechart":
        return (
          <LineChart data={dataLine}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value1" stroke="#8884d8" />
            <Line type="monotone" dataKey="value2" stroke="#82ca3d" />
          </LineChart>
        );
      case "piechart":
        return (
          <PieChart>
            <Pie dataKey="value" data={dataPie} fill="#8884d8" label />
            <Tooltip />
            <Legend />
          </PieChart>
        );
      // Add cases for other supported chart types here
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-1 bg-gray-100 min-h-screen w-full">
      {/* <div className="flex-1 max-w-7xl w-full mx-auto my-6 sm:px-6 lg:px-8">
        <div className="mx-auto my-6 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
          <div className="bg-white rounded-lg p-6 m-2">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Data Representation
            </h3>
            <div
              className={`${
                showMenu
                  ? "hidden md:block md:w-full md:h-full"
                  : "relative w-full h-full"
              }`}
            >
              <ResponsiveContainer width="100%" height={300}>
                {renderChart()}
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold px-6 p-4 rounded-lg"
                onClick={() => setShowMenu(!showMenu)}
              >
                {showMenu ? "Hide Menu" : "Show Menu"}
              </button>
            </div>
            {showMenu && (
              <ul className="mt-4">
                {items.map((item, index) => (
                  <li key={index} className="text-gray-800">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardCard;
