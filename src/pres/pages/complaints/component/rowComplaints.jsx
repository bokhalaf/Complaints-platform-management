import React from "react";
import { TableRow, TableCell, Chip, IconButton, Tooltip } from "@mui/material";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
export default function ComplaintRow({ data, onDelete, onEdit }) {

  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <TableRow hover>
      <TableCell>#{data.id}</TableCell>
      <TableCell>{data.citizen}</TableCell>
      <TableCell>{data.type}</TableCell>
      <TableCell>{data.date}</TableCell>
      <TableCell>
        <Chip label={data.status} color={getStatusColor(data.status)} sx={{ fontSize: 12 }} />
      </TableCell>

      <TableCell align="center">
        {onEdit && (
          <Tooltip title="تعديل">
            <IconButton color="primary" onClick={() => onEdit(data)}>
              <EditSquareIcon />
            </IconButton>
          </Tooltip>
        )}
        {onDelete && (
          <Tooltip title="حذف">
            <IconButton color="error" onClick={() => onDelete(data.id)}>
              <RemoveCircleIcon />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
}
