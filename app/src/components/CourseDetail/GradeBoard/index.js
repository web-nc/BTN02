import { Paper, Card, CardHeader, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getGrades, editGrade } from "../../../services/grade";
import { updateGradeBoard } from "../../../services/course";
import CustomColumnMenu from "./CustomColumnMenu";
import { toast } from "react-toastify";
import CustomToolbar from "./CustomToolbar";

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
  const calcGPA = (row) => {
    const totalAssignmentsWeight = assignments.reduce((pre, cur) => pre + cur.weight, 0);
    let GPA = 0;
    for (const property in row) {
      if (property !== "id" && property !== "studentId" && property !== "studentName") {
        const assignment = assignments.find((obj) => {
          return obj._id === property;
        });
        GPA = GPA + assignment.weight * row[property];
      }
    }
    return (GPA = Math.round(GPA / totalAssignmentsWeight));
  };

  const handleEditCell = React.useCallback(async (params) => {
    editGrade({
      assignment: params.field,
      studentId: params.id,
      point: params.value,
    }).catch((err) => {
      toast.error("Có lỗi xảy ra khi cập nhật!");
    });
  }, []);

  const [rows, setRows] = useState([]);

  const columns = [
    { field: "studentId", headerName: "MSSV" },
    { field: "studentName", headerName: "Họ tên", width: 200 },
  ];

  for (const assignment of assignments) {
    columns.push({
      field: assignment._id,
      headerName: assignment.name,
      editable: true,
      preProcessEditCellProps: (params) => {
        const hasError =
          isNaN(params.props.value) ||
          params.props.value > 100 ||
          params.props.value < 0 ||
          params.props.value.length === 0;
        return { ...params.props, error: hasError };
      },
      renderCell: (params) => {
        if (params.value === undefined) {
          return "-";
        }
        return params.value;
      },
    });
  }
  columns.push({
    field: "total",
    headerName: "Điểm tổng kết",
    renderCell: (params) => {
      return <strong>{calcGPA(params.row)}/100</strong>;
    },
  });

  const handleUpdateRow = (id, assignment, point) => {
    setRows((prevRows) => {
      return prevRows.map((row, index) => {
        if (row.id === id) {
          let updatedRow = Object.assign({}, row);
          updatedRow[assignment] = point;
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

    course._id &&
      getGrades(course._id).then((res) => {
        res.data.forEach((grade) => {
          handleUpdateRow(grade.studentId, grade.assignment, grade.point);
        });
      });
  }, [course._id, course.gradeBoard]);

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
              onSelectionModelChange={(newSelection, a) => {
                console.log(newSelection, a);
              }}
              onCellEditCommit={handleEditCell}
              autoHeight
              components={{
                ColumnMenu: CustomColumnMenu,
                Toolbar: CustomToolbar,
              }}
              componentsProps={{
                columnMenu: { onFileSelect: handleUpdateAGradeColumn },
                toolbar: { rows: rows, columns: columns, onFileSelect: handleUpdateStudentList },
              }}
            />
          </CardContent>
        </Card>
      </Paper>
    </div>
  );
}
