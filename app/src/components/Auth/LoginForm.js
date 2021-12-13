import React from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { TextField, Button } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { login } from '../../services/auth';

function LoginForm() {
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const btnstyle={margin:'0 0 10px 0'};
    const textFieldStyle = {margin:'0 0 15px 0'};

    const handleSubmitLogin = (data) => {
        dispatch(login(data.email, data.password));
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitLogin)}>
        <TextField 
            {...register('email')}
            autoFocus
            style={textFieldStyle}
            type="email"
            label="Email"
            fullWidth
            variant="outlined"
            required
        />
        <TextField
            {...register('password')}
            style={textFieldStyle}
            type="password"
            label="Mật khẩu"
            fullWidth
            variant="outlined"
            required
        />
        <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Ghi nhớ tài khoản"
        />
        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Đăng nhập</Button>
        </form>
    );
}

export default LoginForm;