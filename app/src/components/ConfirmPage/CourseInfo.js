import React from "react";
import { Card, CardHeader, CardContent, Divider, Grid } from '@mui/material'
import CardContentTeacher from './Teacher/CardContent';
import CardContentStudent from './Student/CardContent';

function CourseInfo({ course, teacher = false }) {
    return (
        <Grid item xs={6} align='start' sx={{ paddingTop: '20px' }}>
            <Card >
                <CardHeader 
                    sx={{ backgroundColor: '#f6f2f7'}}
                    title={<strong>[{course.briefName}] {course.name}</strong>}
                    subheader={"Người tạo lớp: " + (course.owner ? course.owner.name : "")}
                />
                <Divider></Divider>
                <CardContent>
                { teacher ? <CardContentTeacher teachers={course.teachers} /> : <CardContentStudent details={course.details} /> }
                </CardContent>
                </Card>
        </Grid>
    );
}

export default CourseInfo;