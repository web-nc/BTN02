import { Paper, Card, CardHeader, CardContent, IconButton, Tooltip } from "@mui/material";
import RateReviewIcon from '@mui/icons-material/RateReview';
import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { studentGetGrades } from "../../../services/grade";

export default function StudentGrade({ course, assignments }) {
  
  const paperStyle = {
    width: "60%",
    margin: "30px auto"
  };

  const [rows, setRows] = useState([]);
  const [GPA, setGPA] = useState(0);

  const totalAssignmentsWeight = assignments.reduce((pre, cur) => pre + cur.weight, 0);

  const handleReviewRequest = (value) => {
    console.log('You sent a review request: ' + value);
  }

  const columns = [
      { field: 'name', headerName: 'Tên bài tập', sortable: false, flex: 1 },
      { field: 'weight', headerName: 'Hệ số điểm', sortable: false, width: 150, align: 'center', headerAlign: 'center'},
      { field: 'point', headerName: 'Điểm', sortable: false, width: 100, align: 'center', headerAlign: 'center'},
      { 
        field: 'review',
        headerName: 'Phúc khảo',
        sortable: false,
        width: 100,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
          if (params.row.point === '-') {
            return (<IconButton disabled color="secondary" >
                      <RateReviewIcon />
                    </IconButton>);
          }
          return (<Tooltip title="Phúc khảo">
                    <IconButton onClick={() => handleReviewRequest(params.id)} color="secondary" >
                      <RateReviewIcon />
                    </IconButton>
                  </Tooltip>);
        }
      },
  ];

  const handleUpdateRow = (id, point) => {
    setRows((prevRows) => {
      return prevRows.map((row, index) => {
        if (row.id === id) {
          return {...row, point: point};
        }
        else return row;
      });
    });
  };

  useEffect(() => {
    setRows((assignments.map((assignment) => ({
      id:assignment._id, name: assignment.name, weight: assignment.weight, point: '-'
    }))));

    course._id && studentGetGrades(course._id).then(res => {
      setGPA(0);
      res.data.forEach((grade) => {
        handleUpdateRow(grade.assignment, grade.point);
        if (!isNaN(grade.point)) {
          const assignment = assignments.find(obj => { return obj._id === grade.assignment });
          const updatedGPA = grade.point * assignment.weight / totalAssignmentsWeight;
          setGPA(prevGPA=> prevGPA+updatedGPA);
        }
      });
    });

  }, [assignments, course, totalAssignmentsWeight]);

  return (
    <Paper elevation={10} style={paperStyle}>
      <Card>
        <CardHeader
          sx={{ backgroundColor: "#f6f2f7", textAlign: "center" }}
          title={
            <strong>
              [{course.briefName}] {course.name}
            </strong>
          }
          subheader={"Người tạo lớp: " + (course.owner ? course.owner.name : "")}
        />

        <CardContent>
          <DataGrid 
              sx={{ marginBottom: '10px' }}
              rows={rows}
              columns={columns}
              disableColumnMenu
              hideFooter
              autoHeight/>
          <strong>Điểm tổng kết: {Math.round(GPA)}/100</strong>
        </CardContent>
      </Card>
    </Paper>
  );
}
