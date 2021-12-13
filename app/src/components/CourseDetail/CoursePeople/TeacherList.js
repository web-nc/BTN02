import { Avatar, CardHeader, Divider, Grid, Typography } from "@mui/material";
import React from "react";

export default function TeacherList({ teachers, owner }) {
  const color = () => {
    return {
      backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    };
  };

  return (
    <div>
      <Typography color="text.secondary" display="block" variant="caption">
        <strong style={{ fontSize: 16, textDecoration: "underline" }}>
          Danh sách giáo viên
        </strong>
      </Typography>
      {owner && (
        <div className="owner">
          <Grid container spacing={2}>
            <Grid item xs={4.5}>
              <CardHeader
                key={owner._id}
                avatar={
                  <Avatar style={color()}>
                    {owner.name.split(" ").map((s) => s[0])}
                  </Avatar>
                }
                title={owner.name}
                subheader={owner.email}
              />
            </Grid>
            <Grid item xs={4} sx={{ marginTop: 3.5, fontSize: 12 }}>
              (Sở hữu)
            </Grid>
          </Grid>
          <Divider />
        </div>
      )}
      {teachers &&
        teachers.length > 0 &&
        teachers.map((teacher, index) => (
          <div className="teacher" key={teacher._id}>
            <CardHeader
              avatar={
                <Avatar style={color()}>
                  {teacher.name.split(" ").map((s) => s[0])}
                </Avatar>
              }
              title={teacher.name}
              subheader={teacher.email}
            />
            {index === teachers.length - 1 || <Divider />}
          </div>
        ))}
    </div>
  );
}
