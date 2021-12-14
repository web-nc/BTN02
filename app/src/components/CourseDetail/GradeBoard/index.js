/* eslint-disable no-loop-func */
import { Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { getGrades } from "../../../services/grade";
import DownloadTemplateButton from "./DownloadTemplateButton";

const paperStyle = {
  width: "60%",
  margin: "30px auto",
  height: 300,
};

const innerField = {
  marginTop: "0.5rem",
  marginBottom: "0.25rem",
}

export default function GradeBoard({ course, assignments }) {
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
    <div style={paperStyle}>
      <div style={{ ...innerField, display: "flex", alignContent: "center", flexDirection: "row" }}>
        <div style={{ margin: "0 0.25rem" }}>
          <DownloadTemplateButton indexCols={rows} />
        </div>
      </div>
      <Paper style={innerField} elevation={10}>
        <DataGrid rows={rows} columns={columns} disableColumnMenu autoHeight/>
      </Paper>
    </div>
  );
}
