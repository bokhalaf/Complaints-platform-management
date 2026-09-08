import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Pagination,
  Stack,
} from "@mui/material";

export default function DynamicTable({ columns, rows, pagination }) {
  return (
    <Box>
      <Table>
       <TableHead>
  <TableRow
    sx={{
      backgroundColor: "#f5f6fa",
    }}
  >
    {columns.map((col, index) => (
      <TableCell
        key={index}
        align="center"
        
        sx={{
          gap:"1",
          verticalAlign: "middle",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          justifyContent="left"
        >
          {col.icon && (
            <Box sx={{ color: "#000" }}>
              {col.icon}
            </Box>
          )}
          <span>{col.label}</span>
        </Stack>
      </TableCell>
    ))}
  </TableRow>
</TableHead>


        <TableBody>{rows}</TableBody>
      </Table>

      {pagination && (
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            count={pagination.count}
            page={pagination.page}
            onChange={pagination.onChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
