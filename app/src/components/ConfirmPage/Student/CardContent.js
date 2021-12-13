import React from "react";
import { Typography } from '@mui/material'

function CourseInfo({ details }) {
    return (
        <div>
            <Typography color="text.secondary" display="block" variant="caption" >
                Chi tiết lớp học
            </Typography>
            {details}
        </div>
    );
}

export default CourseInfo;