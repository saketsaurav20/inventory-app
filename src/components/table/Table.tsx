/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";


type TableProps = {
  columns: Record<string,any>[];
  data: Record<string,any>[];
  onEdit?: (row: any) => void;
  onView?: (row: any) => void;
  onDelete?: (row: any) => void;
  isAdmin?: boolean;
};

const ReusableTable = ({
  isAdmin,
  columns,
  data,
  onEdit,
  onDelete,
}: TableProps) => {
  const [disabledRows, setDisabledRows] = useState<Set<number>>(new Set());

  const toggleRowDisable = (rowIndex: number) => {
    setDisabledRows((prev) => {
      const updated = new Set(prev);
      if (updated.has(rowIndex)) {
        updated.delete(rowIndex);
      } else {
        updated.add(rowIndex);
      }
      return updated;
    });
  };

  return (
    <TableContainer className="shadow-md rounded-lg bg-gray-900 text-white">
      {data.length === 0 ? (
        <div className="text-center py-4 text-gray-500 text-lg">
          No data available
        </div>
      ) : (
        <Table>
          {/* Table Header */}
          <TableHead className="bg-gray-800">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className="text-limeGreen font-semibold"
                >
                  {column.title}
                </TableCell>
              ))}
              <TableCell className="text-limeGreen font-semibold">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {data.map((row, rowIndex) => {
              const isDisabled = disabledRows.has(rowIndex);

              return (
                <TableRow
                  key={rowIndex}
                  className={`hover:bg-gray-700 ${
                    isDisabled ? "opacity-50" : ""
                  }`}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} className="text-gray-100">
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </TableCell>
                  ))}
                  <TableCell className="space-x-2">
                    <IconButton
                      onClick={() => onEdit?.(row)}
                      disabled={!isAdmin || isDisabled}
                      style={{
                        color: !isAdmin || isDisabled ? "#ffffff61" : "green",
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => toggleRowDisable(rowIndex)}
                      disabled={!isAdmin}
                      sx={{
                        color: isAdmin ? "#d8b4f8" : "#ffffff61",
                        "&.Mui-disabled": {
                          color: "#ffffff61",
                        },
                      }}
                    >
                      {disabledRows.has(rowIndex) ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                    <IconButton
                      onClick={() => onDelete?.(row)}
                      disabled={!isAdmin || isDisabled}
                      style={{
                        color: !isAdmin || isDisabled ? "#ffffff61" : "red",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default ReusableTable;
