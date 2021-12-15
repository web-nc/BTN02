import { Paper, Card, CardHeader, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getGrades, editGrade, finalizeGrade, finalizeAssignment } from "../../../services/grade";
import { updateGradeBoard } from "../../../services/course";
import CustomColumnMenu from "./CustomColumnMenu";
import { toast } from "react-toastify";
import CustomToolbar from "./CustomToolbar";
import CustomCell from "./CustomCell";
import AddCell from "./AddCell";

const paperStyle = {
  width: "60%",
  margin: "30px auto",
  height: 300,
};
const innerField = {
  marginTop: "0.5rem",
  marginBottom: "0.25rem",
};

export default function GradeBoard({ course, assignments, handleUpdateCourse }) {
  const [rows, setRows] = useState([]);
  const columns = [
    { field: 'studentId', headerName: 'MSSV', width: 120, disableColumnMenu: true },
    { field: 'studentName', headerName: 'Họ tên', flex: 1, minWidth: 200, disableColumnMenu: true },
  ];

  for (const assignment of assignments) {
    columns.push({
      field: assignment._id,
      headerName: assignment.name,
      align: 'center',
      headerAlign: 'center',
      width: 150,
      renderCell: (params) => {
        if (params.value === undefined) {
          return (<AddCell
                    assignmentId={params.field}
                    studentId={params.id}
                    handleEditGrade={handleEditGrade}
                  />);
        }
        return (<CustomCell
                    point={params.value.point}
                    assignmentId={params.field}
                    studentId={params.id}
                    finalized={params.value.finalized}
                    handleEditGrade={handleEditGrade}
                    handleFinalizedGrade={handleFinalizedGrade}
                />);
      }
    });
  }
  columns.push({
    field: 'total',
    headerName: 'Điểm tổng kết',
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    disableColumnMenu: true,
    width: 150,
    renderCell: (params) => {
      return <strong>{calcGPA(params.row)}/100</strong>;
    },
  });

  const calcGPA = (row) => {
    const totalAssignmentsWeight = assignments.reduce((pre, cur) => pre + cur.weight, 0);
    let GPA = 0;
      for (const property in row) {
        if (property !== 'id' && property !== 'studentId' && property !== 'studentName' && row[property].finalized) {
          const assignment = assignments.find(obj => { return obj._id === property });
          GPA = GPA + assignment.weight * row[property].point;
        }
      }
    return GPA = Math.round(GPA / totalAssignmentsWeight);
  }

  const handleEditGrade = (assignment, studentId, point, finalized) => {
    editGrade({ assignment, studentId, point }).then(res => {
      handleUpdateRow(studentId, assignment, { point, finalized});
    }).catch(err => {
      toast.error('Có lỗi xảy ra khi cập nhật!');
    })
  };

  const handleFinalizedGrade = (assignment, studentId, point) => {
    finalizeGrade({ assignment, studentId }).then(res => {
      handleUpdateRow(studentId, assignment, { point, finalized: true });
    }).catch(err => {
      toast.error('Có lỗi xảy ra khi cập nhật!');
    })
  };

  const handleUpdateRow = (id, assignment, data) => {
    setRows((prevRows) => {
      return prevRows.map((row, index) => {
        if (row.id === id) {
          let updatedRow = Object.assign({}, row);
          updatedRow[assignment] = data;
          return updatedRow;
        } else return row;
      });
    });
  };

  const handleUpdateAGradeColumn = (data) => {
    data.forEach((item) => {
      const { studentId, assignment, point } = item;
      if (point && point >= 0 && point <= 100) {
        setRows((prevRows) => {
          return prevRows.map((row) => {
            if (row.id === studentId) {
              let updatedRow = Object.assign({}, row);
              updatedRow[assignment] = point;
              return updatedRow;
            } else return row;
          });
        });

        editGrade({
          assignment,
          studentId,
          point,
        }).catch((err) => {
          toast.error("Có lỗi xảy ra khi cập nhật!");
        });
      }
    });
  };

  const handleFinalizeColumn = (assignmentId) => {
    finalizeAssignment(assignmentId).then(res => {
      setRows((prevRows) => {
        return prevRows.map((row, index) => {
          if (row[assignmentId] !== undefined) {
            let updatedRow = Object.assign({}, row);
            updatedRow[assignmentId].finalized = true;
            return updatedRow;
          } else return row;
        });
      });
    }).catch(err => {
      toast.error('Có lỗi xảy ra khi cập nhật!');
    })
  }

  const handleUpdateStudentList = (data) => {
    updateGradeBoard(course._id, data)
      .then((res) => {
        if (res.status === 200) {
          handleUpdateCourse(res.data.payload);
          toast.success("Tải lên thành công!");
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.warn("Thiếu quyền để thực hiện thao tác");
        }
      });
  };

  useEffect(() => {
    if (course.gradeBoard) {
      setRows(
        course.gradeBoard.map((student) => ({
          ...student,
          id: student.studentId,
        }))
      );
    }

    course._id && getGrades(course._id).then(res => {
      res.data.forEach((grade) => {
        handleUpdateRow(grade.studentId, grade.assignment, { point:grade.point,finalized:grade.finalized});
      });
    })
  }, [course])

  return (
    <div style={paperStyle}>
      <Paper elevation={10} style={innerField}>
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
            rows={rows}
            columns={columns}
            autoHeight
            components={{
              ColumnMenu: CustomColumnMenu,
              Toolbar: CustomToolbar,
            }}
            componentsProps={{
              columnMenu: { onFileSelect: handleUpdateAGradeColumn, onFinalize: handleFinalizeColumn },
              toolbar: { rows: rows, columns: columns, onFileSelect: handleUpdateStudentList },
            }}
          />
        </CardContent>
      </Card>
    </Paper></div>
  );
}
