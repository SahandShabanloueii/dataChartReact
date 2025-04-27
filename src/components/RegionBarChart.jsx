import React from 'react';
import {
  BarChart,
  Bar,
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

const RegionBarChart = ({ data }) => {
  // Get all unique products
  const products = Array.from(new Set(data.map(item => item.Product)));

  // Process data to get sales by region
  const processData = () => {
    const regionData = {};
    data.forEach(item => {
      if (!regionData[item.Region]) {
        regionData[item.Region] = { Region: item.Region };
        products.forEach(product => {
          regionData[item.Region][product] = 0;
        });
      }
      regionData[item.Region][item.Product] += item.Sales;
    });
    return Object.values(regionData);
  };

  const chartData = processData();

  return (
    <div className="w-full h-[400px]">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Sales by Region
      </h2>
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Region" />
            <YAxis />
            <Tooltip />
            <Legend />
            {products.map((product, idx) => (
              <Bar
                key={product}
                dataKey={product}
                fill={COLORS[idx % COLORS.length]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RegionBarChart; 