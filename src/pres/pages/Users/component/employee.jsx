import React from "react";
import {
  TableRow,
  TableCell,
  
  Chip,
  IconButton,
  Tooltip
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

import EditSquareIcon from '@mui/icons-material/EditSquare';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function Employee({ data, onDelete, onEdit, onStatusUpdated }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      default:
        return "error";
    }
  };

  


  return (
    <TableRow hover>
      <TableCell>
       {data.id}
      </TableCell>

      <TableCell>{data.name}</TableCell>
                        <TableCell> {data.department}</TableCell>

      <TableCell>
        <Chip
          label={data.role}
          color="primary"
          variant="outlined"
          sx={{ fontSize: 12 }}
        />
      </TableCell>

      <TableCell>{data.email}</TableCell>

    <TableCell>
  <Tooltip title="تغيير الحالة">
    <IconButton size="small" onClick={onStatusUpdated}>
      <SwapVertIcon color="primary" fontSize="small" />
    </IconButton>
  </Tooltip>

  <Chip
    label={data.status}
    color={getStatusColor(data.status)}
    sx={{ fontSize: 12, ml: 1 }}
  />
</TableCell>


      <TableCell align="left">
        <Tooltip title="تعديل">
          <IconButton color="primary" onClick={() => onEdit(data)}>
            <EditSquareIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="حذف">
 <IconButton
            color="error"
            onClick={() => onDelete(data.id)} 
          >            <PersonRemoveIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
