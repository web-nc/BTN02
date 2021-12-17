import { Paper, TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from "@mui/material";
import RequestRow from './RequestRow';
import React from "react";

const paperStyle = {
    width: "60%",
    margin: "30px auto"
};

export default function RequestDialog({ reviews }) {

    return (
        <Paper elevation={10} style={paperStyle}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    {(reviews.length === 0) && <caption>Chưa có thông tin phúc khảo</caption>}
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '10px' }}/>
                            <TableCell><strong>Tên bài tập</strong></TableCell>
                            <TableCell sx={{ width: '130px' }} align="center"><strong>Điểm ban đầu</strong></TableCell>
                            <TableCell sx={{ width: '130px' }} align="center"><strong>Điểm mong muốn</strong></TableCell>
                            <TableCell sx={{ width: '50px' }} align="center"><strong>Tình trạng</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(reviews.length > 0) && 
                        reviews.map((review) => (
                            <RequestRow key={review._id} review={review} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
