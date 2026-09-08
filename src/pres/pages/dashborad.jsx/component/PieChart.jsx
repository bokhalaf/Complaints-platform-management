// pres/components/dashboard/PieChart.jsx
import { Box, Typography } from "@mui/material";
import { PieChart as RePieChart, Pie, Cell, Legend } from "recharts";

export default function PieChart({ data }) {
  return (
    <Box sx={{ p: 2, borderRadius: 2, bgcolor: "#fff", boxShadow: 1 }}>
      <Typography variant="h6" mb={1}>
        حالة الشكاوي
      </Typography>

      <RePieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>

        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="circle"
        />
      </RePieChart>
    </Box>
  );
}
