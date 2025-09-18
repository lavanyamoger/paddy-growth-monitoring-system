import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Label,
} from 'recharts';
import { CropData } from '../types';

interface GrowthChartProps {
  data: CropData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <p className="label font-semibold">{`Date: ${label}`}</p>
        <p className="text-green-500">{`Height: ${payload[0].value} cm`}</p>
        <p className="text-blue-500">{`Leaf Area: ${payload[1].value} cm²`}</p>
      </div>
    );
  }
  return null;
};

const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  if (data.length < 2) {
    return (
      <div className="text-center text-gray-500 p-8">
        Need at least two data points to draw a chart.
      </div>
    );
  }

  const formattedData = data.map(d => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis yAxisId="left" stroke="#10B981" tick={{ fontSize: 12 }}>
          <Label value="Height (cm)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
        </YAxis>
        <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" tick={{ fontSize: 12 }}>
          <Label value="Leaf Area (cm²)" angle={90} position="insideRight" style={{ textAnchor: 'middle' }} />
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Line yAxisId="left" type="monotone" dataKey="height" name="Height (cm)" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        <Line yAxisId="right" type="monotone" dataKey="leafArea" name="Leaf Area (cm²)" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GrowthChart;