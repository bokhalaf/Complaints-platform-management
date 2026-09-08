// pres/components/dashboard/EmployeePerformanceChart.jsx

import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

const generateRandomData = () => {
  const names = ["أحمد", "سارة", "محمد", "لين", "خالد", "نور"];

  return names.map((name) => ({
    name,
    value: Math.floor(Math.random() * 90) + 10, 
  }));
};

export default function EmployeePerformanceChart({ data = generateRandomData() }) {
  const greenColor = "#519c55ff";

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: "16px",
        bgcolor: "#ffffff",
        boxShadow: 1,
        width: "95%",
        height: 380,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          أداء الموظفين
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: greenColor,
              borderRadius: "4px",
            }}
          />
          <Typography sx={{ fontSize: 14, color: "#444" }}>شكاوي مكتملة</Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 20, bottom: 10, left: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

            <XAxis type="number" tick={{ fontSize: 13, fill: "#555" }} />

            <YAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 14, fill: "#333" }}
              width={70}
                dx={-75}

            />

            <Tooltip
              contentStyle={{
                borderRadius: 8,
                backgroundColor: "white",
                border: "1px solid #ddd",
              }}
            />

            <Bar dataKey="value" barSize={20} radius={[20, 20, 20, 20]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={greenColor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
