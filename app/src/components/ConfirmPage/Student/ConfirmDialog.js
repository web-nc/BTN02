import React from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, Box, Typography, Button } from '@mui/material'

import CourseInfo from "../CourseInfo";
import { getCourses, joinCourse } from "../../../services/course";
import { useDispatch } from "react-redux";

function ConfirmDialog({ code, course }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const course = useSelector((state) => state.course.item);
    const typoStyle =  {color: '#976363', marginBottom: '10px'};
    const logoStyle = {height: '100px', marginBottom: '10px'};
    const paperStyle={ width:'50%', margin:"30px auto", paddingBottom: '30px' };
    
    const handleConfirmJoin = () => {
        joinCourse(code)
            .then((res) => {
                dispatch(async (dispatch) => {
                    return getCourses().then((res) => {
                        dispatch({ type: "COURSES_REFRESHED", payload: res.data.payload });
                    });
                });
                navigate("/course/" + res.data.payload._id + "/info");
            })
            .catch((e) => {
                if (e.response) {
                // Request made and server responded
                console.log(e.response.data.message);
                console.log(e.response.status);
                console.log(e.response.headers);
                }
        });
    }

    return (
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <Box sx={{paddingTop: '30px', paddingBottom: '20px', backgroundColor: '#f7eeee'}}>
                <img src="/static/images/logo.png" alt="logo" style={logoStyle}/>
                <Typography variant="subtitle1" component="div" style={typoStyle}>
                    Bạn nhận được lời mời tham gia lớp học trên hệ thống của chúng tôi
                </Typography>
                </Box>

                <CourseInfo course={course} />

                <Button
                    onClick={handleConfirmJoin}
                    variant="contained"
                    sx={{ margin: '30px auto 10px auto' }}>
                    Xác nhận tham gia
                </Button>
                <Typography variant="subtitle2" component="div" style={typoStyle}>
                    Tham gia với tư cách là học sinh
                </Typography>
            </Grid>
        </Paper>
    );
}

export default ConfirmDialog;