import React from "react";
import { Paper, Grid, Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

function InvalidCode() {
    const typoStyle =  {color: '#976363', margin: 'auto 100px'};
    const logoStyle = {height: '100px', marginBottom: '40px'};
    const paperStyle={ width:'50%', margin:"30px auto", padding: '30px' };
    
    return (
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <Box sx={{paddingTop: '30px', paddingBottom: '20px'}}>
                <img src="/static/images/oops.png" alt="logo" style={logoStyle}/>
                <Typography variant="subtitle1" component="div" style={typoStyle}>
                    Đường dẫn để tham gia vào lớp học của bạn không đúng với bất kì lớp học nào, vui lòng kiểm tra lại!
                </Typography>
                </Box>

                <Button component={Link} to='/' variant="contained" sx={{ margin: '30px auto 10px auto' }}>
                    Quay lại trang chủ
                </Button>
            </Grid>
        </Paper>
    );
}

export default InvalidCode;