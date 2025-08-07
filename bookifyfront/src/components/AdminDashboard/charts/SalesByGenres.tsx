import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Heading, Select as ChakraSelect } from "@chakra-ui/react";
import { BASE_URL } from "../../../config/config";

const COLORS = [
  "#42A5F5",
  "#66BB6A",
  "#FFCA28",
  "#EC407A",
  "#AB47BC",
  "#26C6DA",
];

interface GenresChartOptions {
  label: string;
  value: string;
}

const SalesByGenres = () => {
  const scaleOptions: GenresChartOptions[] = [
    { label: "count", value: "count" },
    { label: "revenue", value: "revenue" },
  ];
  const [countwiseData, setCountWiseData] =
    useState<{ data: number; genre: string }[]>();
  const user: User | null = useSelector(
    (state: { userReducer: StateType }) => state.userReducer.user
  );
  const [scaleType, setScaleType] = useState<string>("count");
  const getDataForChart = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: {
        scale: scaleType,
      },
    };
    const { data } = await axios.get(
      `${BASE_URL}/charts/sale_genre_wise/count`,
      config
    );
    console.log(data);
    setCountWiseData(data);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = scaleOptions.find(
      (opt) => opt.value === event.target.value
    );
    if (selected) setScaleType(selected.value);
  };

  useEffect(() => {
    getDataForChart();
  }, [scaleType]);
  return (
    <Box width="100%" maxW="100%" px={4}>
      <Heading size="md" mb={4}>
        Genre-wise Sales Distribution
      </Heading>
      <Box maxW="200px" mb={6}>
        <ChakraSelect
          value={scaleType}
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
      <ResponsiveContainer width="100%" height={450}>
        <PieChart>
          <Pie
            data={countwiseData}
            dataKey="data"
            nameKey="genre"
            cx="50%"
            cy="50%"
            outerRadius={160} // 🔼 increased
            innerRadius={80} // optional, for donut effect
            fill="#8884d8"
            label={({ genre, percent }) =>
              `${genre} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {countwiseData?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SalesByGenres;
