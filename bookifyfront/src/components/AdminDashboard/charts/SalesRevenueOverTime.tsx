import React, { useEffect, useState } from "react";
import { Box, Heading, Select as ChakraSelect } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ScaleOptionsType {
  label: string;
  value: string;
}
const SalesRevenueOverTime = () => {
  const [scale, setScale] = useState<ScaleOptionsType[]>([
    { label: "date", value: "date" },
  ]);

  const user: User | null = useSelector(
    (state: { userReducer: StateType }) => state.userReducer.user
  );

  const [salesData, setSalesData] = useState<
    { date: string; revenue: number }[]
  >([]);

  const getDataForChart = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: {
        scale: scale[0].value,
      },
    };
    const { data } = await axios.get(
      "http://localhost:2000/api/charts/sale_over_time/revenue",
      config
    );
    setSalesData(data);
  };

  useEffect(() => {
    getDataForChart();
  }, [scale]);

  const scaleOptions: ScaleOptionsType[] = [
    { label: "date", value: "date" },
    { label: "month", value: "month" },
    { label: "year", value: "year" },
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = scaleOptions.find(
      (opt) => opt.value === event.target.value
    );
    if (selected) setScale([selected]);
  };

  return (
    <Box bg="gray.50" p={6} borderRadius="lg" boxShadow="md" mt={6}>
      <Heading size="md" mb={4} color="gray.700">
        Sales Overview revenue
      </Heading>

      {/* Chakra UI Select */}
      <Box maxW="200px" mb={6}>
        <ChakraSelect
          value={scale[0].value}
          onChange={handleSelectChange}
          borderRadius="md"
          borderColor="gray.300"
          size="sm"
        >
          {scaleOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </ChakraSelect>
      </Box>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={salesData}
          margin={{ top: 30, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#42A5F5"
            strokeWidth={2}
            dot={{
              r: 4,
              stroke: "#1DE9B6",
              strokeWidth: 2,
              fill: "#fff",
            }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SalesRevenueOverTime;
