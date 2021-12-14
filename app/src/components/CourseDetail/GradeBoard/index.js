/* eslint-disable no-loop-func */
import { Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { getGrades } from "../../../services/grade";

export default function GradeBoard({ course, assignments }) {
  const paperStyle = {
    width: "60%",
    margin: "30px auto",
    height: 300,
  };

  const [rows, setRows] = useState(
    course.gradeBoard ?
    (course.gradeBoard.map((student) => ({
      ...student,
      id:student.studentId
    }))) : []
  );

  const columns = [
          { field: 'studentId', headerName: 'MSSV' },
          { field: 'studentName', headerName: 'Họ tên', width: 200 },
  ];

  for (const assignment of assignments) {
    columns.push({
      field: assignment._id,
      headerName: assignment.name,
      renderCell: (params) => {
        if (params.value === undefined) {
          return '-';
        }
        return params.value;
      }
    });
  }
  columns.push({ field: 'total', headerName: 'Điểm tổng kết' })

  return (
    <Paper elevation={10} style={paperStyle}>
      <DataGrid rows={rows} columns={columns} disableColumnMenu autoHeight/>
    </Paper>
  );
}
