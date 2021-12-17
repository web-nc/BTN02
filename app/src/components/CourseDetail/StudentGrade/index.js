import { Paper, Card, CardHeader, CardContent, IconButton, Tooltip } from "@mui/material";
import RateReviewIcon from '@mui/icons-material/RateReview';
import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { studentGetGrades } from '../../../services/grade';
import { newReviewRequest, getMyReviewRequest } from '../../../services/review';
import RequestDialog from './RequestDialog';
import ReviewRequest from './ReviewRequest';
import { toast } from "react-toastify";

const paperStyle = {
  width: "60%",
  margin: "30px auto"
};

export default function StudentGrade({ course, assignments }) {
  const [rows, setRows] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [GPA, setGPA] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null)

  const handleDialogOpen = (assignmentId, currPoint) => {
    setSelectedAssignment(assignmentId);
    setCurrentPoint(currPoint);
    setIsDialogOpen(true);
  }

  const handleDialogClose = () => {
    setSelectedAssignment(null);
    setCurrentPoint(null);
    setIsDialogOpen(false);
  }

  const handleReviewRequest = (expectedPoint, explanation) => {
    newReviewRequest({
      assignment: selectedAssignment,
      currentPoint,
      expectedPoint,
      explanation
    }).then(res => {
      if (res.data.successful) {
        toast.success('Gửi yêu cầu thành công!');
        let newReview = res.data.newReview;
        const assignment = assignments.find(obj => { return obj._id === newReview.assignment });
        newReview.assignment = assignment.name;
        setReviews([...reviews, newReview]);
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => {
      toast.error('Có lỗi xảy ra trong lúc gửi yêu cầu!');
    });
    setSelectedAssignment(null);
    setCurrentPoint(null);
    setIsDialogOpen(false);
  }

  const totalAssignmentsWeight = assignments.reduce((pre, cur) => pre + cur.weight, 0);

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
                    <IconButton onClick={() => handleDialogOpen(params.id, params.row.point)} color="secondary" >
                      <RateReviewIcon />
                    </IconButton>
                  </Tooltip>);
        }
      },
  ];

  const handleUpdateRow = (id, point) => {
    setRows((prevRows) => {
      return prevRows.map((row) => {
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

    course._id && getMyReviewRequest(course._id).then(res => {
      setReviews(res.data.map((review) => {
        const assignment = assignments.find(obj => { return obj._id === review.assignment });
        review.assignment = assignment.name;
        return review;
      }));
    });
  }, [assignments, course, totalAssignmentsWeight]);

  return (
    <div>
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

      <RequestDialog openDialog={isDialogOpen} handleDialogClose={handleDialogClose} sendReviewRequest={handleReviewRequest} />
      <ReviewRequest reviews={reviews} />
    </div>
  );
}
