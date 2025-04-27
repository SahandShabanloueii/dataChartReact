import React, { useState, useEffect } from 'react';
import { read, utils } from 'xlsx';
import SalesChart from './components/SalesChart';
import ProductPieChart from './components/ProductPieChart';
import RegionBarChart from './components/RegionBarChart';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/sample_data.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = read(arrayBuffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let jsonData = utils.sheet_to_json(worksheet);
        // Convert Sales and Profit to numbers
        jsonData = jsonData.map(row => ({
          ...row,
          Sales: Number(row.Sales),
          Profit: Number(row.Profit)
        }));
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error reading Excel file:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-800">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Sales Dashboard
        </h1>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <SalesChart data={data} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <ProductPieChart data={data} />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <RegionBarChart data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
