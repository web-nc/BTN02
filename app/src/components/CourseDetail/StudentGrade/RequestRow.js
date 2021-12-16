import { Box, Typography, TableCell, TableRow, IconButton, Collapse, Chip } from "@mui/material";
import React from "react";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function RequestRow({ review }) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                {review.assignment}
                </TableCell>
                <TableCell align="center">{review.currentPoint}</TableCell>
                <TableCell align="center">{review.expectedPoint}</TableCell>
                <TableCell align="center">
                    {review.reviewed ? (
                        <Chip icon={<CheckCircleOutlinedIcon />} size="small" label="Đã xử lí" color="success" />
                    ) : (
                        <Chip icon={<ChangeCircleOutlinedIcon />} size="small" label="Đang xử lí" color="info" />
                    )}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit sx={{ padding: '16px 64px' }}>
                    <Box className="flex">
                        <Typography variant="subtitle2" sx={{ width: '30%', flexShrink: 0 }}>
                            <strong><i>Lý do</i></strong>
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            <strong>{review.explanation}</strong>
                        </Typography>
                    </Box>
                    <Box className="flex">
                        <Typography variant="subtitle2" sx={{ width: '30%', flexShrink: 0 }}>
                            <strong><i>Nhận xét của giáo viên</i></strong>
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            <strong>{review.reviewed ? review.teacherComment : 'Đang xử lí'}</strong>
                        </Typography>
                    </Box>
                    <Box className="flex">
                        <Typography variant="subtitle2" sx={{ width: '30%', flexShrink: 0 }}>
                            <strong><i>Điểm sau khi chấm lại</i></strong>
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            <strong>{review.reviewed ? review.updatedGrade : 'Đang xử lí'}</strong>
                        </Typography>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}