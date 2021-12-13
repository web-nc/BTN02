import { Card, CardContent, CardHeader, Divider, Grid, Paper } from "@mui/material";
import React from "react";
import StudentList from "./StudentList";
import TeacherList from "./TeacherList";

export default function CoursePeople({ course }) {
  const { teachers, students } = course;
  const paperStyle = {
    width: "60%",
    margin: "30px auto",
    paddingBottom: "30px",
  };
  return (
    <Paper elevation={10} style={paperStyle}>
      <Grid align="center">
        <Grid item xs={11} align="start" sx={{ paddingTop: "20px" }}>
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
            <Divider></Divider>
            <CardContent>
              <TeacherList teachers={teachers} owner={course.owner} />
              <StudentList students={students} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
}
