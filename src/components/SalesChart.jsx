import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// A palette of visually distinct colors
const COLORS = [
  '#0088FE', // blue
  '#00C49F', // green
  '#FFBB28', // orange
  '#FF8042', // red-orange
  '#A020F0', // purple
  '#FF4444', // red
  '#FFB6C1', // pink
  '#7B68EE', // medium slate blue
  '#FFD700', // gold
  '#20B2AA', // light sea green
];

const SalesChart = ({ data }) => {
  // Get all unique products
  const products = Array.from(new Set(data.map(item => item.Product)));

  // Process data to get monthly sales by product
  const processData = () => {
    const monthlyData = {};
    data.forEach(item => {
      if (!monthlyData[item.Month]) {
        monthlyData[item.Month] = { Month: item.Month };
        products.forEach(product => {
          monthlyData[item.Month][product] = 0;
        });
      }
      monthlyData[item.Month][item.Product] += item.Sales;
    });
    return Object.values(monthlyData);
  };

  const chartData = processData();

  return (
    <div className="w-full h-[400px]">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Monthly Sales by Product
      </h2>
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {products.map((product, idx) => (
              <Line
                key={product}
                type="monotone"
                dataKey={product}
                stroke={COLORS[idx % COLORS.length]}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart; 