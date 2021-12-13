import React from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { Grid, TextField, Button } from '@mui/material'
import { toast } from "react-toastify";

import { register as registerServices } from '../../services/auth';

function RegisterForm() {
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const btnstyle={margin:'0 0 10px 0'};
    const textFieldStyle = {margin:'0 0 15px 0'};

    const handleSubmitRegister = (data) => {
        if (data.password !== data.confirmPassword) {
            toast.warn('Mật mã xác nhận sai!');
        } else {
            dispatch(registerServices(data));
        }
        
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitRegister)}>
            <Grid container style={textFieldStyle} >
                <Grid item xs={12} sm={6} sx={{pr:1}}>
                    <TextField {...register('firstname')}
                        fullWidth
                        label="Tên"
                        type="text"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{pl:1}}>
                    <TextField {...register('lastname')}
                        fullWidth
                        label="Họ"
                        type="text"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <TextField {...register('email')} style={textFieldStyle}
                fullWidth
                type="email"
                label="Email" 
                variant="outlined"
                required
            />
            <TextField {...register('password')} style={textFieldStyle}
                fullWidth
                type="password"
                label="Mật khẩu"
                variant="outlined"
                required
            />
            <TextField {...register('confirmPassword')} style={textFieldStyle}
                fullWidth
                type="password"
                label="Xác nhận mật khẩu"
                variant="outlined"
                required
            />
            <Button fullWidth type='submit' color='primary' variant="contained" style={btnstyle}>Đăng ký</Button>
        </form>
    );
}

export default RegisterForm;