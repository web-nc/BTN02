import React from "react";
import { CardHeader, Typography, Avatar } from '@mui/material'

function CourseInfo({ teachers }) {
    const avatarBg = {backgroundColor: '#ae8ae7'}

    return (
        <div>
            <Typography color="text.secondary" display="block" variant="caption" >
                Danh sách giáo viên cộng tác
            </Typography>
            {(teachers && teachers.length) ? teachers.map((teacher) => (
                <CardHeader key={teacher._id}
                    avatar={
                        <Avatar style={avatarBg}>
                            {teacher.name.split(' ').map((s) => s[0])}
                        </Avatar>
                    }
                    title={teacher.name}
                    subheader={teacher.email}
                />
            )) : "Lớp học chưa có giáo viên cộng tác"}
        </div>
    );
}

export default CourseInfo;