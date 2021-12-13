import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Avatar, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import SocialLogin from "../components/Auth/SocialLogin";

function Login() {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = {
    backgroundColor: "skyblue",
    height: "70px",
    width: "70px",
  };
  const iconStyle = { transform: "scale(2.2)" };
  const typoStyle = { marginLeft: "10px" };

  const location = useLocation();
  const from = location.state?.from || '/';

  
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <PersonSharpIcon style={iconStyle} />
          </Avatar>
          <h2>Đăng nhập</h2>
        </Grid>
        <SocialLogin />
        <Divider sx={{ my: 2 }}></Divider>
        <LoginForm />
        <Typography>
          {" "}
          Chưa có tài khoản?
          <Link to="/register" state={{ from: from }} style={typoStyle}>
            Đăng ký
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Login;
