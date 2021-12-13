import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function InfoGrade({ assignments }) {
  
  const info = (assignments.length > 0) ? (assignments.map((item, index) => {
    return (
      <Typography key={index} variant="h6" color="black">
        {item.name}: {item.weight}
      </Typography>
    );
  })) : 'Chưa có cấu trúc điểm'

  return (
    <Card sx={{ marginTop: 2 }}>
      <Box sx={{ width: "90%", mx: "auto" }}>
        <Typography variant="h5" color="primary">
          Cấu trúc điểm
        </Typography>
        {info}
      </Box>
    </Card>
  );
}

export default InfoGrade;
