import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
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

const ProductPieChart = ({ data }) => {
  // Process data to get total sales by product
  const processData = () => {
    const productData = {};
    
    data.forEach(item => {
      if (!productData[item.Product]) {
        productData[item.Product] = 0;
      }
      productData[item.Product] += item.Sales;
    });

    return Object.entries(productData).map(([name, value]) => ({
      name,
      value
    }));
  };

  const chartData = processData();

  return (
    <div className="w-full h-[400px]">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Sales Distribution by Product
      </h2>
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductPieChart; 