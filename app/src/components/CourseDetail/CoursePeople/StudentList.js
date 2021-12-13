import { Avatar, CardHeader, Divider, Typography } from "@mui/material";
import React from "react";

export default function StudentList({ students }) {
  const color = () => {
    return {
      backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    };
  };
  return (
    <div>
      <Typography color="text.secondary" display="block" variant="caption">
        <strong style={{ fontSize: 16, textDecoration: "underline" }}>
          Danh sách học viên
        </strong>
      </Typography>
      {students && students.length ? (
        students.map((student, index) => (
          <div key={student._id}>
            <CardHeader
              avatar={
                <Avatar style={color()}>
                  {student.name.split(" ").map((s) => s[0])}
                </Avatar>
              }
              title={student.name}
              subheader={student.email}
            />
            {index === students.length - 1 || <Divider />}
          </div>
        ))
      ) : (
        <strong>Lớp học không có học viên</strong>
      )}
    </div>
  );
}
