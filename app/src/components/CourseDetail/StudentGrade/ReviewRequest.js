import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import RequestRow from "./RequestRow";

const paperStyle = {
  width: "60%",
  margin: "30px auto",
};

export default function RequestDialog({ reviews }) {
  return (
    <Paper elevation={10} style={paperStyle}>
      <Typography
        sx={{
          fontWeight: "bold",
          marginBottom: 1.5,
          fontSize: "20px",
          textDecoration: "underline",
          marginLeft: 1.75,
          paddingTop: 2,
        }}
      >
        Danh sách phúc khảo
      </Typography>
      <Divider />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          {reviews.length === 0 && (
            <caption>Chưa có thông tin phúc khảo</caption>
          )}
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "10px" }} />
              <TableCell>
                <strong>Tên bài tập</strong>
              </TableCell>
              <TableCell sx={{ width: "130px" }} align="center">
                <strong>Điểm ban đầu</strong>
              </TableCell>
              <TableCell sx={{ width: "130px" }} align="center">
                <strong>Điểm mong muốn</strong>
              </TableCell>
              <TableCell sx={{ width: "50px" }} align="center">
                <strong>Tình trạng</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.length > 0 &&
              reviews.map((review) => (
                <RequestRow key={review._id} review={review} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
